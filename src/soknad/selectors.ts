import { IRootState } from '../rootReducer';
import {
    IArbeidIUtlandet,
    IBarnehageplass,
    IFamilieforhold,
    IKravTilSoker,
    ISoknadState,
    IUtenlandskKontantstotte,
} from './types';

function selectFamilieforhold(state: IRootState): IFamilieforhold {
    return state.soknad.familieforhold;
}

function selectBarnehageplass(state: IRootState): IBarnehageplass {
    return state.soknad.barnehageplass;
}

function selectUtenlandskKontantstotte(state: IRootState): IUtenlandskKontantstotte {
    return state.soknad.utenlandskKontantstotte;
}

function selectKravTilSoker(state: IRootState): IKravTilSoker {
    return state.soknad.kravTilSoker;
}

function selectMineBarn(state: IRootState) {
    return state.soknad.mineBarn;
}

function selectArbeidIUtlandet(state: IRootState): IArbeidIUtlandet {
    return state.soknad.arbeidIUtlandet;
}

function selectYtelserFraUtland(state: IRootState) {
    return state.soknad.utenlandskeYtelser;
}

function selectSoknad(state: IRootState): ISoknadState {
    return state.soknad;
}

export {
    selectArbeidIUtlandet,
    selectBarnehageplass,
    selectFamilieforhold,
    selectUtenlandskKontantstotte,
    selectKravTilSoker,
    selectYtelserFraUtland,
    selectSoknad,
    selectMineBarn,
};
