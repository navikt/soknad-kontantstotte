import {
    TeksterActionTypes,
    TeksterTypeKeys,
} from './actions';
import { ITekster } from './types';

interface ITeksterState {
    readonly henter: boolean;
    readonly tekster: ITekster;
    readonly valgtSprak: 'nb';
}

const initialState: ITeksterState = {
    henter: false,
    tekster: {},
    valgtSprak: 'nb',
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
};
