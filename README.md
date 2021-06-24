# familie-ba-soknad

Frontend - søknad for barnetrygd.

## Avhengigheter
1. Node versjon >=14

## Kjør lokalt


1. `yarn install`
2. `yarn start:dev`

For å kjøre med mellomlagring må du ha familie-dokument kjørende. 

## Kjør full app
For å kunne se PDFen som blir sent til joark (arkivering) lokalt må vi kjøre en del apper i tillegg til denne.
From the top (rekkefølge er viktig, steg 5 krasjer hvis du ikke gjør steg 3 først f.eks.)

1.  ### [familie-ba-soknad-api](https://github.com/navikt/familie-ba-soknad-api)
    Kjør LokalLauncher
   
2.  ### [navkafka-docker-compose](https://github.com/navikt/navkafka-docker-compose)
    Kjør `docker-compose up -d`
    
3.  ### [postgres](https://hub.docker.com/_/postgres)
    Kjør
    ```shell
    docker run \
        --name postgres \
        --rm \
        -p 5432:5432 \
        -e POSTGRES_PASSWORD=test \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_DB=familie-ba-mottak \
        -d \
        postgres
    ```
    
    Eller legg til tilsvarende service i `navkafka-docker-compose/docker-compose.yml`

4.  ### [familie-ba-dokgen](https://github.com/navikt/familie-ba-dokgen)
    Kjør `docker-compose up -d`
   
5.  ### [familie-ba-mottak](https://github.com/navikt/familie-ba-mottak)
    Git apply den følgende diffen
    ```diff
    diff --git "a/src/main/kotlin/no/nav/familie/ba/mottak/task/Journalf\303\270rS\303\270knadTask.kt" "b/src/main/kotlin/no/nav/familie/ba/mottak/task/Journalf\303\270rS\303\270knadTask.kt"
    index 0efad49..bbda0d8 100644
    --- "a/src/main/kotlin/no/nav/familie/ba/mottak/task/Journalf\303\270rS\303\270knadTask.kt"
    +++ "b/src/main/kotlin/no/nav/familie/ba/mottak/task/Journalf\303\270rS\303\270knadTask.kt"
    @@ -8,6 +8,7 @@ import no.nav.familie.prosessering.domene.Task
    import org.slf4j.Logger
    import org.slf4j.LoggerFactory
    import org.springframework.stereotype.Service
    +import java.io.File
    
    @Service
    @TaskStepBeskrivelse(taskStepType = JournalførSøknadTask.JOURNALFØR_SØKNAD, beskrivelse = "Journalfør søknad")
    @@ -17,6 +18,8 @@ class JournalførSøknadTask(private val pdfService: PdfService,
    override fun doTask(task: Task) {
    log.info("Generer pdf og journalfør søknad")
    val pdf = pdfService.lagPdf(task.payload)
    +        val home: String = System.getenv("HOME") + "/mottak-pdf.pdf"
    +        val outputFile = File(home).writeBytes(pdf)
             journalføringService.journalførSøknad(task.payload, pdf)
      }
    
    diff --git a/src/test/kotlin/no/nav/familie/ba/mottak/DevLauncherPostgres.kt b/src/test/kotlin/no/nav/familie/ba/mottak/DevLauncherPostgres.kt
    index b4cf801..2faa184 100644
    --- a/src/test/kotlin/no/nav/familie/ba/mottak/DevLauncherPostgres.kt
    +++ b/src/test/kotlin/no/nav/familie/ba/mottak/DevLauncherPostgres.kt
    @@ -11,6 +11,6 @@ class DevLauncherPostgres
    
    fun main(args: Array<String>) {
    val app = SpringApplicationBuilder(DevLauncherPostgres::class.java)
    -            .profiles("postgres", "mock-dokarkiv", "mock-dokgen")
    +            .profiles("postgres", "mock-dokarkiv")
      app.run(*args)
      }
      \ No newline at end of file
    ```
    Kjør DevLauncherPostgres

6.  ### [Gå igjennom søknaden](http://localhost:3000/)
    Pdf blir lagret i home directory som `mottak-pdf.pdf`

# Bygg og deploy
Appen bygges hos github actions, og gir beskjed til nais deploy om å deployere appen i gcp. Alle commits til feature brancher går til dev miljøet og master går til produksjon.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til:

* Henning Håkonsen, `henning.hakonsen@nav.no`

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-familie.


### Logging til Sentry
https://sentry.gc.nav.no/nav/familie-ba-soknad/

Bruk tag ``` scope:familie-ba-soknad ``` for å filtrere på kun exceptions fanget opp av Sentry.ErrorBoundary (dette vil f eks filtrere ut alle exceptions som nav-dokoratøren kaster)

