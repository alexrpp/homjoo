# homjoo — SEO: cosa c'è e cosa devi fare tu

## Cosa ho già fatto (tutto automatico, va online col .bat)

- **sitemap.xml** — la mappa del sito per Google, con le 5 pagine e le priorità
- **robots.txt** — dice ai motori cosa indicizzare (tutto tranne /dati e /api)
- **Canonical** su ogni pagina — evita contenuti duplicati agli occhi di Google
- **Dati strutturati (JSON-LD)** — la home si presenta come WebSite+Organization; la pagina FAQ ha lo schema FAQPage: Google può mostrare le tue domande/risposte direttamente nei risultati di ricerca (i box a tendina che vedi sotto certi siti)
- **Titoli e descrizioni ottimizzati** per le ricerche italiane: "trasferirsi a Sydney", "lavoro e casa a Sydney", "stanze in affitto Sydney"
- Anteprime social (og:image) già a posto da prima

## Cosa devi fare TU (una volta sola, ~10 minuti)

1. Vai su **search.google.com/search-console** e accedi col tuo account Google
2. "Aggiungi proprietà" → scegli **Prefisso URL** → incolla `https://homjoo.vercel.app`
3. Per verificare che il sito è tuo: scegli il metodo **Tag HTML** → ti danno una riga tipo `<meta name="google-site-verification" content="....">` → **incollamela in chat** e la metto io nel sito → poi torni lì e premi Verifica
4. Una volta verificato: menu Sitemap → inserisci `sitemap.xml` → Invia

Da quel momento Google inizia a indicizzarti e nella Search Console vedrai con quali ricerche la gente ti trova.

## Le cose oneste da sapere sulla SEO

- **I risultati arrivano in mesi, non giorni.** Per le prime settimane il traffico verrà dai gruppi Facebook e Reddit, non da Google. È normale.
- **Il dominio conta**: `homjoo.vercel.app` è indicizzabile, ma un dominio proprio (`homjoo.com`, ~12€/anno) è più credibile per Google e per gli utenti. Consigliato prima o subito dopo il lancio.
- **La SEO vera, a regime, si fa coi contenuti**: pagine tipo "Quanto costa vivere a Sydney nel 2026", "Stipendi medi a Sydney per ruolo", "I migliori quartieri per giovani italiani". Ogni pagina così è una porta d'ingresso da Google. Quando vorrai, le scriviamo insieme — ma DOPO il lancio.
