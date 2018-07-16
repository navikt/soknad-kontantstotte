import { Action } from 'redux';
import { Bolk, Felt } from './types';

enum SoknadTypeKeys {
    SETT_VERDI = 'SOKNAD_SETT_VERDI'
}

type SoknadActionTypes =
    | ISoknadSettVerdi
    ;

interface ISoknadSettVerdi extends Action {
    bolk: Bolk;
    felt: Felt;
    type: SoknadTypeKeys.SETT_VERDI;
    verdi: any;
}

function soknadSettVerdi(bolk: Bolk, felt: Felt, verdi: any) {
    return {
        bolk,
        felt,
        type: SoknadTypeKeys.SETT_VERDI,
        verdi
    };
}

export {
    SoknadActionTypes,
    soknadSettVerdi,
    SoknadTypeKeys,
};
