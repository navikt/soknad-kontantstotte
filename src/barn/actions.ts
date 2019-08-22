import { Action } from 'redux';
import { IBarn } from './types';

enum BarnTypeKeys {
    HENT = 'BARN_HENT',
    HENT_OK = 'BARN_HENT_OK',
    HENT_FEILET = 'BARN_HENT_FEILET',
    SETT_INDEKS_FOR_VALGT_BARN = 'SETT_INDEKS_FOR_VALGT_BARN',
}

type BarnActionTypes = IBarnHent | IBarnHentOk | IBarnHentFeilet | IBarnSettIndeksForValgtBarn;

interface IBarnHent extends Action {
    type: BarnTypeKeys.HENT;
}

interface IBarnHentOk extends Action {
    type: BarnTypeKeys.HENT_OK;
    barn: IBarn[];
}

interface IBarnHentFeilet extends Action {
    type: BarnTypeKeys.HENT_FEILET;
}

interface IBarnSettIndeksForValgtBarn extends Action {
    indeks: string;
    type: BarnTypeKeys.SETT_INDEKS_FOR_VALGT_BARN;
}

function barnHent(): IBarnHent {
    return {
        type: BarnTypeKeys.HENT,
    };
}

function barnHentOk(barn: IBarn[]): IBarnHentOk {
    return {
        barn,
        type: BarnTypeKeys.HENT_OK,
    };
}

function barnHentFeilet(): IBarnHentFeilet {
    return {
        type: BarnTypeKeys.HENT_FEILET,
    };
}

function barnSettIndeksForValgtBarn(indeks: string): IBarnSettIndeksForValgtBarn {
    return {
        type: BarnTypeKeys.SETT_INDEKS_FOR_VALGT_BARN,
        indeks,
    };
}

export {
    BarnActionTypes,
    barnHent,
    barnHentFeilet,
    barnHentOk,
    barnSettIndeksForValgtBarn,
    BarnTypeKeys,
};
