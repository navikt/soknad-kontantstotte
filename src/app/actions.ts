import { Action } from 'redux';
import { AppStatus } from './types';

enum AppTypeKeys {
    ENDRE_STATUS = 'APP_ENDRE_STATUS',
    START_APP = 'APP_START_APP',
    HENT_PERSONINFO_OK = 'HENT_PERSONINFO_OK',
    HENT_PERSONINFO_IKKETILGANG = 'HENT_PERSONINFO_IKKETILGANG',
}

type AppActionTypes = IAppEndreStatus | IAppStart;

interface IAppEndreStatus extends Action {
    status: AppStatus;
    type: AppTypeKeys.ENDRE_STATUS;
}

interface IAppStart extends Action {
    type: AppTypeKeys.START_APP;
}

interface IHentPersonInfoOk extends Action {
    type: AppTypeKeys.HENT_PERSONINFO_OK;
}

interface IHentPersonInfoIkkeTilgang extends Action {
    type: AppTypeKeys.HENT_PERSONINFO_IKKETILGANG;
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

function hentPersonInfoOk(): IHentPersonInfoOk {
    return {
        type: AppTypeKeys.HENT_PERSONINFO_OK,
    };
}

function hentPersonInfoIkkeTilgang(): IHentPersonInfoIkkeTilgang {
    return {
        type: AppTypeKeys.HENT_PERSONINFO_IKKETILGANG,
    };
}

export {
    AppTypeKeys,
    AppActionTypes,
    appEndreStatus,
    appStart,
    hentPersonInfoOk,
    hentPersonInfoIkkeTilgang,
};
