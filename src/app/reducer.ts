import { AppActionTypes, AppTypeKeys } from './actions';
import { AppStatus } from './types';

interface IAppState {
    status: AppStatus;
}

const initialState: IAppState = {
    status: AppStatus.IKKE_STARTET,
};

function appReducer(state: IAppState = initialState, action: AppActionTypes) {
    switch (action.type) {
        case AppTypeKeys.ENDRE_STATUS:
            return {
                status: action.status,
            };
        default:
            return state;
    }
}

export { appReducer, IAppState };
