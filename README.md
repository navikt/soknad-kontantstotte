soknad-kontantstotte
====================

Søknadsdialog for ny kontantstøtte-søknad

# Kom i gang med utvikling

* Installere avhengigheter `yarn`
* Starte dev-server `yarn start:dev`
* Åpne `http://localhost:3000/` i nettleseren din

For å bygge en prodversjon kjør `yarn build`

Test med backend lokalt ved å kjøre [_soknad-kontantstotte-proxy_](https://github.com/navikt/soknad-kontantstotte-proxy), [_soknad-kontantstotte-api_](https://github.com/navikt/soknad-kontantstotte-api) og `yarn start:proxy`.

# Bygg og deploy
Appen bygges hos github, og gir beskjed til nais deploy om å deployere appen. Se .github folder og build_n_deploy/ folder for mer info. Alle commits til feature brancher går til stabilt testmiljø.

# Rollback
Dersom uhellet er ute gjøres rollback manuelt med kubectl. Her er en step-by-step guide på hva du kan gjøre:

1. Finn siste fungerende tag(som regel taggen før latest) på `https://cloud.docker.com/u/navikt/repository/docker/navikt/<app>`.
2. Manuelt endre versjon i naiseratorfila: `image: navikt/soknad-kontantstote:<tag>`
3. Naviger til naiserator filen og skriv kommandoen: `kubectl apply -f <naiseratorfil>.yaml --context=<cluster>-sbs`.
4. Forventet output burde være:

```
kubectl apply -f app-preprod.yaml --context=dev-sbs
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply // Denne meldingen er OK
application.nais.io/soknad-kontantstotte configured 
```

Alternativt kjør forrige fungerende bygg av master på github actions på nytt.

# Pålogging i preprod
Man kan logge på i preprod med brukere opprettet i Dolly. Man blir videresendt til loginservice og velger da å logge på "Uten IDPorten".

NB: Du må selv være pålogget i preprod for at du skal komme til oidc-stub. Dersom du etter å ha valgt "Uten IDPorten" havner i vanlig innloggingsløp og blir bedt om å logge på med epostadresse så logg på med egen bruker først. Deretter vil du da komme til oidc-stub der du kun oppgir fnr til testbrukeren din.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-familie.
