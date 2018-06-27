import { IBarn } from '../barn/types';
import { SoknadActionTypes, SoknadTypeKeys } from './actions';

interface ISoknadSate {
    barn: IBarn;
    boddINorgeSisteFemAar: boolean;
    borSammenMedBarnet: boolean;
    skalBoMedBarnetINorgeNesteTolvMaaneder: boolean;
    mottarYtelserFraUtlandet: boolean;
    mottarYtelserFraUtlandetForklaring?: string;
    arbeiderIUtlandetEllerKontinentalsokkel: boolean;
    arbeiderIUtlandetEllerKontinentalsokkelForklaring?: string;
    mottarKontantstotteFraAnnetEOS: boolean;
    mottarKontantstotteFraAnnetEOSForklaring?: string;
    borForeldreneSammenMedBarnet: boolean;
    erAvklartDeltBosted?: boolean;
    annenForelderNavn?: string;
    annenForelderPersonnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar?: boolean;
}

const initialState = {
    barn: {},
    boddINorgeSisteFemAar: false,
    borSammenMedBarnet: false,
    skalBoMedBarnetINorgeNesteTolvMaaneder: false
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
    ISoknadSate,
    soknadReducer,
};
