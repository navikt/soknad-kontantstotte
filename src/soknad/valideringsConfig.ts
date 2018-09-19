import {
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    oppsummeringFeltnavn,
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
    arbeidsforhold: { [felt in arbeidsforholdFeltnavn]: (felt: IFelt) => IFelt };
    barnehageplass: { [felt in barnehageplassFeltnavn]: (felt: IFelt) => IFelt };
    familieforhold: { [felt in familieforholdFeltnavn]: (felt: IFelt) => IFelt };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: (felt: IFelt) => IFelt };
    mineBarn: { [felt in minebarnFeltnavn]: (felt: IFelt) => IFelt };
    oppsummering: { [felt in oppsummeringFeltnavn]: (felt: IFelt) => IFelt };
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
    oppsummering: {
        bekreftelse: harSvartJaMedFeilmelding,
    },
};

export default valideringsConfig;
