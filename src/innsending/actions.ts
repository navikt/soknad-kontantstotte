import { Action } from 'redux';

enum InnsendingTypeKeys {
    SENDINN = 'SENDINN',
    SENDINN_OK = 'SENDINN_OK',
    SENDINN_FEILET = 'SENDINN_FEILET',
}

type InnsendingActionTypes = ISendInn | ISendInnOk | ISendInnFeilet;

interface ISendInn extends Action {
    type: InnsendingTypeKeys.SENDINN;
}

interface ISendInnOk extends Action {
    innsendtDato: string;
    type: InnsendingTypeKeys.SENDINN_OK;
}

interface ISendInnFeilet extends Action {
    type: InnsendingTypeKeys.SENDINN_FEILET;
}

function sendInn(): ISendInn {
    return {
        type: InnsendingTypeKeys.SENDINN,
    };
}

function sendInnOk(dato: string): ISendInnOk {
    return {
        innsendtDato: dato,
        type: InnsendingTypeKeys.SENDINN_OK,
    };
}

function sendInnFeilet(): ISendInnFeilet {
    return {
        type: InnsendingTypeKeys.SENDINN_FEILET,
    };
}

export { InnsendingTypeKeys, InnsendingActionTypes, ISendInn, sendInn, sendInnOk, sendInnFeilet };
