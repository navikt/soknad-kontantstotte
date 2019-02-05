import {
    arbeidIUtlandetFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    IVedleggFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    oppsummeringFeltnavn,
    tilknytningTilUtlandFeltnavn,
    utenlandskeYtelserFeltnavn,
    utenlandskKontantstotteFeltnavn,
} from './types';
import {
    annenForelderHarIkkeSvartNeiTilknytningTilUtland,
    harBekreftetOppsummering,
    harFyltInnDato,
    harFyltInnFodselsnummer,
    harFyltInnGyldigAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harLastetOppVedlegg,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartTekstMedFeilmelding,
    harSvartTekstUnderAntallTegnMedFeilmelding,
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    sokerHarIkkeSvartNeiTilknytningTilUtland,
    svarUtenValidering,
} from './validators';

export type ValideringsFunksjoner = (felt: IFelt & IVedleggFelt) => IFelt | IVedleggFelt;

interface IValideringsConfig {
    arbeidIUtlandet: { [felt in arbeidIUtlandetFeltnavn]: ValideringsFunksjoner[] };
    barnehageplass: { [felt in barnehageplassFeltnavn]: ValideringsFunksjoner[] };
    familieforhold: { [felt in familieforholdFeltnavn]: ValideringsFunksjoner[] };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: ValideringsFunksjoner[] };
    mineBarn: { [felt in minebarnFeltnavn]: ValideringsFunksjoner[] };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: ValideringsFunksjoner[] };
    oppsummering: { [felt in oppsummeringFeltnavn]: ValideringsFunksjoner[] };
    utenlandskKontantstotte: { [felt in utenlandskKontantstotteFeltnavn]: ValideringsFunksjoner[] };
    tilknytningTilUtland: { [felt in tilknytningTilUtlandFeltnavn]: ValideringsFunksjoner[] };
}

const valideringsConfig: IValideringsConfig = {
    arbeidIUtlandet: {
        arbeiderAnnenForelderIUtlandet: [harSvartMedFeilmelding],
        arbeiderAnnenForelderIUtlandetForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        arbeiderIUtlandetEllerKontinentalsokkel: [harSvartMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    barnehageplass: {
        barnBarnehageplassStatus: [harSvartBarnehageplassVerdiMedFeilmelding],
        harBarnehageplass: [harSvartMedFeilmelding],
        harBarnehageplassAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harBarnehageplassDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        harBarnehageplassKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harSluttetIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        harSluttetIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalBegynneIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        skalBegynneIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalSlutteIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        skalSlutteIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageVedlegg: [harLastetOppVedlegg],
    },
    familieforhold: {
        annenForelderFodselsnummer: [harSvartTekstMedFeilmelding, harFyltInnFodselsnummer],
        annenForelderNavn: [harFyltInnNavn],
        borForeldreneSammenMedBarnet: [harSvartMedFeilmelding],
    },
    kravTilSoker: {
        barnIkkeHjemme: [harSvartJaMedFeilmelding],
        boddEllerJobbetINorgeSisteFemAar: [harSvartJaMedFeilmelding],
        borSammenMedBarnet: [harSvartJaMedFeilmelding],
        ikkeAvtaltDeltBosted: [harSvartJaMedFeilmelding],
        norskStatsborger: [harSvartJaMedFeilmelding],
        skalBoMedBarnetINorgeNesteTolvMaaneder: [harSvartJaMedFeilmelding],
    },
    mineBarn: {
        erBrukerOpprettet: [svarUtenValidering],
        erFlerling: [svarUtenValidering],
        fodselsdato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        navn: [harFyltInnNavn],
    },
    oppsummering: {
        bekreftelse: [harBekreftetOppsummering],
    },
    tilknytningTilUtland: {
        annenForelderBoddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
            annenForelderHarIkkeSvartNeiTilknytningTilUtland,
        ],
        annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        boddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
            sokerHarIkkeSvartNeiTilknytningTilUtland,
        ],
        boddEllerJobbetINorgeMinstFemAarForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: [harSvartMedFeilmelding],
        mottarKontantstotteFraUtlandetTilleggsinfo: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: [harSvartMedFeilmelding],
        mottarAnnenForelderYtelserFraUtlandForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        mottarYtelserFraUtland: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
};

export default valideringsConfig;
