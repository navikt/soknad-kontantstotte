import { Action } from 'redux';
import { IBarn } from "./types";

enum BarnTypeKeys {
    HENT = 'BARN_HENT',
    HENT_OK = 'BARN_HENT_OK',
    HENT_FEILET = 'BARN_HENT_FEILET'
}

type BarnActionTypes =
    | IBarnHent
    | IBarnHentOK
    | IBarnHentFeilet
    ;

interface IBarnHent extends Action {
    type: BarnTypeKeys.HENT;
}

interface IBarnHentOK extends Action  {
    type: BarnTypeKeys.HENT_OK;
    barn: IBarn[];
}

interface IBarnHentFeilet extends Action  {
    type: BarnTypeKeys.HENT_FEILET;
}

function barnHent(): IBarnHent {
    return {
        type: BarnTypeKeys.HENT
    };
}

function barnHentOk(barn: IBarn[]): IBarnHentOK {
    return {
        barn,
        type: BarnTypeKeys.HENT_OK,
    };
}

function barnHentFeilet(): IBarnHentFeilet {
    return {
        type: BarnTypeKeys.HENT_FEILET
    };
}

export {
    BarnTypeKeys,
    BarnActionTypes,
    IBarnHent,
    IBarnHentOK,
    IBarnHentFeilet,
    barnHent,
    barnHentOk,
    barnHentFeilet
};
