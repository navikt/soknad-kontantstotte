import { Action } from 'redux';
import { ISprak } from '../app/types';
import { ILand } from './types';

enum LandTypeKeys {
    HENT = 'LAND_HENT',
    HENT_OK = 'LAND_HENT_OK',
    HENT_FEILET = 'LAND_HENT_FEILET',
}

type LandActionTypes = ILandHent | ILandHentOK | ILandHentFeilet;

interface ILandHent extends Action {
    type: LandTypeKeys.HENT;
    valgtSprak: ISprak;
}

interface ILandHentOK extends Action {
    type: LandTypeKeys.HENT_OK;
    land: ILand;
}

interface ILandHentFeilet extends Action {
    type: LandTypeKeys.HENT_FEILET;
}

function landHent(valgtSprak: ISprak): ILandHent {
    return {
        type: LandTypeKeys.HENT,
        valgtSprak,
    };
}

function landHentOk(land: ILand): ILandHentOK {
    return {
        land,
        type: LandTypeKeys.HENT_OK,
    };
}

function landHentFeilet(): ILandHentFeilet {
    return {
        type: LandTypeKeys.HENT_FEILET,
    };
}

export { LandTypeKeys, LandActionTypes, landHent, landHentOk, landHentFeilet };
