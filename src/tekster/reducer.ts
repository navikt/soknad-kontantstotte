import {
    TeksterActionTypes,
    TeksterTypeKeys,
} from './actions';
import { ITekster } from './types';

interface ITeksterState {
    readonly tekster: ITekster;
    readonly henter: boolean;
    readonly valgtSprak: 'nb'
}

const initialState: ITeksterState = {
    tekster: {},
    henter: false,
    valgtSprak: 'nb'
};

function teksterReducer(state = initialState, action: TeksterActionTypes) {
    switch (action.type) {
        case TeksterTypeKeys.HENT:
            return {
                ...state,
                henter: true,
            };
        case TeksterTypeKeys.HENT_OK:
            return {
                ...state,
                henter: false,
                tekster: action.tekster
            };
        case TeksterTypeKeys.HENT_FEILET:
            return {
                ...state,
                henter: false,
            };
        default:
            return state;
    }
}

export {
    ITeksterState,
    teksterReducer,
}