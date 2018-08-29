import { AppActionTypes, AppTypeKeys } from './actions';
import { AppStatus } from './types';

interface IAppState {
    status: AppStatus;
    steg: number;
}

const initialState: IAppState = {
    status: AppStatus.KLAR,
    steg: 1,
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
                steg: action.steg,
            };
        default:
            return state;
    }
}

export { appReducer, IAppState };
