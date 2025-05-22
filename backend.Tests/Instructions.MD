Instruksjoner for å kjøre tester:

- cd backend.Tests
- For å kjøre alle testene: ``dotnet test``
- For å kjøre spesifikke tester: ``dotnet test --filter "navnpåtest"``
- Stress testene er disabled med (skip = ""), så de vil ikke vises med dotnet testing før du fjerner dem.

StressTests:

- For å stress teste må backend kjøre: ``docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build``
- Testene er satt opp med (skip = ""), fjern disse fra testene du vil teste og legg til igjen når ferdig.   