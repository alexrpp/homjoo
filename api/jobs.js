// ============================================================
//  homjoo — Serverless Function: /api/jobs
// ------------------------------------------------------------
//  Chiama l'API di Adzuna per ottenere i lavori reali di Sydney
//  e li restituisce nel formato usato dalla mappa del sito.
//
//  Le chiavi (ADZUNA_APP_ID e ADZUNA_APP_KEY) NON sono nel
//  codice: si leggono dalle variabili d'ambiente di Vercel.
//  Cosi' restano segrete e non finiscono mai su GitHub.
// ============================================================

export default async function handler(req, res) {
  const APP_ID  = process.env.ADZUNA_APP_ID;
  const APP_KEY = process.env.ADZUNA_APP_KEY;

  // Se mancano le chiavi (es. dimenticate su Vercel), errore chiaro
  if (!APP_ID || !APP_KEY) {
    return res.status(500).json({
      error: 'Adzuna credentials not configured',
      hint:  'Imposta ADZUNA_APP_ID e ADZUNA_APP_KEY su Vercel.'
    });
  }

  try {
    // Parametri di ricerca
    // - country: au  (Australia)
    // - where:   Sydney
    // - results_per_page: 50  (il massimo)
    // - sort_by: date (lavori piu' recenti prima)
    const params = new URLSearchParams({
      app_id:           APP_ID,
      app_key:          APP_KEY,
      results_per_page: '50',
      where:            'Sydney',
      sort_by:          'date',
      'content-type':   'application/json'
    });

    // Tre pagine in parallelo (50+50+50) per arrivare a ~100 lavori UNICI
    // dopo il dedup (Adzuna a volte ripete annunci tra pagine vicine).
    const urls = [1, 2, 3].map(p => `https://api.adzuna.com/v1/api/jobs/au/search/${p}?${params.toString()}`);
    const responses = await Promise.all(urls.map(u => fetch(u)));
    const okRes = responses.filter(r => r.ok);
    if (okRes.length === 0) {
      const txt = await responses[0].text();
      throw new Error(`Adzuna ${responses[0].status}: ${txt.slice(0, 200)}`);
    }
    const pages = await Promise.all(okRes.map(r => r.json()));
    // Unisco le pagine ed elimino eventuali duplicati (stesso id)
    const seen = new Set();
    const data = { results: [] };
    for (const pg of pages) {
      for (const j of (pg.results || [])) {
        if (!seen.has(j.id)) { seen.add(j.id); data.results.push(j); }
      }
    }
    // Tengo al massimo 100 lavori: abbastanza scelta senza appesantire la mappa
    data.results = data.results.slice(0, 100);

    // Trasformo il formato di Adzuna nel formato che usa la mappa.
    // Tengo solo i lavori che hanno latitudine/longitudine valide,
    // altrimenti non riusciamo a metterli sulla mappa.
    // Tengo TUTTI i lavori: quelli senza coordinate hanno lng/lat null
    // e il sito li mostra in lista con l'etichetta "posizione non specificata".
    const jobs = (data.results || [])
      .map(j => {
        // Stima: se min/max sono presenti uso la media, sennò il min
        let salary = null;
        if (j.salary_min && j.salary_max) {
          salary = Math.round((j.salary_min + j.salary_max) / 2);
        } else if (j.salary_min) {
          salary = Math.round(j.salary_min);
        }
        // Distinguo tra stipendio orario (es. 30/h) e annuo (es. 60000/anno)
        const isHourly = salary !== null && salary < 500;
        const unit     = salary !== null ? (isHourly ? 'AUD/h' : 'AUD/anno') : '—';

        // Descrizione breve (max 220 caratteri)
        let desc = (j.description || '').replace(/\s+/g, ' ').trim();
        if (desc.length > 220) desc = desc.slice(0, 220).trim() + '…';

        // Formatto il tipo contratto in modo leggibile:
        //   "full_time" -> "Full-time"
        //   "part_time" -> "Part-time"
        //   "permanent" -> "Permanent"
        //   "contract"  -> "Contract"
        const rawTipo = j.contract_time || j.contract_type || null;
        const tipo = rawTipo
          ? rawTipo.charAt(0).toUpperCase() + rawTipo.slice(1).replace('_', '-')
          : '—';

        return {
          id:      'adz_' + j.id,
          type:    'job',
          title:   j.title || 'Posizione senza titolo',
          company: (j.company && j.company.display_name) || 'Azienda non specificata',
          price:   salary,
          unit:    unit,
          lng:     typeof j.longitude === 'number' ? j.longitude : null,
          lat:     typeof j.latitude  === 'number' ? j.latitude  : null,
          desc:    desc || 'Nessuna descrizione disponibile.',
          meta: {
            'Tipo':       tipo,
            'Categoria':  (j.category && j.category.label) || '—',
            'Zona':       (j.location && j.location.display_name) || 'Sydney',
            'Pubblicato': j.created
                          ? new Date(j.created).toLocaleDateString('it-IT')
                          : '—'
          },
          source: 'Adzuna',
          url:    j.redirect_url || null
        };
      });

    // CACHE: la CDN di Vercel tiene la risposta in cache 10 minuti.
    // Cosi' non bruciamo le 1000 chiamate gratuite/mese e il sito e' veloce.
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

    return res.status(200).json({
      jobs:    jobs,
      count:   jobs.length,
      updated: new Date().toISOString()
    });

  } catch (err) {
    console.error('Adzuna fetch error:', err);
    return res.status(500).json({
      error:   'Failed to fetch jobs',
      message: err.message
    });
  }
}
