import { Action } from 'redux';
import { Feltnavn, IFelt, Stegnavn } from './types';

enum SoknadTypeKeys {
    NESTE_STEG = 'SOKNAD_NESTE_STEG',
    SETT_FELT = 'SOKNAD_SETT_FELT',
    VALIDER_FELT = 'SOKNAD_VALIDER_FELT',
}

type SoknadActionTypes = ISoknadValiderFelt & ISoknadNesteSteg & ISoknadSettFelt;

interface ISoknadValiderFelt extends Action {
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.VALIDER_FELT;
    verdi: any;
}

interface ISoknadSettFelt extends Action {
    felt: IFelt;
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.SETT_FELT;
}

interface ISoknadNesteSteg extends Action {
    type: SoknadTypeKeys.NESTE_STEG;
}

function soknadValidertFelt(
    stegnavn: Stegnavn,
    feltnavn: Feltnavn,
    verdi: any
): ISoknadValiderFelt {
    return {
        feltnavn,
        stegnavn,
        type: SoknadTypeKeys.VALIDER_FELT,
        verdi,
    };
}

function soknadSettFelt(stegnavn: Stegnavn, feltnavn: Feltnavn, felt: IFelt): ISoknadSettFelt {
    return {
        felt,
        feltnavn,
        stegnavn,
        type: SoknadTypeKeys.SETT_FELT,
    };
}

function soknadNesteSteg(): ISoknadNesteSteg {
    return {
        type: SoknadTypeKeys.NESTE_STEG,
    };
}

export {
    SoknadActionTypes,
    soknadValidertFelt,
    SoknadTypeKeys,
    soknadNesteSteg,
    ISoknadValiderFelt,
    soknadSettFelt,
};
