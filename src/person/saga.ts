import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { appEndreStatus } from '../app/actions';
import { AppStatus } from '../app/types';
import { personHentFeilet, personHentOk, PersonTypeKeys } from './actions';
import { fetchPerson } from './api';

function* fetchPersonSaga(): SagaIterator {
    try {
        const person = yield call(fetchPerson);
        yield put(personHentOk(person));
    } catch (err) {
        if (err.response.status === 403) {
            yield put(appEndreStatus(AppStatus.IKKE_TILGANG));
        } else {
            yield put(personHentFeilet());
        }
    }
}

function* personSaga(): SagaIterator {
    yield takeEvery(PersonTypeKeys.HENT, fetchPersonSaga);
}

export { fetchPersonSaga, personSaga };
