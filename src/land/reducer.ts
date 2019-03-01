import { ISprak } from '../app/types';
import { LandActionTypes, LandTypeKeys } from './actions';
import { ILand } from './types';

interface ILandState {
    readonly henter: boolean;
    readonly land: ILand;
    readonly valgtSprak: ISprak;
}

const initialState: ILandState = {
    henter: false,
    land: {},
    valgtSprak: ISprak.nb,
};

function landReducer(state = initialState, action: LandActionTypes) {
    switch (action.type) {
        case LandTypeKeys.HENT:
            return {
                ...state,
                henter: true,
                valgtSprak: action.valgtSprak,
            };
        case LandTypeKeys.HENT_OK:
            return {
                ...state,
                henter: false,
                land: action.land,
            };
        case LandTypeKeys.HENT_FEILET:
            return {
                ...state,
                henter: false,
            };
        default:
            return state;
    }
}

export { ILandState, landReducer };
