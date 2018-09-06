import {
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
} from './types';
import {
    harFyltInnFodselsdato,
    harFyltInnFodselsnummer,
    harFyltInnNavn,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    svarUtenValidering,
} from './validators';

interface IValideringsConfig {
    arbeidsforhold: { [felt in arbeidsforholdFeltnavn]: (felt: IFelt) => IFelt };
    barnehageplass: { [felt in barnehageplassFeltnavn]: (felt: IFelt) => IFelt };
    familieforhold: { [felt in familieforholdFeltnavn]: (felt: IFelt) => IFelt };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: (felt: IFelt) => IFelt };
    mineBarn: { [felt in minebarnFeltnavn]: (felt: IFelt) => IFelt };
}

const valideringsConfig: IValideringsConfig = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: harSvartMedFeilmelding,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: svarUtenValidering,
        mottarKontantstotteFraAnnetEOS: harSvartMedFeilmelding,
        mottarKontantstotteFraAnnetEOSForklaring: svarUtenValidering,
        mottarYtelserFraUtlandet: harSvartMedFeilmelding,
        mottarYtelserFraUtlandetForklaring: svarUtenValidering,
    },
    barnehageplass: {
        antallTimer: svarUtenValidering,
        dato: svarUtenValidering,
        harBarnehageplass: harSvartBarnehageplassVerdiMedFeilmelding,
        kommune: svarUtenValidering,
    },
    familieforhold: {
        annenForelderFodselsnummer: harFyltInnFodselsnummer,
        annenForelderNavn: harFyltInnNavn,
        annenForelderYrkesaktivINorgeEOSIMinstFemAar: harSvartMedFeilmelding,
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
};

export default valideringsConfig;
