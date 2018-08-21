import { PersonActionTypes, PersonTypeKeys } from './actions';
import { IPerson } from './types';

interface IPersonState {
    readonly person: IPerson;
    readonly henter: boolean;
}

const initialState: IPersonState = {
    henter: false,
    person: {
        navn: '',
        barn: [],
    },
};

function personReducer(state = initialState, action: PersonActionTypes) {
    switch (action.type) {
        case PersonTypeKeys.HENT:
            return {
                ...state,
                henter: true,
            };
        case PersonTypeKeys.HENT_OK:
            return {
                ...state,
                henter: false,
                person: action.person,
            };
        case PersonTypeKeys.HENT_FEILET: {
            return {
                ...state,
                henter: false,
            };
        }
        default:
            return state;
    }
}

export { personReducer, IPersonState };
