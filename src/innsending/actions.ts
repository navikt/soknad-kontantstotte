import { Action } from 'redux';
import { ISoknad } from './soknad';

enum InnsendingTypeKeys {
    SENDINN = "SENDINN",
    SENDINN_OK = "SENDINN_OK",
    SENDINN_FEILET = "SENDINN_FEILET"
}

type InnsendingActionTypes = ISendInn | ISendInnOk | ISendInnFeilet;

interface ISendInn extends Action {
    type: InnsendingTypeKeys.SENDINN;
    soknad: ISoknad;
}

interface ISendInnOk extends Action {
    type: InnsendingTypeKeys.SENDINN_OK;
}

interface ISendInnFeilet extends Action {
    type: InnsendingTypeKeys.SENDINN_FEILET;
}

function sendInn(soknad: ISoknad): ISendInn {
    return {
        soknad,
        type: InnsendingTypeKeys.SENDINN,
    };
}

function sendInnOk(): ISendInnOk {
    return {
        type: InnsendingTypeKeys.SENDINN_OK
    };
}

function sendInnFeilet(): ISendInnFeilet {
    return {
        type: InnsendingTypeKeys.SENDINN_FEILET
    };
}

export {
    InnsendingTypeKeys,
    InnsendingActionTypes,
    ISendInn,
    sendInn,
    sendInnOk,
    sendInnFeilet,
};
