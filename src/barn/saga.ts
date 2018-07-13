import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { barnHentFeilet, barnHentOk, BarnTypeKeys } from './actions';
import { fetchBarn } from './api';

function* fetchBarnSaga(): SagaIterator {
    try {
        const barn = yield call(fetchBarn);
        yield put(barnHentOk(barn));
    } catch (err) {
        yield put(barnHentFeilet());
    }
}

function* barnSaga(): SagaIterator {
    yield takeEvery(BarnTypeKeys.HENT, fetchBarnSaga);
}

export { fetchBarnSaga, barnSaga };
