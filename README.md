# Rasteplassen

## Utvikling

1. For utvikling bruk kommando:
   `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

2. Miljøvariabler legges i fil .env

   - Kopier innhold fra .env.example og tilpass

3. Ved kjøring av docker-compose for utvikling blir følgende porter tilgjenglig:

   - Backend : port 8080
   - Frontend : port 3000

4. Valg av teknologi

   - Frontend - React App med Vite

     - TailwindCSS for styling

   - Backend - .NET webapi
     - Swagger for UI ved utvikling

### Utvikling av funksjonalitet og pushing av kode

1. Ved arbeid med kodebase - opprett ny branch

   - Hent siste versjon fra repository
     - Kommando `git pull`
   - Kommando `git checkout -b feature/funksjon`

2. Skriv kode og test at det fungerer
3. Push kode i utviklingsbranch til repository på GitHub

```bash
    git add . # legger til endringer
    git commit -m "feat(login): Added loginsystem"  # commit og legg til passende beskrivelse
    git push -u origin feature/funksjon # push kode til repository
```

4. Opprett PR (Pull Request) på GitHub

   - Bruk nettleser og gå til repository
   - Opprett ny pull request med `master -> base` og `feature/funksjon -> compare`.

5. Ved opprettelse av PR kjører GitHub Workflows

   - Kode blir testet for å sjekke at frontend og backend kan bygges med Docker
   - Eventuelle tester som blir skrevet kjøres for å sikre funksjonalitet
   - Ved vellykket WorkFlow kan PR merges til `Master`
   - Velg "Squash and merge" for å merge til `Master`

6. Sletting av utviklingsbranch
   - Det fremgår etter vellykket merge at utviklingsbranch kan slettes
     - Velg å slette utviklingsbranch
   - Slett branch på lokal PC
     - Kommando `branch -d feature/funksjon`
     - Slett referanse for branch til Github-repo med kommando `git fetch --prune`
   - Synkroniser med GitHub - `git pull`

## Staging

For staging - Pull ned siste versjon av master

- `git pull`
- Bygg lokale docker-images med:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

- Start lokalt miljø med:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Produksjon

Etter lokalt staging kan endringer pushes til produksjon

- For produksjon - Manuell deployment i GitHub Actions:

1. Gå til GitHub repository -> Actions
2. Velg "Deploy to Production" workflow
3. Klikk "Run workflow"
4. Angi versjonsnummer og beskrivelse
5. Klikk "Run workflow" for å starte deployment

#### Produksjonsmiljø

- Hostes på AWS med EC2
- Domene rasteplass.eu

  - Konfigurert til å peke til EC2-instans

  ##### SIKKERHET

  - Installert Fail2Ban for å hindre mer enn 5 påloggingsforsøk med SSH.
  - Ved over 5 forsøk blir IP satt i arrest i 1 time.
  - SSH er deaktiver for bruk med passord.

## TRELLO - Arbeidsfordeling og samarbeid

Bruk av Trello som Kanban board for styring av oppgaver og gjøremål.
Deltakere legges til i board og kan følge fremdrift og kommunisere vedrørende arbeidsrelaterte spørsmål.
