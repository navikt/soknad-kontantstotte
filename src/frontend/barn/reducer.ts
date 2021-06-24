import { BarnActionTypes, BarnTypeKeys } from './actions';
import { IBarn } from './types';

interface IBarnState {
    readonly barn: IBarn[];
    readonly henter: boolean;
    indeksForValgtBarn: string;
}

const initialState: IBarnState = {
    barn: [],
    henter: false,
    indeksForValgtBarn: '',
};

function barnReducer(state = initialState, action: BarnActionTypes) {
    switch (action.type) {
        case BarnTypeKeys.HENT:
            return {
                ...state,
                henter: true,
            };
        case BarnTypeKeys.HENT_OK:
            return {
                ...state,
                barn: action.barn,
                henter: false,
            };
        case BarnTypeKeys.HENT_FEILET: {
            return {
                ...state,
                henter: false,
            };
        }
        case BarnTypeKeys.SETT_INDEKS_FOR_VALGT_BARN:
            return {
                ...state,
                indeksForValgtBarn: action.indeks,
            };
        default:
            return state;
    }
}

export { barnReducer, IBarnState, initialState };
