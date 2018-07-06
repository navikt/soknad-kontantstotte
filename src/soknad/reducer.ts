import { SoknadActionTypes, SoknadTypeKeys } from './actions';
import { BarnehageplassVerdier, ISoknadState, Svar } from './types';

const initialState: ISoknadState = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: Svar.UBESVART,
        mottarKontantstotteFraAnnetEOS: Svar.UBESVART,
        mottarYtelserFraUtlandet: Svar.UBESVART,
    },
    barn: {
        fodselsdato: '',
        navn: '',
    },
    barnehageplass: {
        harBarnehageplass: BarnehageplassVerdier.Ubesvart,
    },
    familieforhold: {
        annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar.UBESVART,
        borForeldreneSammenMedBarnet: Svar.UBESVART,
        erAvklartDeltBosted: Svar.UBESVART,
    },
    kravTilSoker: {
        boddINorgeSisteFemAar: Svar.UBESVART,
        borSammenMedBarnet: Svar.UBESVART,
        skalBoMedBarnetINorgeNesteTolvMaaneder: Svar.UBESVART,
    },
};

function soknadReducer(state = initialState, action: SoknadActionTypes) {
    switch (action.type) {
        case SoknadTypeKeys.SETT_VERDI:
            return {
                ...state,
                [action.felt]: action.verdi
            };
        default:
            return state;
    }
}

export {
    soknadReducer,
};
