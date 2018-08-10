import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { personHentFeilet, personHentOk, PersonTypeKeys } from './actions';
import { fetchPerson } from './api';

function* fetchPersonSaga(): SagaIterator {
    try {
        const person = yield call(fetchPerson);
        yield put(personHentOk(person));
    } catch (err) {
        yield put(personHentFeilet());
    }
}

function* personSaga(): SagaIterator {
    yield takeEvery(PersonTypeKeys.HENT, fetchPersonSaga);
}

export { fetchPersonSaga, personSaga };
