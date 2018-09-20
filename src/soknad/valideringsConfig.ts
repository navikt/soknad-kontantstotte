import {
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    utenlandskeYtelserFeltnavn,
} from './types';
import {
    harFyltInnFodselsdato,
    harFyltInnFodselsnummer,
    harFyltInnNavn,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartTekstMedFeilmelding,
    svarUtenValidering,
} from './validators';

interface IValideringsConfig {
    arbeidsforhold: { [felt in arbeidsforholdFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    barnehageplass: { [felt in barnehageplassFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    familieforhold: { [felt in familieforholdFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    mineBarn: { [felt in minebarnFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: Array<((felt: IFelt) => IFelt)> };
}

const valideringsConfig: IValideringsConfig = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: [harSvartMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: [harSvartTekstMedFeilmelding],
        mottarKontantstotteFraAnnetEOS: [harSvartMedFeilmelding],
        mottarKontantstotteFraAnnetEOSForklaring: [harSvartTekstMedFeilmelding],
        mottarYtelserFraUtlandet: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandetForklaring: [harSvartTekstMedFeilmelding],
    },
    barnehageplass: {
        barnBarnehageplassStatus: [harSvartBarnehageplassVerdiMedFeilmelding],
        harBarnehageplass: [harSvartMedFeilmelding],
        harBarnehageplassAntallTimer: [harSvartTekstMedFeilmelding],
        harBarnehageplassDato: [harSvartTekstMedFeilmelding],
        harBarnehageplassKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageAntallTimer: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageDato: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageAntallTimer: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageDato: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageAntallTimer: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageDato: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageKommune: [harSvartTekstMedFeilmelding],
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
        fodselsdato: [harSvartTekstMedFeilmelding, harFyltInnFodselsdato],
        navn: [harFyltInnNavn],
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: [harSvartMedFeilmelding],
        mottarAnnenForelderYtelserFraUtlandForklaring: [harSvartTekstMedFeilmelding],
        mottarYtelserFraUtland: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandForklaring: [harSvartTekstMedFeilmelding],
    },
};

export default valideringsConfig;
