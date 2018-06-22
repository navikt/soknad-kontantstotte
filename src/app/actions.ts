import { Action } from 'redux';
import { AppStatus } from './types';

enum AppTypeKeys {
    ENDRE_STATUS = 'APP_ENDRE_STATUS',
    START_APP = 'APP_START_APP',
}

type AppActionTypes =
    | IAppEndreStatus
    | IAppStart
    ;

interface IAppEndreStatus extends Action {
    status: AppStatus;
    type: AppTypeKeys.ENDRE_STATUS;
}

interface IAppStart extends Action {
    type: AppTypeKeys.START_APP;
}

function appEndreStatus(status: AppStatus): IAppEndreStatus {
    return {
        status,
        type: AppTypeKeys.ENDRE_STATUS
    };
}

function appStart(): IAppStart {
    return {
        type: AppTypeKeys.START_APP
    };
}

export {
    AppTypeKeys,
    AppActionTypes,
    appEndreStatus,
    appStart
};
