soknad-kontantstotte
====================

Søknadsdialog for ny kontantstøtte-søknad

# Kom i gang med utvikling

* Installere avhengigheter `yarn`
* Starte dev-server `yarn start`
* Åpne `http://localhost:8000/` i nettleseren din

For å bygge en prodversjon kjør `yarn build`

Test med backend lokalt ved å kjøre [_soknad-kontantstotte-proxy_](https://github.com/navikt/soknad-kontantstotte-proxy), [_soknad-kontantstotte-api_](https://github.com/navikt/soknad-kontantstotte-api) og `yarn start:proxy`.

# Bygging på egen maskin

`./build.sh` 

Se også `./build.sh --help` for alternativer 

---

# Bygg og deploy
Appen bygges hos circleci, og gir beskjed til nais deploy om å deployere appen i sbs området. Alle commits til feature brancher(og master) går til stabilt testmiljø. Tags med formen `vx.x` deployes til produksjon.

# Rollback
Dersom uhellet er ute gjøres rollback manuelt med kubectl. Her er en step-by-step guide på hva du kan gjøre:

1. Finn siste fungere tag(som regel taggen før latest) på `https://cloud.docker.com/u/navikt/repository/docker/navikt/<app>`.
2. Manuelt endre versjon i naiseratorfila: `image: navikt/soknad-kontantstote:<tag>`
3. Naviger til naiserator filen og skriv kommandoen: `kubectl apply -f <naiseratorfil>.yaml --context=<cluster>-sbs`.
4. Forventet output burde være:

```
kubectl apply -f app-preprod.yaml --context=dev-sbs
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply // Denne meldingen er OK
application.nais.io/soknad-kontantstotte configured 
```


# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til <epost>

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #teamsoknad.
