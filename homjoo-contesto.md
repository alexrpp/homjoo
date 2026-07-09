# Progetto homjoo — Contesto

## 👋 Chi sono io (l'utente)
- Sono **alessandro** (alexrpp su GitHub)
- **Non so programmare**, sono italiano
- Ho un piano **Claude Pro/Max**
- Vado guidato **click-per-click** con istruzioni semplici e in italiano
- A volte confondo i nomi (es. "Quitab" invece di "GitHub") — non spaventarti, chiedi conferma

## 🎯 Cos'è homjoo
Sito **aggregatore** (no scraping) di **lavori + case** per expat che si trasferiscono all'estero. **Città pilota: Sydney**. Stile desiderato: Apple / Airbnb / Duolingo. Budget: minimo / gratis.

## ✅ Cosa è già stato fatto (Fase 1 — MVP + Fase 2 — Adzuna)

### Fase 2 — completata il 14/05/2026
- ✅ Registrazione Adzuna fatta (alessandro.vannoli@gmail.com)
- ✅ Variabili d'ambiente `ADZUNA_APP_ID` e `ADZUNA_APP_KEY` configurate su Vercel (Production)
- ✅ File `api/jobs.js` creato (Serverless Function su Vercel che chiama Adzuna AU/Sydney)
- ✅ `index.html` aggiornato: `loadJobs()` fa fetch a `/api/jobs` e popola la mappa con i lavori veri
- ✅ ~29 lavori veri di Sydney appaiono sulla mappa (Doordash, Deloitte, ecc.)
- ✅ Cache CDN 10 minuti per non bruciare le 1000 chiamate gratuite/mese
- ✅ Gestione caso "stipendio mancante" (Adzuna non sempre lo fornisce) → pin mostra "—", pannello mostra "Stipendio non specificato"
- ✅ Formato contratto leggibile (`full_time` → `Full-time`)

### Fase 1 — MVP
- ✅ Sito online su **homjoo.vercel.app**
- ✅ Repository GitHub: **github.com/alexrpp/homjoo** (public)
- ✅ Account Vercel collegato a GitHub, auto-redeploy attivo
- ✅ Top bar con logo PNG + scritta "homjoo" (font Nunito 800)
- ✅ Mappa **MapLibre GL** su Sydney (coord 151.2093, -33.8688, zoom 12.5)
- ✅ Tile **CARTO Voyager** (gratuito)
- ✅ 16 pin con coordinate REALI verificate (8 lavori blu + 8 case verdi)
- ✅ Quartieri: CBD, Bondi, Manly, Surry Hills, Newtown, Glebe, Alexandria, Chippendale, Paddington, Bondi Junction
- ✅ Pannello dettaglio scorrevole a destra
- ✅ Filtri Tutto / Lavori / Case
- ✅ Stats counter, controlli zoom/recenter
- ✅ Schermata errore se MapLibre non carica
- ✅ Favicon PNG embedded base64
- ✅ Font: Fraunces (display) + Geist (UI) + Nunito (brand)
- ✅ Palette: arancio #ff5a3c, blu lavori #1f6feb, verde case #16a34a
- ✅ Logo PNG hires 512x512 embedded base64 (pin diviso in 3 sezioni: verde-valigetta, blu-casa, gialla-percorso)

## ⏭️ Cosa fare DOPO (in ordine)

### Fase 2b — Case vere (PRIORITÀ ATTUALE!)
- Le case sono ancora mock (8 finte hard-coded in index.html)
- NO API pubbliche da Spotahome/HousingAnywhere
- Soluzioni possibili:
  - Form per proprietari (i proprietari aggiungono case manualmente)
  - Scraping Flatmates.com.au / Domain.com.au (legalmente grigio)
  - Partnership/affiliate con piattaforme esistenti
- Da discutere col modello quale approccio scegliere

### Fase 3 — Login + Pro 5€/mese

**Decisione 18/05/2026**: divisa in due tappe:
- **Fase 3a — solo login** (in corso): solo registrazione/accesso utenti via Supabase. Permette di raccogliere email da subito senza la complessità di Stripe/pagamenti.
- **Fase 3b — Pro a pagamento**: dopo, quando ci saranno utenti veri. Stripe per l'abbonamento ricorrente.

**Idee per il Pro (da definire meglio in 3b)**:
- Alert email per nuovi lavori (piaceva ad Ale)
- Insights stipendi (statistiche per ruolo/categoria)
- Più città oltre Sydney (probabilmente)

### Aggiornamento 26/05/2026

**Nuove features fatte oggi**:
- ✅ Case spostate in `dati/case.json` (Ale puo' modificarle a mano facilmente, istruzioni in italiano dentro al file)
- ✅ Barra di ricerca funzionante: cerca per quartiere (15 quartieri Sydney hardcoded con alias) e per testo (titolo/azienda/desc/meta). Dropdown con sezioni "Quartieri" e "Annunci". Click quartiere → flyTo. Click annuncio → openPanel. X per cancellare. Esc per chiudere.
- ✅ Iconcine dropdown in stile minimal (sfondo bianco, bordo grigio, icona scura). Quartieri = bussola, lavori = valigetta, case = casetta. Niente colori saturi nel dropdown per non confondere con i pin colorati sulla mappa.

**Decisione 26/05/2026 sulle case**:
- Ale ha valutato Replit Agent come alternativa ma ha deciso di continuare qui con me
- Ale aggiunge le case a mano (Strada A — manuale curato) modificando `dati/case.json` da solo nei prossimi giorni
- Quando avra' 20-30 case vere, passiamo alla strategia di lancio (Facebook/Reddit)

**Cose da fare quando Ale torna**:
1. Strategia Facebook/Reddit (post da fare, gruppi target, metriche)
2. Fase 3a — login Supabase (URL e publishable key gia' in `homjoo-supabase.txt` sul Desktop)
3. Dominio custom (Vercel o Namecheap)
4. Polish font "homjoo" che non lo convinceva al 100%

### Fase 3a — Aggiornamento 02/07/2026 (sessione Cowork)

**Fatto oggi (codice completo, manca solo la chiave)**:
- ✅ SDK Supabase v2 aggiunto a `index.html` (CDN jsdelivr)
- ✅ Bottone "Accedi" nella topbar (a sinistra di "Passa a Pro"), con pallino verde quando sei connesso
- ✅ Modal Accedi/Registrati in stile homjoo (Fraunces + Geist, arancio #ff5a3c)
- ✅ Logica completa: signUp (con nome), signInWithPassword, signOut (click sul bottone quando loggato), sessione ripristinata al reload, messaggi di errore tradotti in italiano
- ✅ Testato in automatico: registrazione, validazioni, login errato/corretto, logout — tutto ok
- ✅ Backup pre-modifica: `index.backup-fase3a.html`
- ✅ Publishable key inserita nel codice (02/07/2026)
- ⚠️ Da fare su supabase.com: Authentication → URL Configuration → Site URL = https://homjoo.vercel.app
- ⚠️ Poi push su GitHub per il deploy

**Nota della sessione**: creato per errore un secondo sito da zero prima di leggere questa cartella; scartato, si continua su questo. L'iscrizione Adzuna NON va rifatta (chiavi già su Vercel).

### Aggiornamento 02/07/2026 — sera

- ✅ Login Supabase ONLINE e funzionante (Ale ha testato registrazione + accesso)
- ✅ Campo password: occhio mostra/nascondi + barra robustezza colorata (solo in registrazione)
- ✅ Creato `PUBBLICA-homjoo.bat`: doppio clic = push automatico su GitHub (niente più upload manuale). Alla prima esecuzione installa/collega Git e chiede login GitHub
- ✅ Creato `.gitignore` (esclude i backup index.backup-*.html)
- ✅ SEO: titolo nuovo, meta description, Open Graph, theme-color
- ✅ Mobile: bottoni topbar compattati sotto i 768px
- ✅ `api/jobs.js`: da 30 a 50 lavori per pagina (il max di Adzuna)
- ✅ Bottone "Passa a Pro": ora apre il modal "Pro in arrivo" (alert email, statistiche stipendi, nuove città) che spinge alla registrazione — primo passo Fase 3b
- Backup: `index.backup-pwd.html`, `index.backup-polish.html`

### Aggiornamento 02/07/2026 — upgrade "senior dev" (grafica dinamica)

- ✅ Intro cinematica: all'apertura la mappa vola dall'Australia intera fino a Sydney (3,4s, rispetta prefers-reduced-motion)
- ✅ Edifici 3D veri: layer fill-extrusion sui footprint del basemap CARTO (visibili da zoom 14, in try/catch: se il basemap non li ha il sito resta identico)
- ✅ Bottone "3D" nei controlli mappa: inclina la vista a 58° e zooma sui palazzi; secondo click torna 2D
- ✅ Pin con animazione d'ingresso a molla (scala 0→1 con rimbalzo, ritardo a cascata)
- ✅ Contatori lavori/case animati (contano da 0 al numero reale con easing)
- Backup: index.backup-3d.html
- Test automatici passati (layer 3D, intro, toggle, sintassi)

### Aggiornamento 02/07/2026 — verso 50 lavori + 50 case (Fase 2b operativa)

- ✅ 2D/3D separati: mappa normale in 2D, palazzi con altezze solo premendo il bottone 3D
- ✅ Spread pin a anelli concentrici (6/12/18 per anello, raggio crescente): i lavori Adzuna con coordinate di zona non si impilano più
- ✅ api/jobs.js: 2 pagine Adzuna in parallelo con dedup (~50 lavori geolocalizzati), cache CDN a 30 min per stare nei limiti gratuiti
- ✅ Creato `aggiungi-case.html` (solo locale, in .gitignore): tool a 3 passi con cui Ale aggiunge case senza toccare JSON — apre dati/case.json, modulo con 36 quartieri precompilati (coordinate automatiche + jitter ~150m), scarica il nuovo case.json da rimettere in dati/
- Piano concordato: Ale raccoglie ~10 case/giorno da Flatmates/Facebook/Gumtree (titolo riscritto, link alla fonte, NO foto copiate) fino a 50; poi strategia di lancio
- Mappa stile Google: spiegato che è proprietaria; restiamo su CARTO Voyager (alternativa gratuita più simile)

### Aggiornamento 02/07/2026 — pin di zona "onesti" (idea di Ale)

Ale ha notato che distribuire ad anelli i lavori con coordinate di zona crea posizioni finte. Nuovo design:
- ✅ Annunci con la STESSA coordinata (zona Adzuna) → UN "pin di zona" con conteggio ("5 lavori" + etichetta arancione "ZONA", bordo tratteggiato); click → apre il pannello-lista con quegli annunci
- ✅ Nel pannello dettaglio: badge "≈ posizione di zona" (ambra) per gli annunci raggruppati, "posizione non specificata" per quelli senza coordinate
- ✅ api/jobs.js non scarta più i lavori senza lat/lng: ora hanno lng/lat null e compaiono in lista/ricerca/contatori (più inventario verso i 50)
- ✅ Guardie sui flyTo per item senza coordinate (lista e ricerca aprono solo il dettaglio)
- ✅ Rimossa la vecchia funzione spreadOverlappingPins (anelli)
- Backup: index.backup-zone.html, api/jobs.backup.js

### Aggiornamento 02/07/2026 — blocco Adzuna da IP esteri + piano B

- Scoperto: il sito adzuna.com.au risponde "too many requests" ad Ale (IP italiano) su OGNI pagina, anche la homepage — è la loro protezione anti-bot verso traffico estero/ripetuto, NON un bug di homjoo (il link usato è il redirect_url ufficiale dell'API)
- Rilevante per il target: molti utenti homjoo pianificano il trasferimento dall'Europa, quindi potrebbero incontrare lo stesso blocco
- ✅ Piano B aggiunto: nel pannello dettaglio dei lavori, sotto "Candidati su Adzuna", c'è il link "Il link non si apre? Cerca questo annuncio su Google ↗" (ricerca: "titolo" azienda Sydney job) — funziona da qualsiasi paese e trova lo stesso annuncio su Seek/LinkedIn/Jora
- Per le case il link non appare (hanno già la fonte propria)
- Testato: visibile sui lavori, nascosto sulle case, URL corretto

### Aggiornamento 02/07/2026 — FEATURE DISTANZA CASA-LAVORO (la killer feature)

- ✅ Nel pannello di ogni annuncio (con coordinate) c'è il bottone "📏 Quanto dista da una casa?/da un lavoro?"
- ✅ Flusso: click sul bottone → chip nera in alto "Ora clicca una casa/un lavoro sulla mappa" (con Annulla) → click sull'annuncio dell'altro tipo → linea tratteggiata sulla mappa + zoom sui due punti + scheda in basso con distanza in linea d'aria e tempi stimati 🚶🚴🚗
- ✅ Distanza con formula haversine (verificata: Quay→Bondi = 7,0 km ✓); tempi: 12/4/2,5 min per km, dichiarati "indicativi"
- ✅ Esc o ✕ chiude tutto e svuota la linea; funziona anche scegliendo dalla lista/ricerca; nascosto per annunci senza coordinate
- Nota per il futuro (Pro?): tempi reali coi mezzi richiederebbero un'API di routing (Google/Mapbox a pagamento, OSRM self-host) — per ora linea d'aria onesta
- Backup: index.backup-pair.html

### Aggiornamento 02/07/2026 — fix misura distanza (bug segnalati da Ale)

- 🐛 CAUSA VERA dei due problemi: i bounds dello zoom erano costruiti con LngLatBounds(a,b) che si "inverte" se il primo punto è a est del secondo → la mappa zoomava fino a tutta l'Australia e sembrava che il secondo annuncio non venisse selezionato
- ✅ Fix: bounds con extend() (sempre corretti) + maxZoom 15 → lo zoom resta su Sydney
- ✅ Bottone "✕ Rimuovi misura" ben visibile nella scheda risultato (oltre alla ✕ e a Esc); si può rimisurare subito senza ricaricare
- ✅ Case senza link: il bottone "Vedi su …" ora sparisce invece di restare visibile-ma-morto (sembrava rotto); le case aggiunte col tool con il link funzionano normalmente
- ✅ Testato l'intero percorso casa → gruppo di lavori → lavoro dalla lista, in entrambe le direzioni geografiche, misura ripetuta senza ricaricare

### Aggiornamento 02/07/2026 — SITO MULTI-PAGINA ("rivoluzione" chiesta da Ale)

homjoo non è più solo la mappa: ora è un sito completo.
- ✅ `pagine.css` — design system condiviso delle pagine di contenuto (stessi token della mappa: Fraunces/Geist/Nunito, arancio #ff5a3c)
- ✅ `come-funziona.html` — 3 passi + sezione fiducia (lavori veri, onestà posizioni, case selezionate) + CTA
- ✅ `faq.html` — 10 domande con accordion animato (piani, dati, blocco Adzuna estero, pubblicare una casa via email, ecc.)
- ✅ `chi-siamo.html` — storia del progetto (onesta: progetto indipendente, niente team inventati), principi, roadmap pubblica
- ✅ `privacy.html` — privacy in parole semplici (Supabase, nessun tracking, terze parti, diritti)
- ✅ Navbar a pillola condivisa (glass, link attivo evidenziato, CTA "Apri la mappa"), footer condiviso con contatti
- ✅ Animazioni fade-up allo scroll (IntersectionObserver, rispetta prefers-reduced-motion)
- ✅ index.html: bottone ☰ in topbar con menu a tendina verso le pagine (chiude con click fuori/Esc)
- ✅ Testato tutto: parsing pagine, link incrociati, accordion, menu — nessun errore
- Backup: index.backup-menu.html

**Prossimi passi quando Ale torna**: pubblicare col .bat, poi raccolta 50 case, poi lancio.

### Aggiornamento 02/07/2026 — restyling "serio" (feedback di Ale)

- 🐛 Chip "Scegli una casa" appariva all'apertura del sito: era nascosta spostandola in alto di soli 70px (ne servivano di più) → ora nascosta con opacity 0 + pointer-events none. Per questo "Annulla" sembrava rotto
- 🐛 Menu ☰: era ancorato al centro dello schermo (rettangolo bianco fuori posto) → ora è DENTRO la topbar, ancorato al bottone in alto a destra, con animazione scale da origine top-right
- ✅ "Passa a Pro" ridisegnato: pieno arancione #ff5a3c con ombra colorata, NIENTE pallino rosso (rimosso anche dal CTA delle pagine)
- ✅ Emoji rimosse ovunque dall'interfaccia: menu (testo pulito + separatore), brand pagine ("homjoo." con punto arancio), footer, card (ora icone SVG a linea), city-pill ("Sydney" con pin SVG). Restano solo nei favicon
- ✅ Barra di ricerca più definita: sfondo grigio leggero, bianco + bordo + ombra su focus
- ✅ Font UI: da Geist a **Inter** su tutto il sito (mappa + pagine); Fraunces resta per i titoli, Nunito per il logo
- Backup: index.backup-polish2.html

### Aggiornamento 02/07/2026 — ☰ dentro la barra + schermata di benvenuto

- 🐛 Il bottone ☰ era nel codice dentro la topbar ma la pillola (720px fissi) traboccava e lo mostrava FUORI dal rettangolo bianco → topbar allargata a 840px + barra di ricerca comprimibile (min-width:0)
- ✅ Benvenuto alla prima visita (domanda di Ale "va bene aprire direttamente sulla mappa?"): card in vetro sopra la mappa con brand, titolo Fraunces "Il lavoro e la casa. Una sola mappa.", pitch, bottoni "Esplora Sydney" e "Come funziona". Si vede UNA volta sola (localStorage homjoo_welcome_v1), poi mai più. Il volo cinematico gira dietro la card
- Testato: prima visita mostra, seconda no, click fuori chiude
- Backup: index.backup-welcome.html

### Fase 3a — Stato avanzamento (18/05/2026)

**Fatto**:
- ✅ Account Supabase creato (login con GitHub `alexrpp`)
- ✅ Organization Supabase: `homjoo` (plan Free)
- ✅ Progetto Supabase creato:
  - Nome: `homjoo`
  - URL: `https://ongtlirhhaxabsgkwqlk.supabase.co`
  - Region: West EU (Ireland) — eu-west-1
  - Postgres standard (NON OrioleDB)
  - Security: tutte le checkbox attive (Enable Data API, Automatically expose new tables, Enable automatic RLS)
- ✅ Database password generata e salvata da Ale
- ✅ Publishable key copiata e salvata da Ale in `homjoo-supabase.txt` sul Desktop
  (formato nuovo: inizia con `sb_publishable_...`, NON la vecchia anon key)
- ⚠️ Secret key (`sb_secret_...`) ESISTE ma NON va mai messa nel frontend o su GitHub

**Da fare la prossima sessione** (in ordine):
1. Configurare auth email/password su Supabase (Authentication → Providers)
2. Configurare Site URL e Redirect URLs (deve puntare a https://homjoo.vercel.app)
3. Aggiungere SDK Supabase al sito (CDN `@supabase/supabase-js@2`)
4. UI: pulsanti "Accedi"/"Registrati" nel top bar + modal di login/signup
5. Logica JS: `signUp`, `signInWithPassword`, `signOut`, gestione sessione
6. Push su GitHub + test end-to-end (registrazione, conferma email, login)

**Note tecniche per la prossima volta**:
- L'URL del progetto è pubblico e va inserito nel codice frontend
- La publishable key (`sb_publishable_...`) va inserita nel codice frontend (è pensata per esserlo)
- Ale ha entrambe salvate in `homjoo-supabase.txt` sul Desktop — me le passa al momento giusto
- **Supabase** per autenticazione (gratis fino a 50k utenti)
- **Stripe** per abbonamento ricorrente
- Da definire cosa offre il Pro (alert email, più città, salary insights, ecc.)

### Bonus
- Dominio custom (~12€/anno) su Namecheap o Cloudflare
- Tweak font scritta "homjoo" (utente non convinto al 100%)
- Aggiunta città oltre Sydney

## 📁 File del progetto

- File principale: `index.html` (su GitHub, ~205KB, contiene logo PNG hires embedded)
- Stesso file in locale: scaricato dai Download del PC dell'utente come `nomado.html`

## 🛠️ Stack tecnico
- HTML/CSS/JS single-file (puro, no React, no build step)
- MapLibre GL 4.7.1 via CDN cdnjs.cloudflare.com
- Hosting: Vercel (auto-deploy da GitHub push)
- Repo: github.com/alexrpp/h0mjoo
- Live: homjoo.vercel.app

## 🐛 Bug già risolti (per non rifarli)
1. CDN unpkg.com → 403 → cambiato a cdnjs.cloudflare.com
2. Pin invisibili → fix con map.on('load', createPins)
3. Pin "stiracchiati" su tutto schermo → wrapper esterno `.pin` puro per MapLibre + figlio interno `.pin-inner` con stile, anchor 'center'
4. Pin in mare → coordinate verificate con places_search per ogni quartiere
5. Logo sgranato → ricreato a 512x512 invece di 128x128

## 🚀 Prossima azione concordata
**Fase 2b — Case vere**: decidere insieme ad Ale quale approccio usare per le case (form proprietari, scraping, partnership). Le 8 case attuali sono hard-coded in `index.html`.

---

## 📋 Prompt suggerito per Cowork

"Ciao! Sto continuando il progetto **homjoo** descritto nel file `homjoo-contesto.md` allegato. Adesso voglio iniziare la **Fase 2**: integrare l'API di Adzuna per avere lavori reali di Sydney sulla mappa. Guidami passo-passo: 1) registrazione su Adzuna 2) creazione Serverless Function su Vercel 3) modifica del file `index.html` per chiamare l'API 4) test e deploy. Ricorda: non so programmare, fammi tu le modifiche al codice direttamente sui file."
