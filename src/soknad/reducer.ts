import { SoknadActionTypes, SoknadTypeKeys } from './actions';
import { BarnehageplassVerdier, ISoknadState, Svar, ValideringsStatus } from './types';

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
        barnIkkeHjemme: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        boddEllerJobbetINorgeSisteFemAar: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        borSammenMedBarnet: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        ikkeAvtaltDeltBosted: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        norskStatsborger: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        skalBoMedBarnetINorgeNesteTolvMaaneder: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
    },
    mineBarn: {
        fodselsdato: '',
        navn: '',
    },
};

function soknadReducer(state = initialState, action: SoknadActionTypes) {
    switch (action.type) {
        case SoknadTypeKeys.SETT_FELT:
            return {
                ...state,
                [action.stegnavn]: {
                    ...state[action.stegnavn],
                    [action.feltnavn]: action.felt,
                },
            };
        default:
            return state;
    }
}

export { soknadReducer };
