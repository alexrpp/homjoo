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
    // - results_per_page: 30  (max 50)
    // - sort_by: date (lavori piu' recenti prima)
    const params = new URLSearchParams({
      app_id:           APP_ID,
      app_key:          APP_KEY,
      results_per_page: '30',
      where:            'Sydney',
      sort_by:          'date',
      'content-type':   'application/json'
    });

    const url = `https://api.adzuna.com/v1/api/jobs/au/search/1?${params.toString()}`;
    const adzunaRes = await fetch(url);

    if (!adzunaRes.ok) {
      const txt = await adzunaRes.text();
      throw new Error(`Adzuna ${adzunaRes.status}: ${txt.slice(0, 200)}`);
    }

    const data = await adzunaRes.json();

    // Trasformo il formato di Adzuna nel formato che usa la mappa.
    // Tengo solo i lavori che hanno latitudine/longitudine valide,
    // altrimenti non riusciamo a metterli sulla mappa.
    const jobs = (data.results || [])
      .filter(j => typeof j.latitude === 'number' && typeof j.longitude === 'number')
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

        return {
          id:      'adz_' + j.id,
          type:    'job',
          title:   j.title || 'Posizione senza titolo',
          company: (j.company && j.company.display_name) || 'Azienda non specificata',
          price:   salary,
          unit:    unit,
          lng:     j.longitude,
          lat:     j.latitude,
          desc:    desc || 'Nessuna descrizione disponibile.',
          meta: {
            'Tipo':       j.contract_time || j.contract_type || '—',
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
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');

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
