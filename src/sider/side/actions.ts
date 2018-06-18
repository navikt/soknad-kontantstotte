import { Action } from 'redux';
import { ISide } from './side';

enum SideNavigasjonActions {
    HENT_AKTIV_SIDE = 'HENT_AKTIV_SIDE',
    GA_TIL_SIDE = 'GA_TIL_SIDE',
}

type SideNavigasjonActionTypes = IHentAktivSide | IGaTilSide;

interface IHentAktivSide extends Action {
    type: SideNavigasjonActions.HENT_AKTIV_SIDE;
}

interface IGaTilSide extends Action {
    side: ISide;
    type: SideNavigasjonActions.GA_TIL_SIDE;
}

function hentAktivSide() {
    return {
        type: SideNavigasjonActions.HENT_AKTIV_SIDE
    };
}

function gaTilSide(side: ISide) {
    return {
        side: side,
        type: SideNavigasjonActions.GA_TIL_SIDE
    };
}

export {
    SideNavigasjonActions,
    SideNavigasjonActionTypes,
    IHentAktivSide,
    IGaTilSide,
    hentAktivSide,
    gaTilSide,
};
