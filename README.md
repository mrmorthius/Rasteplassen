# Rasteplassen

For utvikling bruk kommando:
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

Miljøvariabler legges i fil .env

Tilgjengelighet ved utvikling:

- Backend (port 8080)
- Frontend (port 3000)

Frontend - React App med Vite

- installert TailwindCSS for styling

Backend - .NET webapi

- Installert Swagger for UI ved utvikling

### Pushe kode

Ved arbeid opprett en ny branch med kommando
`git checkout -b feature/funksjon`

Gjør endringer og commit
`git add . `
`git commit -m "feat(login): Added loginsystem"`
`git push -u origin feature/funksjon`

Gå til GitHub i nettleser og inn i repository `Rasteplassen`
Opprett ny pull request med `master` som base og `feature/funksjon` som compare.

Når PR er opprettet kjøres workflows. Hvis tester og testbuild gjennomføres OK kan PR merges til master.

## Staging

For staging - Pull ned siste versjon av master
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build`

Start med
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

## Produksjon

For produksjon - Trigger i GitHub Actions:

1. Gå til GitHub repository -> Actions
2. Velg "Deploy to Production" workflow
3. Klikk "Run workflow"
4. Angi versjonsnummer og beskrivelse
5. Klikk "Run workflow" for å starte deployment
