import { SoknadActionTypes, SoknadTypeKeys } from './actions';
import { BarnehageplassVerdier, ISoknadState, Svar } from './types';

const initialState: ISoknadState = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: Svar.UBESVART,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: '',
        mottarKontantstotteFraAnnetEOS: Svar.UBESVART,
        mottarKontantstotteFraAnnetEOSForklaring: '',
        mottarYtelserFraUtlandet: Svar.UBESVART,
        mottarYtelserFraUtlandetForklaring: '',
    },
    barnehageplass: {
        antallTimer: '',
        dato: '',
        harBarnehageplass: BarnehageplassVerdier.Ubesvart,
        kommune: '',
    },
    familieforhold: {
        annenForelderFodselsnummer: '',
        annenForelderNavn: '',
        annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar.UBESVART,
        borForeldreneSammenMedBarnet: Svar.UBESVART,
        erAvklartDeltBosted: Svar.UBESVART,
    },
    kravTilSoker: {
        barnIkkeHjemme: Svar.UBESVART,
        boddEllerJobbetINorgeSisteFemAar: Svar.UBESVART,
        borSammenMedBarnet: Svar.UBESVART,
        ikkeAvtaltDeltBosted: Svar.UBESVART,
        norskStatsborger: Svar.UBESVART,
        skalBoMedBarnetINorgeNesteTolvMaaneder: Svar.UBESVART,
    },
    mineBarn: {
        fodselsdato: '',
        navn: '',
    },
};

function soknadReducer(state = initialState, action: SoknadActionTypes) {
    switch (action.type) {
        case SoknadTypeKeys.SETT_VERDI:
            return {
                ...state,
                [action.bolk]: {
                    ...state[action.bolk],
                    [action.felt]: action.verdi,
                },
            };
        default:
            return state;
    }
}

export { soknadReducer };
