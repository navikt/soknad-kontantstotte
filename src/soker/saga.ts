import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { appEndreStatus } from '../app/actions';
import { AppStatus } from '../app/types';
import { sokerHentFeilet, sokerHentOk, SokerTypeKeys } from './actions';
import { fetchSoker } from './api';

function* fetchSokerSaga(): SagaIterator {
    try {
        const soker = yield call(fetchSoker);
        yield put(sokerHentOk(soker));
    } catch (err) {
        if (err.response.status === 403) {
            yield put(appEndreStatus(AppStatus.IKKE_TILGANG));
        } else {
            yield put(sokerHentFeilet());
        }
    }
}

function* sokerSaga(): SagaIterator {
    yield takeEvery(SokerTypeKeys.HENT, fetchSokerSaga);
}

export { fetchSokerSaga, sokerSaga };
