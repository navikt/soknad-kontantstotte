import { TeksterActionTypes, TeksterTypeKeys } from './actions';
import { ISprak, ITekster } from './types';

interface ITeksterState {
    readonly henter: boolean;
    readonly tekster: ITekster;
    readonly valgtSprak: ISprak;
}

const initialState: ITeksterState = {
    henter: false,
    tekster: {},
    valgtSprak: ISprak.nb,
};

function teksterReducer(state = initialState, action: TeksterActionTypes) {
    switch (action.type) {
        case TeksterTypeKeys.HENT:
            return {
                ...state,
                henter: true,
                valgtSprak: action.valgtSprak,
            };
        case TeksterTypeKeys.HENT_OK:
            return {
                ...state,
                henter: false,
                tekster: action.tekster,
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

export { ITeksterState, teksterReducer };
