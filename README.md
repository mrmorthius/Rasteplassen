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

## Staging

For staging - Pull ned siste versjon av master
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build`

## Produksjon

For produksjon - Trigger i GitHub Actions:

1. Gå til GitHub repository -> Actions
2. Velg "Deploy to Production" workflow
3. Klikk "Run workflow"
4. Angi versjonsnummer og beskrivelse
5. Klikk "Run workflow" for å starte deployment

## TRELLO - Kanban board

Bruk av Trello som Kanban board for styring av oppgaver og gjøremål.

## SIKKERHET

Installert Fail2Ban for å hindre mer enn 5 påloggingsforsøk med SSH.
SSH er deaktiver for bruk med passord.
