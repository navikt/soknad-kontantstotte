import { Feltnavn, IFelt, Stegnavn } from './types';
import {
    harFyltInnFodselsdato,
    harFyltInnFodselsnummer,
    harFyltInnNavn,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    svarUtenValidering,
} from './validators';

type IValideringsConfig = {
    [stegnavn in Stegnavn]: { [feltnavn in Feltnavn]: (felt: IFelt) => IFelt }
};

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
        harBarnehageplass: harSvartMedFeilmelding,
        kommune: svarUtenValidering,
    },
    familieforhold: {
        annenForelderFodselsnummer: harFyltInnFodselsnummer,
        annenForelderNavn: harFyltInnNavn,
        annenForelderYrkesaktivINorgeEOSIMinstFemAar: harSvartMedFeilmelding,
        borForeldreneSammenMedBarnet: harSvartMedFeilmelding,
        erAvklartDeltBosted: harSvartMedFeilmelding,
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
