import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { appNesteSteg, appSettHarForsoktNesteSteg } from '../app/actions';
import { selectAppSteg } from '../app/selectors';
import { ISteg, stegConfig } from '../stegConfig';
import {
    ISoknadValiderFelt,
    ISoknadValiderSteg,
    soknadSettFelt,
    SoknadTypeKeys,
    soknadValiderFelt,
    soknadValiderSteg,
} from './actions';
import { selectSoknad } from './selectors';
import {
    sjekkValideringForArbeidsforhold,
    sjekkValideringForBarnehageplass,
    sjekkValideringForFamilieforhold,
    sjekkValideringForSteg,
    sjekkValideringForUtenlandskeYtelser,
    sjekkValideringForUtenlandskKontantstotte,
} from './stegSagaValidators';
import {
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    Feltnavn,
    IFelt,
    ISoknadState,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    Stegnavn,
    utenlandskeYtelserFeltnavn,
    utenlandskKontantstotteFeltnavn,
    ValideringsStatus,
} from './types';
import valideringsConfig from './valideringsConfig';

function kjorValideringsFunksjoner(
    valideringsFunksjoner: Array<((felt: IFelt) => IFelt)>,
    felt: IFelt
): IFelt {
    const validertFelt: IFelt = valideringsFunksjoner.reduce(
        (acc: IFelt, valideringsFunksjon) => {
            const nyttValidertFelt = valideringsFunksjon(felt);
            return acc.valideringsStatus === ValideringsStatus.FEIL ? acc : nyttValidertFelt;
        },
        { verdi: '', valideringsStatus: ValideringsStatus.IKKE_VALIDERT, feilmeldingsNokkel: '' }
    );

    return validertFelt;
}

function* validerFeltSaga(action: ISoknadValiderFelt): SagaIterator {
    const soknadState = yield select(selectSoknad);
    const feltMedOppdatertVerdi = {
        ...soknadState[action.stegnavn][action.feltnavn],
        verdi: action.verdi,
    };

    let validertFelt: IFelt = {
        feilmeldingsNokkel: '',
        valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
        verdi: '',
    };
    switch (action.stegnavn) {
        case 'arbeidsforhold':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.arbeidsforhold[action.feltnavn as arbeidsforholdFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'barnehageplass':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.barnehageplass[action.feltnavn as barnehageplassFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'familieforhold':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.familieforhold[action.feltnavn as familieforholdFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'kravTilSoker':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.kravTilSoker[action.feltnavn as kravTilSokerFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'utenlandskKontantstotte':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.utenlandskKontantstotte[
                    action.feltnavn as utenlandskKontantstotteFeltnavn
                ],
                feltMedOppdatertVerdi
            );
            break;
        case 'mineBarn':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.mineBarn[action.feltnavn as minebarnFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'utenlandskeYtelser':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.utenlandskeYtelser[action.feltnavn as utenlandskeYtelserFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
    }

    yield put(soknadSettFelt(action.stegnavn, action.feltnavn, validertFelt));
}

function* validerSteg(action: ISoknadValiderSteg) {
    const stegnavn = action.stegnavn;
    const soknadState = yield select(selectSoknad);

    yield all(
        Object.keys(soknadState[stegnavn]).map((feltKey: string) => {
            return call(
                validerFeltSaga,
                soknadValiderFelt(
                    stegnavn,
                    feltKey as Feltnavn,
                    soknadState[stegnavn][feltKey].verdi
                )
            );
        })
    );
}

function* nullstillNesteStegSaga() {
    yield put(appSettHarForsoktNesteSteg(false));
}

function* nesteStegSaga() {
    const appSteg = yield select(selectAppSteg);
    const soknadState: ISoknadState = yield select(selectSoknad);

    const tilSide: ISteg = Object.values(stegConfig).find(
        (side: ISteg) => side.stegIndeks === appSteg
    );
    let harFeil: boolean = false;

    yield put(soknadValiderSteg(tilSide.key as Stegnavn));
    switch (tilSide.key as Stegnavn) {
        case 'arbeidsforhold':
            harFeil = yield call(sjekkValideringForArbeidsforhold, soknadState.arbeidsforhold);
            break;
        case 'barnehageplass':
            harFeil = yield call(sjekkValideringForBarnehageplass, soknadState.barnehageplass);
            break;
        case 'familieforhold':
            harFeil = yield call(sjekkValideringForFamilieforhold, soknadState.familieforhold);
            break;
        case 'utenlandskKontantstotte':
            harFeil = yield call(
                sjekkValideringForUtenlandskKontantstotte,
                soknadState.utenlandskKontantstotte
            );
            break;
        case 'utenlandskeYtelser':
            harFeil = yield call(
                sjekkValideringForUtenlandskeYtelser,
                soknadState.familieforhold,
                soknadState.utenlandskeYtelser
            );
            break;
        default:
            harFeil = yield call(sjekkValideringForSteg, tilSide.key as Stegnavn, soknadState);
    }

    yield put(appSettHarForsoktNesteSteg(true));
    if (!harFeil) {
        yield put(appNesteSteg());
    }
}

function* soknadSaga() {
    yield takeEvery(SoknadTypeKeys.NESTE_STEG, nesteStegSaga);
    yield takeEvery(SoknadTypeKeys.NULLSTILL_NESTE_STEG, nullstillNesteStegSaga);
    yield takeEvery(SoknadTypeKeys.VALIDER_STEG, validerSteg);
    yield takeEvery(SoknadTypeKeys.VALIDER_FELT, validerFeltSaga);
}

export { soknadSaga };
