import { Action } from 'redux';
import { Feltnavn, IFelt, Stegnavn } from './types';

enum SoknadTypeKeys {
    NESTE_STEG = 'SOKNAD_NESTE_STEG',
    NULLSTILL_NESTE_STEG = 'SOKNAD_NULLSTILL_NESTE_STEG',
    SETT_FELT = 'SOKNAD_SETT_FELT',
    VALIDER_STEG = 'SOKNAD_VALIDER_STEG',
    VALIDER_FELT = 'SOKNAD_VALIDER_FELT',
}

type SoknadActionTypes = ISoknadValiderFelt &
    ISoknadValiderSteg &
    ISoknadNesteSteg &
    ISoknadNullstillNesteSteg &
    ISoknadSettFelt;

interface ISoknadValiderFelt extends Action {
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.VALIDER_FELT;
    verdi: any;
}

interface ISoknadValiderSteg extends Action {
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.VALIDER_STEG;
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

interface ISoknadNullstillNesteSteg extends Action {
    type: SoknadTypeKeys.NULLSTILL_NESTE_STEG;
}

function soknadValiderFelt(stegnavn: Stegnavn, feltnavn: Feltnavn, verdi: any): ISoknadValiderFelt {
    return {
        feltnavn,
        stegnavn,
        type: SoknadTypeKeys.VALIDER_FELT,
        verdi,
    };
}

function soknadValiderSteg(stegnavn: Stegnavn): ISoknadValiderSteg {
    return {
        stegnavn,
        type: SoknadTypeKeys.VALIDER_STEG,
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

function soknadNullstillNesteSteg(): ISoknadNullstillNesteSteg {
    return {
        type: SoknadTypeKeys.NULLSTILL_NESTE_STEG,
    };
}

export {
    SoknadActionTypes,
    soknadValiderFelt,
    soknadValiderSteg,
    SoknadTypeKeys,
    soknadNesteSteg,
    soknadNullstillNesteSteg,
    ISoknadValiderFelt,
    ISoknadValiderSteg,
    soknadSettFelt,
};
