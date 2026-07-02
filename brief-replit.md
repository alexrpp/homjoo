# homjoo — Brief progetto

> Documento da copiare e incollare in Replit Agent (o in qualunque altro strumento di sviluppo AI) per ottenere una versione del sito.
> Il documento e' scritto in italiano. Lo strumento AI lo capira' senza problemi.

---

## 1. Cos'e' homjoo

**homjoo** e' un sito **aggregatore** (non scraper) di **lavori + case** per **expat** che si trasferiscono all'estero. **Citta' pilota: Sydney, Australia.**

L'idea unica e' la combinazione **lavoro + casa** sulla **stessa mappa**: chi si trasferisce in una nuova citta' ha bisogno di entrambe contemporaneamente, e nessun servizio gia' esistente unisce le due cose in modo geografico.

**Sito attuale online**: https://homjoo.vercel.app
**Repository**: https://github.com/alexrpp/homjoo

---

## 2. Target utenti

- **Italiani ed europei** (lingua principale italiano)
- Eta' 22-35 anni
- Stanno valutando un trasferimento o si stanno gia' trasferendo a Sydney
- Usi: working holiday, lavoro qualificato con visa sponsorship, studio + part-time
- Frustrazione attuale: devono usare siti diversi per lavoro (Seek, LinkedIn) e casa (Flatmates, Domain), senza una visione unificata
- Spesso usano **gruppi Facebook tipo "Italiani a Sydney"** per trovare consigli rapidi → questa e' la vera concorrenza, non i grandi portali

---

## 3. Promessa di valore

> "Trova lavoro e casa nella stessa zona di Sydney, su una mappa interattiva, gratis"

In una sola pagina, l'utente vede:
- Lavori veri aggiornati ogni giorno (dati da API Adzuna)
- Case curate manualmente da fonti pubbliche (Flatmates, Domain, Facebook)
- Posizione geografica precisa per pianificare commute, quartiere preferito, ecc.

---

## 4. Stato attuale (versione MVP gia' online)

### Funzionalita' implementate
- Mappa interattiva di Sydney (MapLibre GL + tile gratuiti CARTO Voyager)
- Pin sulla mappa, distinti per tipo:
  - Lavori = pin **verdi** (con icona valigetta)
  - Case = pin **blu** (con icona casa)
- Pannello dettaglio a destra: titolo, azienda/descrizione, prezzo, metadati, link all'annuncio originale
- Filtri "Tutto / Lavori / Case" in alto
- Lista cliccabile dei lavori/case dai contatori in basso a sinistra (es. "29 lavori a Sydney" → apre lista a sinistra con tutti gli annunci, ognuno cliccabile per aprire il dettaglio)
- Quando i pin hanno coordinate identiche (caso frequente con Adzuna che da' coordinate approssimate di "zona"), il codice li dispone automaticamente in cerchio per non sovrapporli
- Top bar con logo + barra di ricerca (al momento la barra e' decorativa, non funziona ancora)
- Bottone "Passa a Pro" in alto a destra (al momento e' decorativo, ancora non c'e' il piano a pagamento)
- Contatori "Lavori / Case" sempre visibili in basso a sinistra
- Responsive (funziona anche su mobile, anche se ottimizzato per desktop)
- Schermata di errore se MapLibre non carica (es. niente connessione)

### Fonti dati
- **Lavori**: Adzuna API (gratis 1000 chiamate/mese), chiamata server-side via Vercel Serverless Function `/api/jobs.js` per nascondere le API key. Cache CDN 10 min per non bruciare il quota.
- **Case**: file JSON locale `/dati/case.json` curato manualmente. Niente API pubbliche disponibili per le case di Sydney.

---

## 5. Stack tecnico attuale

- **Frontend**: HTML / CSS / JavaScript vanilla **single-file** (no React, no build step). Il file principale e' `index.html` da circa 2000 righe.
- **Hosting**: Vercel (auto-deploy ad ogni push GitHub)
- **Repository**: GitHub (`github.com/alexrpp/homjoo`)
- **Mappa**: MapLibre GL 4.7.1 via CDN cdnjs.cloudflare.com
- **API lavori**: Adzuna AU (endpoint `https://api.adzuna.com/v1/api/jobs/au/search/1`)
- **Serverless Functions**: Vercel Functions in Node.js (file `api/jobs.js`)
- **Variabili ambiente Vercel**: `ADZUNA_APP_ID`, `ADZUNA_APP_KEY` (impostate solo lato server, non esposte al browser)
- **Auth (preparato, non ancora attivo)**: Supabase Auth - progetto gia' creato su Supabase, ma il login non e' ancora integrato nel sito

---

## 6. Design system

### Stile
Riferimenti visivi: **Apple, Airbnb, Duolingo**. Pulito, ariosa, con whitespace generoso, ombre soft, microinterazioni curate.

### Palette colori
- **Arancio accento**: `#ff5a3c`
- **Verde lavori**: `#16a34a` (corrisponde al verde del logo per la valigetta)
- **Blu case**: `#1f6feb` (corrisponde al blu del logo per la casetta)
- **Ink nero**: `#0a0a0a`
- **Sfondi**: bianco / grigio molto chiaro

I colori dei pin sono **coerenti col logo** (lavoro=verde, casa=blu) → questa coerenza e' importante.

### Font
- **Display / titoli**: Fraunces (serif moderno, usato per titoli grandi)
- **UI / testo**: Geist (sans-serif moderno)
- **Brand / scritta "homjoo"**: Nunito 800

### Logo
Un pin (a forma di goccia) diviso in 3 sezioni colorate:
- Verde → valigetta (lavoro)
- Blu → casetta (casa)
- Gialla → percorso/strada

Il logo e' un PNG 512x512 embedded base64 nell'HTML.

---

## 7. Cosa fare adesso (priorita' attuale)

### Fase in corso: Fase 2b — Case vere
- Sostituire le 8 case mock con 20-30 case reali
- Approccio: **manuale curato**. Si raccolgono case da Flatmates / Facebook / Domain e si inseriscono nel file `dati/case.json` con titolo, prezzo, coordinate, descrizione, link all'annuncio originale.

### Prossima fase: Fase 3 — Login + Pro a pagamento
Divisa in:
- **3a — solo login (Supabase)**: registrazione email/password per raccogliere utenti. Niente pagamenti. Progetto Supabase gia' creato (URL e publishable key gia' disponibili).
- **3b — Pro 5€/mese (Stripe)**: abbonamento ricorrente che sblocca features premium.

### Idee per il piano Pro (5€/mese)
- **Alert email per nuovi lavori**: l'utente specifica criteri (es. "lavori IT a Sydney con visa sponsorship") e riceve email quando ne escono di nuovi
- **Insights stipendi**: statistiche aggregate per ruolo/categoria (es. "Software Engineer a Sydney: stipendio medio 110k AUD")
- **Piu' citta'**: il piano gratis vede solo Sydney, il Pro sblocca Melbourne, Brisbane, Perth ecc.
- Da definire meglio quando ci saranno utenti veri

---

## 8. Roadmap completa

| Fase | Cosa | Stato |
|------|------|-------|
| 1 — MVP | Mappa Sydney con dati mock | Fatta |
| 2 — Lavori veri | Integrazione API Adzuna | Fatta |
| 2b — Case vere | File JSON manuale + 20-30 case curate | In corso |
| 3a — Login | Supabase Auth email/password | Da fare |
| 3b — Pro 5€ | Stripe + features premium | Da fare |
| 4 — Altre citta' | Melbourne, Brisbane, Perth | Idea futura |
| 5 — Dominio custom | homjoo.com (~12€/anno) | Da fare |

---

## 9. Vincoli e contesto importante

- **Il proprietario non sa programmare**. Tutto lo sviluppo passa attraverso un LLM (assistente AI) che fa le modifiche al codice. Il codice deve essere percio' **semplice da leggere e modificare**, anche da chi non e' developer.
- **Budget**: minimo. Si usano solo strumenti gratuiti o a basso costo (Vercel free tier, Supabase free tier, Adzuna free tier 1000 chiamate/mese, GitHub gratis).
- **Single-page application semplice e' preferita a framework complessi** (no Next.js, no React). HTML + JS vanilla in single file e' la scelta consapevole, perche' il proprietario possa aprirlo e leggere il codice.
- **Mobile-first idealmente** (gli expat consultano da smartphone), ma desktop ok come priorita' attuale.

---

## 10. Risorse esistenti

- **Sito live**: https://homjoo.vercel.app
- **Repo GitHub**: https://github.com/alexrpp/homjoo
- **File principale**: `index.html` (single-file con HTML/CSS/JS)
- **Backend lavori**: `api/jobs.js` (Vercel Serverless Function che chiama Adzuna)
- **Database case**: `dati/case.json` (curato manualmente)
- **Provider auth (preparato)**: Supabase (eu-west-1)

---

## 11. Cosa vorrei da te (se sei Replit Agent o un altro AI)

Una **versione alternativa di homjoo** con eventuali miglioramenti tuoi. Idealmente:
- Mantenendo lo spirito apple/airbnb del design
- Tenendo a mente che il proprietario non programma e dovra' manutenere il sito
- Eventualmente proponendo miglioramenti su:
  - UI/UX della mappa
  - Gestione delle case (oggi e' un file JSON manuale, suggerimenti per renderlo piu' scalabile)
  - Approccio alle case vere (idee creative oltre form proprietari/scraping)
  - Implementazione del login + piano Pro

Se hai dubbi sulle scelte tecniche, chiedi prima di rifare tutto. Il proprietario preferisce **piccole modifiche reversibili** a **rifacimenti totali**.
