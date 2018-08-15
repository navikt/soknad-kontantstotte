import { Action } from 'redux';
import { AppStatus } from './types';

enum AppTypeKeys {
    ENDRE_STATUS = 'APP_ENDRE_STATUS',
    START_APP = 'APP_START_APP',
    NESTE_STEG = 'APP_NESTE_STEG',
    FORRIGE_STEG = 'APP_FORRIGE_STEG',
    SETT_STEG = 'APP_SETT_STEG',
}

type AppActionTypes = IAppEndreStatus | IAppStart | IAppNesteSteg | IAppForrigeSteg | IAppSettSteg;

interface IAppEndreStatus extends Action {
    status: AppStatus;
    type: AppTypeKeys.ENDRE_STATUS;
}

interface IAppStart extends Action {
    type: AppTypeKeys.START_APP;
}

interface IAppNesteSteg extends Action {
    type: AppTypeKeys.NESTE_STEG;
}

interface IAppForrigeSteg extends Action {
    type: AppTypeKeys.FORRIGE_STEG;
}

interface IAppSettSteg extends Action {
    type: AppTypeKeys.SETT_STEG;
    steg: number;
}

function appEndreStatus(status: AppStatus): IAppEndreStatus {
    return {
        status,
        type: AppTypeKeys.ENDRE_STATUS,
    };
}

function appStart(): IAppStart {
    return {
        type: AppTypeKeys.START_APP,
    };
}

function appNesteSteg(): IAppNesteSteg {
    return {
        type: AppTypeKeys.NESTE_STEG,
    };
}

function appForrigeSteg(): IAppForrigeSteg {
    return {
        type: AppTypeKeys.FORRIGE_STEG,
    };
}

function appSettSteg(steg: number): IAppSettSteg {
    return {
        steg,
        type: AppTypeKeys.SETT_STEG,
    };
}

export {
    AppTypeKeys,
    AppActionTypes,
    appForrigeSteg,
    appNesteSteg,
    appEndreStatus,
    appStart,
    appSettSteg,
};
