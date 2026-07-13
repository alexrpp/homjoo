@echo off
setlocal
title Pubblica homjoo
cd /d "%~dp0"
echo.
echo  ============================================
echo   PUBBLICA HOMJOO SU INTERNET
echo  ============================================
echo.

rem --- 1. Controlla che Git sia installato ---
where git >nul 2>nul
if errorlevel 1 (
  echo  Git non e' installato su questo computer.
  echo  Ti apro la pagina di download: installa con Avanti-Avanti-Fine,
  echo  poi riavvia questo file.
  start https://git-scm.com/download/win
  echo.
  pause
  exit /b 1
)

rem --- 2. Prima volta: collega la cartella al repository GitHub ---
if not exist ".git" (
  echo  Prima configurazione: collego la cartella a GitHub...
  git init -b main >nul 2>nul
  git remote add origin https://github.com/alexrpp/homjoo.git
  git fetch origin
  if errorlevel 1 (
    echo  ERRORE: non riesco a raggiungere GitHub. Controlla internet e riprova.
    pause
    exit /b 1
  )
  git reset --mixed origin/main >nul
  echo  Collegamento fatto!
  echo.
)

rem --- 3. Nome e email per le modifiche (solo se mancanti) ---
git config user.name >nul 2>nul || git config user.name "alexrpp"
git config user.email >nul 2>nul || git config user.email "alessandro.vannoli@gmail.com"

rem --- 4. Rimuovi dal repository eventuali file privati gia' caricati ---
git rm -r --cached --ignore-unmatch homjoo-contesto.md brief-replit.md LANCIO.md SEO.md PASS-SETUP.sql aggiungi-case.html api/jobs.backup.js dati/case.backup-con-demo.json >nul 2>nul

rem --- 5. Prepara e invia le modifiche ---
git add -A
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Aggiornamento sito - %date% %time%" >nul
  echo  Modifiche pronte, le invio a GitHub...
) else (
  echo  Nessuna modifica nuova trovata. Provo comunque l'invio...
)
git push -u origin main
if errorlevel 1 (
  echo.
  echo  ERRORE durante l'invio a GitHub.
  echo  Se e' la prima volta: si dovrebbe essere aperta una finestra
  echo  per accedere a GitHub - accedi e rilancia questo file.
  echo  Se il problema resta, dillo a Claude.
) else (
  echo.
  echo  ============================================
  echo   FATTO! Vercel pubblichera' il sito
  echo   su homjoo.vercel.app tra 1-2 minuti.
  echo  ============================================
)
echo.
pause
