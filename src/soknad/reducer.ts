import { SoknadActionTypes, SoknadTypeKeys } from './actions';
import { BarnehageplassVerdier, ISoknadState, Svar } from './types';

const initialState: ISoknadState = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: Svar.UBESVART,
        mottarKontantstotteFraAnnetEOS: Svar.UBESVART,
        mottarYtelserFraUtlandet: Svar.UBESVART,
    },
    barnehageplass: {
        antallTimer: '',
        dato: '',
        harBarnehageplass: BarnehageplassVerdier.Ubesvart,
        kommune: '',
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
    mineBarn: {
        valgtBarn: {
            fodselsdato: '',
            navn: '',
        }
    },
};

function soknadReducer(state = initialState, action: SoknadActionTypes) {
    switch (action.type) {
        case SoknadTypeKeys.SETT_VERDI:
            return {
                ...state,
                [action.bolk]: {
                    ...state[action.bolk],
                    [action.felt]: action.verdi
                }
            };
        default:
            return state;
    }
}

export {
    soknadReducer,
};
