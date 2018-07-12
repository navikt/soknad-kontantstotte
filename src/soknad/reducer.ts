import { IBarn } from '../barn/types';
import { BarnehageplassVerdier } from '../sider/barnehageplass/BarnehageplassSide';
import { SoknadActionTypes, SoknadTypeKeys } from './actions';

enum Svar {
    JA = 'JA',
    NEI = 'NEI',
    UBESVART = 'UBESVART'
}

interface ISoknadState {
    barn: IBarn;
    boddINorgeSisteFemAar: Svar;
    borSammenMedBarnet: Svar;
    skalBoMedBarnetINorgeNesteTolvMaaneder: Svar;
    mottarYtelserFraUtlandet: Svar;
    mottarYtelserFraUtlandetForklaring?: string;
    arbeiderIUtlandetEllerKontinentalsokkel: Svar;
    arbeiderIUtlandetEllerKontinentalsokkelForklaring?: string;
    mottarKontantstotteFraAnnetEOS: Svar;
    mottarKontantstotteFraAnnetEOSForklaring?: string;
    borForeldreneSammenMedBarnet: Svar;
    erAvklartDeltBosted: Svar;
    annenForelderNavn?: string;
    annenForelderFodselsnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar;
    harBarnehageplass: BarnehageplassVerdier;
    barnehageplassDato?: string;
    barnehageplassKommune?: string;
    barnehageplassAntallTimer?: number;
}

const initialState = {
    annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar.UBESVART,
    arbeiderIUtlandetEllerKontinentalsokkel: Svar.UBESVART,
    barn: {},
    boddINorgeSisteFemAar: Svar.UBESVART,
    borForeldreneSammenMedBarnet: Svar.UBESVART,
    borSammenMedBarnet: Svar.UBESVART,
    erAvklartDeltBosted: Svar.UBESVART,
    harBarnehageplass: BarnehageplassVerdier.Ubesvart,
    mottarKontantstotteFraAnnetEOS: Svar.UBESVART,
    mottarYtelserFraUtlandet: Svar.UBESVART,
    skalBoMedBarnetINorgeNesteTolvMaaneder: Svar.UBESVART
};

function soknadReducer(state = initialState, action: SoknadActionTypes) {
    switch (action.type) {
        case SoknadTypeKeys.SETT_VERDI:
            return {
                ...state,
                [action.felt]: action.verdi
            };
        default:
            return state;
    }
}

export {
    Svar,
    ISoknadState,
    soknadReducer,
};
