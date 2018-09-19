import {
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    tilknytningTilUtlandFeltnavn,
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
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    svarUtenValidering,
} from './validators';

interface IValideringsConfig {
    arbeidsforhold: { [felt in arbeidsforholdFeltnavn]: (felt: IFelt) => IFelt };
    barnehageplass: { [felt in barnehageplassFeltnavn]: (felt: IFelt) => IFelt };
    familieforhold: { [felt in familieforholdFeltnavn]: (felt: IFelt) => IFelt };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: (felt: IFelt) => IFelt };
    mineBarn: { [felt in minebarnFeltnavn]: (felt: IFelt) => IFelt };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: (felt: IFelt) => IFelt };
    tilknytningTilUtland: { [felt in tilknytningTilUtlandFeltnavn]: (felt: IFelt) => IFelt };
}

const valideringsConfig: IValideringsConfig = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: harSvartMedFeilmelding,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: harSvartTekstMedFeilmelding,
        mottarKontantstotteFraAnnetEOS: harSvartMedFeilmelding,
        mottarKontantstotteFraAnnetEOSForklaring: harSvartTekstMedFeilmelding,
        mottarYtelserFraUtlandet: harSvartMedFeilmelding,
        mottarYtelserFraUtlandetForklaring: harSvartTekstMedFeilmelding,
    },
    barnehageplass: {
        barnBarnehageplassStatus: harSvartBarnehageplassVerdiMedFeilmelding,
        harBarnehageplass: harSvartMedFeilmelding,
        harSluttetIBarnehageAntallTimer: harSvartTekstMedFeilmelding,
        harSluttetIBarnehageDato: harSvartTekstMedFeilmelding,
        harSluttetIBarnehageKommune: harSvartTekstMedFeilmelding,
    },
    familieforhold: {
        annenForelderFodselsnummer: harFyltInnFodselsnummer,
        annenForelderNavn: harFyltInnNavn,
        borForeldreneSammenMedBarnet: harSvartMedFeilmelding,
    },
    kravTilSoker: {
        barnIkkeHjemme: harSvartJaMedFeilmelding,
        boddEllerJobbetINorgeSisteFemAar: harSvartJaMedFeilmelding,
        borSammenMedBarnet: harSvartJaMedFeilmelding,
        ikkeAvtaltDeltBosted: harSvartJaMedFeilmelding,
        norskStatsborger: harSvartJaMedFeilmelding,
        skalBoMedBarnetINorgeNesteTolvMaaneder: harSvartJaMedFeilmelding,
    },
    mineBarn: {
        fodselsdato: harFyltInnFodselsdato,
        navn: harFyltInnNavn,
    },
    tilknytningTilUtland: {
        annenForelderBoddEllerJobbetINorgeMinstFemAar: harSvartTilknytningTilUtlandVerdiMedFeilmelding,
        boddEllerJobbetINorgeMinstFemAar: harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: harSvartMedFeilmelding,
        mottarAnnenForelderYtelserFraUtlandForklaring: harSvartTekstMedFeilmelding,
        mottarYtelserFraUtland: harSvartMedFeilmelding,
        mottarYtelserFraUtlandForklaring: harSvartTekstMedFeilmelding,
    },
};

export default valideringsConfig;
