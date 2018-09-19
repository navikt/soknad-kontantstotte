import {
    arbeidIUtlandetFeltnavn,
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
    arbeidIUtlandet: { [felt in arbeidIUtlandetFeltnavn]: (felt: IFelt) => IFelt };
    barnehageplass: { [felt in barnehageplassFeltnavn]: (felt: IFelt) => IFelt };
    familieforhold: { [felt in familieforholdFeltnavn]: (felt: IFelt) => IFelt };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: (felt: IFelt) => IFelt };
    mineBarn: { [felt in minebarnFeltnavn]: (felt: IFelt) => IFelt };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: (felt: IFelt) => IFelt };
}

const valideringsConfig: IValideringsConfig = {
    arbeidIUtlandet: {
        arbeiderAnnenForelderIUtlandet: harSvartMedFeilmelding,
        arbeiderAnnenForelderIUtlandetForklaring: harSvartTekstMedFeilmelding,
        arbeiderIUtlandetEllerKontinentalsokkel: harSvartMedFeilmelding,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: harSvartTekstMedFeilmelding,
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
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: harSvartMedFeilmelding,
        mottarAnnenForelderYtelserFraUtlandForklaring: harSvartTekstMedFeilmelding,
        mottarYtelserFraUtland: harSvartMedFeilmelding,
        mottarYtelserFraUtlandForklaring: harSvartTekstMedFeilmelding,
    },
};

export default valideringsConfig;
