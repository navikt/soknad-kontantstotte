import {
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    oppsummeringFeltnavn,
    utenlandskeYtelserFeltnavn,
    utenlandskKontantstotteFeltnavn,
} from './types';
import {
    harFyltInnFodselsdato,
    harFyltInnFodselsnummer,
    harFyltInnGyldingAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartTekstMedFeilmelding,
} from './validators';

interface IValideringsConfig {
    arbeidsforhold: { [felt in arbeidsforholdFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    barnehageplass: { [felt in barnehageplassFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    familieforhold: { [felt in familieforholdFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    mineBarn: { [felt in minebarnFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    oppsummering: { [felt in oppsummeringFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    utenlandskKontantstotte: {
        [felt in utenlandskKontantstotteFeltnavn]: Array<((felt: IFelt) => IFelt)>
    };
}

const valideringsConfig: IValideringsConfig = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: [harSvartMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: [harSvartTekstMedFeilmelding],
        mottarYtelserFraUtlandet: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandetForklaring: [harSvartTekstMedFeilmelding],
    },
    barnehageplass: {
        barnBarnehageplassStatus: [harSvartBarnehageplassVerdiMedFeilmelding],
        harBarnehageplass: [harSvartMedFeilmelding],
        harBarnehageplassAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldingAntallTimer,
        ],
        harBarnehageplassDato: [harSvartTekstMedFeilmelding],
        harBarnehageplassKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldingAntallTimer,
        ],
        harSluttetIBarnehageDato: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldingAntallTimer,
        ],
        skalBegynneIBarnehageDato: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldingAntallTimer,
        ],
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
    oppsummering: {
        bekreftelse: [harSvartMedFeilmelding],
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: [harSvartMedFeilmelding],
        mottarKontantstotteFraUtlandetTilleggsinfo: [harSvartTekstMedFeilmelding],
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: [harSvartMedFeilmelding],
        mottarAnnenForelderYtelserFraUtlandForklaring: [harSvartTekstMedFeilmelding],
        mottarYtelserFraUtland: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandForklaring: [harSvartTekstMedFeilmelding],
    },
};

export default valideringsConfig;
