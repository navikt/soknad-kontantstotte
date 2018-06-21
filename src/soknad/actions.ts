import { Action } from 'redux';

enum SoknadTypeKeys {
    SETT_VERDI = 'SOKNAD_SETT_VERDI'
}

type SoknadActionTypes =
    | ISoknadSettVerdi
    ;

interface ISoknadSettVerdi extends Action {
    felt: string;
    type: SoknadTypeKeys.SETT_VERDI;
    verdi: any;
}

function soknadSettVerdi(felt: string, verdi: any): ISoknadSettVerdi {
    return {
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
