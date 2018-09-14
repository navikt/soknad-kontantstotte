import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { teksterHentFeilet, teksterHentOk, TeksterTypeKeys } from './actions';
import { fetchTekster } from './api';
import { selectValgtSprak } from './selectors';

function* fetchTeksterSaga(): SagaIterator {
    try {
        const valgtSprak = yield select(selectValgtSprak);
        const tekster = yield call(fetchTekster, valgtSprak);
        yield put(teksterHentOk(tekster));
    } catch (err) {
        yield put(teksterHentFeilet());
    }
}

function* teksterSaga(): SagaIterator {
    yield takeEvery(TeksterTypeKeys.HENT, fetchTeksterSaga);
}

export { fetchTeksterSaga, teksterSaga };
