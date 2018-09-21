import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { sokerHentFeilet, sokerHentOk, SokerTypeKeys } from './actions';
import { fetchSoker } from './api';

function* fetchSokerSaga(): SagaIterator {
    try {
        const soker = yield call(fetchSoker);
        yield put(sokerHentOk(soker));
    } catch (err) {
        yield put(sokerHentFeilet());
    }
}

function* sokerSaga(): SagaIterator {
    yield takeEvery(SokerTypeKeys.HENT, fetchSokerSaga);
}

export { fetchSokerSaga, sokerSaga };
