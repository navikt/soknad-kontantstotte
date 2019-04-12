import { BarnActionTypes, BarnTypeKeys } from './actions';
import { IBarn } from './types';

interface IBarnState {
    readonly barn: IBarn[];
    readonly henter: boolean;
}

const initialState: IBarnState = {
    barn: [
        {
            erFlerling: false,
            fodselsdato: '',
            fulltnavn: '',
            index: '',
        },
    ],
    henter: false,
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
                barn: action.barn.map((b, i) => ({ ...b, index: `${i}` })),
                henter: false,
            };
        case BarnTypeKeys.HENT_FEILET: {
            return {
                ...state,
                henter: false,
            };
        }
        default:
            return state;
    }
}

export { barnReducer, IBarnState, initialState };
