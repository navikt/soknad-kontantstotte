import { SoknadActionTypes, SoknadTypeKeys } from './actions';
import {
    BarnehageplassVerdier,
    ISoknadState,
    Svar,
    TilknytningTilUtlandVerdier,
    ValideringsStatus,
} from './types';

const standardSvarInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: Svar.UBESVART,
};

const standardStringInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: '',
};

const standardBarnehageplassVerdiInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: BarnehageplassVerdier.Ubesvart,
};

const standardTilknytningTilUtlandVerdiInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: TilknytningTilUtlandVerdier.Ubesvart,
};

const initialState: ISoknadState = {
    arbeidsforhold: {
        arbeiderIUtlandetEllerKontinentalsokkel: standardSvarInitialFelt,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: standardStringInitialFelt,
        mottarYtelserFraUtlandet: standardSvarInitialFelt,
        mottarYtelserFraUtlandetForklaring: standardStringInitialFelt,
    },
    barnehageplass: {
        barnBarnehageplassStatus: standardBarnehageplassVerdiInitialFelt,
        harBarnehageplass: standardSvarInitialFelt,
        harBarnehageplassAntallTimer: standardStringInitialFelt,
        harBarnehageplassDato: standardStringInitialFelt,
        harBarnehageplassKommune: standardStringInitialFelt,
        harSluttetIBarnehageAntallTimer: standardStringInitialFelt,
        harSluttetIBarnehageDato: standardStringInitialFelt,
        harSluttetIBarnehageKommune: standardStringInitialFelt,
        skalBegynneIBarnehageAntallTimer: standardStringInitialFelt,
        skalBegynneIBarnehageDato: standardStringInitialFelt,
        skalBegynneIBarnehageKommune: standardStringInitialFelt,
        skalSlutteIBarnehageAntallTimer: standardStringInitialFelt,
        skalSlutteIBarnehageDato: standardStringInitialFelt,
        skalSlutteIBarnehageKommune: standardStringInitialFelt,
    },
    familieforhold: {
        annenForelderFodselsnummer: standardStringInitialFelt,
        annenForelderNavn: standardStringInitialFelt,
        borForeldreneSammenMedBarnet: standardSvarInitialFelt,
    },
    kravTilSoker: {
        barnIkkeHjemme: standardSvarInitialFelt,
        boddEllerJobbetINorgeSisteFemAar: standardSvarInitialFelt,
        borSammenMedBarnet: standardSvarInitialFelt,
        ikkeAvtaltDeltBosted: standardSvarInitialFelt,
        norskStatsborger: standardSvarInitialFelt,
        skalBoMedBarnetINorgeNesteTolvMaaneder: standardSvarInitialFelt,
    },
    mineBarn: {
        fodselsdato: standardStringInitialFelt,
        navn: standardStringInitialFelt,
    },
    oppsummering: {
        bekreftelse: standardSvarInitialFelt,
    },
    tilknytningTilUtland: {
        annenForelderBoddEllerJobbetINorgeMinstFemAar: standardTilknytningTilUtlandVerdiInitialFelt,
        annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: standardStringInitialFelt,
        boddEllerJobbetINorgeMinstFemAar: standardTilknytningTilUtlandVerdiInitialFelt,
        boddEllerJobbetINorgeMinstFemAarForklaring: standardStringInitialFelt,
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: standardSvarInitialFelt,
        mottarKontantstotteFraUtlandetTilleggsinfo: standardStringInitialFelt,
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: standardSvarInitialFelt,
        mottarAnnenForelderYtelserFraUtlandForklaring: standardStringInitialFelt,
        mottarYtelserFraUtland: standardSvarInitialFelt,
        mottarYtelserFraUtlandForklaring: standardStringInitialFelt,
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
