import { Feltnavn, IFelt, Stegnavn } from './types';
import {
    harFyltInnNavn,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harFyltInnFodselsnummer,
} from './validators';

type IValideringsConfig = { [stegnavn in Stegnavn]: { [feltnavn in Feltnavn]: () => IFelt } };

const valideringsConfig: IValideringsConfig = {
    // arbeidsforhold: {
    //     mottarYtelserFraUtlandet
    //     mottarYtelserFraUtlandetForklaring
    //     arbeiderIUtlandetEllerKontinentalsokkel
    //     arbeiderIUtlandetEllerKontinentalsokkelForklaring
    //     mottarKontantstotteFraAnnetEOS
    //     mottarKontantstotteFraAnnetEOSForklaring
    // },
    // barnehageplass: {
    //     harBarnehageplass
    //     dato
    //     kommune
    //     antallTimer
    // },
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
    // mineBarn: {
    //     navn
    //     fodselsdato
    // },
};

export default valideringsConfig;
