soknad-kontantstotte
====================

Søknadsdialog for ny kontantstøtte-søknad

# Kom i gang med utvikling

* Installere avhengigheter `yarn`
* Starte dev-server `yarn start`
* Åpne `http://localhost:8000/soknad-kontantstotte` i nettleseren din

For å bygge en prodversjon kjør `yarn build:prod`

# Bygging på egen maskin

`docker build .` 

Dette vil feile på Step 11/11 `COPY --from=builder /workspace/VERSION /app/VERSION` ettersom VERSION-fila genereres på jeninks for 
opplasting og versjonering. Lokalt er det ikke lagt opp til versjonering og publisering til repo.adeo.no

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til <epost>

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #teamsoknad.