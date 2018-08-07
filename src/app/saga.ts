import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { all, call, cancel, fork, put, take } from 'redux-saga/effects';
import { barnHent, BarnTypeKeys } from '../barn/actions';
import { teksterHent, TeksterTypeKeys } from '../tekster/actions';
import {
    appEndreStatus,
    AppTypeKeys,
    hentPersonInfoIkkeTilgang,
    hentPersonInfoOk,
} from './actions';
import { fetchPersonInfo, pingBackend } from './api';
import { AppStatus } from './types';

function* startAppSaga(): SagaIterator {
    yield call(pingBackend);

    try {
        const res = yield call(fetchPersonInfo);
        yield put(hentPersonInfoOk());
    } catch (error) {
        if (error.response.status === 403) {
            yield put(hentPersonInfoIkkeTilgang());
            yield put(push('/ikke-tilgang'));
        }
    }

    yield put(teksterHent());
    yield put(barnHent());

    yield all([take(TeksterTypeKeys.HENT_OK), take(BarnTypeKeys.HENT_OK)]);

    yield put(appEndreStatus(AppStatus.KLAR));
}

function* appSaga(): SagaIterator {
    while (yield take(AppTypeKeys.START_APP)) {
        yield put(appEndreStatus(AppStatus.STARTER));
        const startSaga = yield fork(startAppSaga);
        yield take([TeksterTypeKeys.HENT_FEILET, BarnTypeKeys.HENT_FEILET]);
        yield cancel(startSaga);
        yield put(appEndreStatus(AppStatus.FEILSITUASJON));
    }
}

export { appSaga };
