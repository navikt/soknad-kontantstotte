import { IFaktum } from 'soknad-frontend/lib/faktum-container';
import {
    FaktumActionTypes,
    FaktumTypeKeys,
} from './actions';

export interface IFaktumState {
    readonly fakta: IFaktum[];
    readonly henterFaktum: boolean;
}

const initialState: IFaktumState = {
    fakta: [] as IFaktum[],
    henterFaktum: false,
};

function faktumReducer( state: IFaktumState = initialState, action: FaktumActionTypes ): IFaktumState {
    switch ( action.type ) {
        case FaktumTypeKeys.FAKTUM_HENT:
            return {
                ...state,
                henterFaktum: true,
            };
        case FaktumTypeKeys.FAKTUM_HENT_OK:
            return {
                ...state,
                fakta: action.fakta,
                henterFaktum: false,
            };
        case FaktumTypeKeys.FAKTUM_HENT_FEILET:
            return {
                ...state,
                henterFaktum: false,
            };
        case FaktumTypeKeys.FAKTUM_OPPDATER_VERDI:
            const fakta = state.fakta.map( ( f ) => {
                if ( f.key === action.faktum.key ) {
                    return action.faktum;
                }
                return f;
            } );
            return {
                ...state,
                fakta,
            };
        default:
            return state;
    }
}

export { faktumReducer };
