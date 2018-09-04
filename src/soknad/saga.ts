import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { appNesteSteg, appSettHarForsoktNesteSteg } from '../app/actions';
import { selectAppSteg } from '../app/selectors';
import { ISoknadValiderFelt, soknadSettFelt, SoknadTypeKeys } from './actions';
import { selectSoknad } from './selectors';
import { IFelt, Stegnavn, ValideringsStatus } from './types';
import valideringsConfig from './valideringsConfig';

function* validerFeltSaga(action: ISoknadValiderFelt): SagaIterator {
    const soknadState = yield select(selectSoknad);
    const feltMedOppdatertVerdi = {
        ...soknadState[action.stegnavn][action.feltnavn],
        verdi: action.verdi,
    };

    const validertFelt = valideringsConfig[action.stegnavn][action.feltnavn](feltMedOppdatertVerdi);

    yield put(soknadSettFelt(action.stegnavn, action.feltnavn, validertFelt));
}

function* validerSteg(stegnavn: Stegnavn) {
    const soknadState = yield select(selectSoknad);
    const harFeil = Object.values(soknadState[stegnavn]).reduce((acc: boolean, felt: IFelt) => {
        return acc || felt.valideringsStatus !== ValideringsStatus.OK;
    }, false);
    return harFeil;
}

function* nesteStegSaga() {
    yield put(appSettHarForsoktNesteSteg(true));
    const appSteg = yield select(selectAppSteg);
    let harFeil: boolean = false;
    switch (appSteg) {
        case 1: {
            harFeil = yield call(validerSteg, 'kravTilSoker');
        }
        case 2: {
            harFeil = yield call(validerSteg, 'mineBarn');
        }
    }
    if (!harFeil) {
        yield put(appNesteSteg());
    }
}

function* soknadSaga() {
    yield takeEvery(SoknadTypeKeys.NESTE_STEG, nesteStegSaga);
    yield takeEvery(SoknadTypeKeys.VALIDER_FELT, validerFeltSaga);
}

export { soknadSaga };
