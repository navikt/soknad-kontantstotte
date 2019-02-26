import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { landHentFeilet, landHentOk, LandTypeKeys } from './actions';
import { fetchLand } from './api';
import { selectValgtSprak } from './selectors';

function* fetchLandSaga(): SagaIterator {
    try {
        const valgtSprak = yield select(selectValgtSprak);
        const land = yield call(fetchLand, valgtSprak);
        yield put(landHentOk(land));
    } catch (err) {
        yield put(landHentFeilet());
    }
}

function* landSaga(): SagaIterator {
    yield takeEvery(LandTypeKeys.HENT, fetchLandSaga);
}

export { fetchLandSaga, landSaga };
