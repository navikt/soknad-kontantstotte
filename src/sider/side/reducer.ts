import { SideNavigasjonActions, SideNavigasjonActionTypes } from './actions';
import { ISide, Sider } from './side';

export interface ISideState {
    readonly aktivSide: ISide;
    readonly viserStegindikator: boolean;
}

const initialState: ISideState = {
    aktivSide: Sider[0],
    viserStegindikator: false
};

function sideReducer(state: ISideState = initialState, action: SideNavigasjonActionTypes ): ISideState {
    switch (action.type) {
        case SideNavigasjonActions.HENT_AKTIV_SIDE:
            return {
                ...state
            };

        case SideNavigasjonActions.GA_TIL_SIDE:
            return {
                ...state,
                aktivSide: action.side
            };

        default:
            return state;
    }
}

export { sideReducer };
