import { SoknadActionTypes, SoknadTypeKeys } from './actions';
import { BarnehageplassVerdier, ISoknadState, Svar, ValideringsStatus } from './types';

const initialState: ISoknadState = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
        mottarKontantstotteFraAnnetEOS: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        mottarKontantstotteFraAnnetEOSForklaring: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
        mottarYtelserFraUtlandet: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        mottarYtelserFraUtlandetForklaring: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
    },
    barnehageplass: {
        antallTimer: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
        dato: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
        harBarnehageplass: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: BarnehageplassVerdier.Ubesvart,
        },
        kommune: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
    },
    familieforhold: {
        annenForelderFodselsnummer: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
        annenForelderNavn: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
        annenForelderYrkesaktivINorgeEOSIMinstFemAar: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        borForeldreneSammenMedBarnet: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
        erAvklartDeltBosted: {
            feilmeldingsNokkel: 'svar.feilmeldingCheckbox',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: Svar.UBESVART,
        },
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
        fodselsdato: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
        navn: {
            feilmeldingsNokkel: 'svar.feilmelding',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: '',
        },
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
