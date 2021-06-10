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
    veiledningFeltnavn,
} from './types';
import {
    annenForelderHarIkkeSvartNeiTilknytningTilUtland,
    erGyldigDato,
    fødselsnummerPassererMod10ogMod11Sjekk,
    harBekreftetOppsummering,
    harBekreftetVeiledning,
    harFyltInnDato,
    harFyltInnFødselsnummer,
    harFyltInnGyldigAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harLastetOppVedlegg,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartMineBarnMedFeilmelding,
    harSvartOppgiInfoMedFeilmelding,
    harSvartTekstMedFeilmelding,
    harSvartTekstUnderAntallTegnMedFeilmelding,
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    harSvartTomtFødselsnummer,
    sokerHarIkkeSvartNeiTilknytningTilUtland,
    svarUtenValidering,
} from './validators';

type ValiderIFelt = (felt: IFelt) => IFelt;
type ValiderIVedleggFelt = (felt: IVedleggFelt) => IVedleggFelt;

export type ValideringsFunksjon = ValiderIFelt | ValiderIVedleggFelt;

interface IValideringsConfig {
    arbeidIUtlandet: { [felt in arbeidIUtlandetFeltnavn]: ValideringsFunksjon[] };
    barnehageplass: { [felt in barnehageplassFeltnavn]: ValideringsFunksjon[] };
    familieforhold: { [felt in familieforholdFeltnavn]: ValideringsFunksjon[] };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: ValideringsFunksjon[] };
    mineBarn: { [felt in minebarnFeltnavn]: ValideringsFunksjon[] };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: ValideringsFunksjon[] };
    oppsummering: { [felt in oppsummeringFeltnavn]: ValideringsFunksjon[] };
    utenlandskKontantstotte: { [felt in utenlandskKontantstotteFeltnavn]: ValideringsFunksjon[] };
    tilknytningTilUtland: { [felt in tilknytningTilUtlandFeltnavn]: ValideringsFunksjon[] };
    veiledning: { [felt in veiledningFeltnavn]: ValideringsFunksjon[] };
}

const valideringsConfig: IValideringsConfig = {
    arbeidIUtlandet: {
        arbeiderAnnenForelderIUtlandet: [harSvartMedFeilmelding],
        arbeiderAnnenForelderIUtlandetForklaring: [
            harSvartOppgiInfoMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        arbeiderIUtlandetEllerKontinentalsokkel: [harSvartMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: [
            harSvartOppgiInfoMedFeilmelding,
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
        harBarnehageplassDato: [harSvartTekstMedFeilmelding, harFyltInnDato, erGyldigDato],
        harBarnehageplassKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harSluttetIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato, erGyldigDato],
        harSluttetIBarnehageKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageVedlegg: [harLastetOppVedlegg],
        skalBegynneIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalBegynneIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato, erGyldigDato],
        skalBegynneIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalSlutteIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato, erGyldigDato],
        skalSlutteIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageVedlegg: [harLastetOppVedlegg],
    },
    familieforhold: {
        annenForelderFødselsnummer: [
            harSvartTomtFødselsnummer,
            harFyltInnFødselsnummer,
            fødselsnummerPassererMod10ogMod11Sjekk,
        ],
        annenForelderNavn: [harFyltInnNavn],
        borForeldreneSammenMedBarnet: [harSvartMedFeilmelding],
    },
    kravTilSoker: {
        barnIkkeHjemme: [harSvartJaMedFeilmelding],
        borSammenMedBarnet: [harSvartJaMedFeilmelding],
        ikkeAvtaltDeltBosted: [harSvartJaMedFeilmelding],
        skalBoMedBarnetINorgeNesteTolvMaaneder: [harSvartJaMedFeilmelding],
    },
    mineBarn: {
        erFlerling: [svarUtenValidering],
        fødselsdato: [harSvartMineBarnMedFeilmelding],
        fødselsnummer: [svarUtenValidering],
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
            harSvartOppgiInfoMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        boddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
            sokerHarIkkeSvartNeiTilknytningTilUtland,
        ],
        boddEllerJobbetINorgeMinstFemAarForklaring: [
            harSvartOppgiInfoMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: [harSvartMedFeilmelding],
        mottarKontantstotteFraUtlandetTilleggsinfo: [
            harSvartOppgiInfoMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: [harSvartMedFeilmelding],
        mottarAnnenForelderYtelserFraUtlandForklaring: [
            harSvartOppgiInfoMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        mottarYtelserFraUtland: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandForklaring: [
            harSvartOppgiInfoMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    veiledning: {
        bekreftelse: [harBekreftetVeiledning],
    },
};

export default valideringsConfig;
