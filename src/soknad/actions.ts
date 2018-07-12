import { Bolk, Felt } from './types';

enum SoknadTypeKeys {
    SETT_VERDI = 'SOKNAD_SETT_VERDI'
}

function soknadSettVerdi(bolk: Bolk, felt: Felt, verdi: any) {
    return {
        bolk,
        felt,
        type: SoknadTypeKeys.SETT_VERDI,
        verdi
    };
}

type SoknadActionTypes =
    | ReturnType<typeof soknadSettVerdi>;

export {
    SoknadActionTypes,
    soknadSettVerdi,
    SoknadTypeKeys,
};
