import { AppActionTypes, AppTypeKeys } from './actions';
import { AppStatus, ISprak } from './types';

interface IAppState {
    harForsoktNesteSteg: boolean;
    status: AppStatus;
    steg: number;
    valgtSprak: ISprak;
    error: any;
}

const initialState: IAppState = {
    harForsoktNesteSteg: false,
    status: AppStatus.IKKE_STARTET,
    steg: 0,
    valgtSprak: ISprak.nb,
    error: 'undefined',
};

function appReducer(state: IAppState = initialState, action: AppActionTypes) {
    switch (action.type) {
        case AppTypeKeys.ENDRE_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case AppTypeKeys.SETT_STEG:
            return {
                ...state,
                harForsoktNesteSteg: false,
                steg: action.steg,
            };
        case AppTypeKeys.SETT_HAR_FORSOKT_NESTE_STEG:
            return {
                ...state,
                harForsoktNesteSteg: action.harForsoktNesteSteg,
            };
        case AppTypeKeys.SETT_SPRAK:
            return {
                ...state,
                valgtSprak: action.valgtSprak,
            };
        case AppTypeKeys.VIS_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}

export { appReducer, IAppState };
