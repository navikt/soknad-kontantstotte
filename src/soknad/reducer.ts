import { IBarn } from '../barn/types';
import { BarnehageplassVerdier } from '../sider/barnehageplass/BarnehageplassSide';
import { SoknadActionTypes, SoknadTypeKeys } from './actions';

interface ISoknadState {
    barn: IBarn;
    boddINorgeSisteFemAar: boolean;
    borSammenMedBarnet: boolean;
    skalBoMedBarnetINorgeNesteTolvMaaneder: boolean;
    mottarYtelserFraUtlandet: boolean;
    mottarYtelserFraUtlandetForklaring?: string;
    arbeiderIUtlandetEllerKontinentalsokkel: boolean;
    arbeiderIUtlandetEllerKontinentalsokkelForklaring?: string;
    mottarKontantstotteFraAnnetEOS: boolean;
    mottarKontantstotteFraAnnetEOSForklaring?: string;
    borForeldreneSammenMedBarnet: boolean;
    erAvklartDeltBosted?: boolean;
    annenForelderNavn?: string;
    annenForelderPersonnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar?: boolean;
    harBarnehageplass: BarnehageplassVerdier;
    neiHarFaattPlassFraDato?: string;
    neiHarFaattPlassKommune?: string;
    jaFraDato?: string;
    jaKommune?: string;
    jaAntallTimer?: string;
    jaSkalSlutteDato?: string;
    jaSkalSlutteKommune?: string;
    jaSkalSlutteAntallTimer?: string;

}

const initialState = {
    barn: {},
    boddINorgeSisteFemAar: false,
    borSammenMedBarnet: false,
    harBarnehageplass: BarnehageplassVerdier.Ubesvart,
    skalBoMedBarnetINorgeNesteTolvMaaneder: false
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
    ISoknadState,
    soknadReducer,
};
