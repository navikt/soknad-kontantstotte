import { Action } from 'redux';
import { ISoker } from './types';

enum SokerTypeKeys {
    HENT = 'SOKER_HENT',
    HENT_OK = 'SOKER_HENT_OK',
    HENT_FEILET = 'SOKER_HENT_FEILET',
}

type SokerActionTypes = ISokerHent | ISokerHentOk | ISokerHentFeilet;

interface ISokerHent extends Action {
    type: SokerTypeKeys.HENT;
}

interface ISokerHentOk extends Action {
    type: SokerTypeKeys.HENT_OK;
    soker: ISoker;
}

interface ISokerHentFeilet extends Action {
    type: SokerTypeKeys.HENT_FEILET;
}

function sokerHent(): ISokerHent {
    return {
        type: SokerTypeKeys.HENT,
    };
}

function sokerHentOk(soker: ISoker): ISokerHentOk {
    return {
        soker,
        type: SokerTypeKeys.HENT_OK,
    };
}

function sokerHentFeilet(): ISokerHentFeilet {
    return {
        type: SokerTypeKeys.HENT_FEILET,
    };
}

export { SokerActionTypes, sokerHent, sokerHentFeilet, sokerHentOk, SokerTypeKeys };
