import { AppActionTypes, AppTypeKeys } from './actions';
import { AppStatus } from './types';

interface IAppState {
    harForsoktNesteSteg: boolean;
    status: AppStatus;
    steg: number;
}

const initialState: IAppState = {
    harForsoktNesteSteg: false,
    status: AppStatus.KLAR,
    steg: 4,
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
        default:
            return state;
    }
}

export { appReducer, IAppState };
