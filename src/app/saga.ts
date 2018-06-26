import { SagaIterator } from 'redux-saga';
import { all, call, cancel, fork, put, take } from 'redux-saga/effects';
import { barnHent, BarnTypeKeys } from '../barn/actions';
import { teksterHent, TeksterTypeKeys } from '../tekster/actions';
import { appEndreStatus, AppTypeKeys } from './actions';
import { pingBackend } from './api';
import { AppStatus } from './types';

function * startAppSaga(): SagaIterator {
    yield call( pingBackend );

    yield put(teksterHent());
    yield put(barnHent());

    yield all([
        take(TeksterTypeKeys.HENT_OK),
        take(BarnTypeKeys.HENT_OK),
    ]);

    yield put(appEndreStatus( AppStatus.KLAR));
}

function * appSaga(): SagaIterator {
    while ( yield take(AppTypeKeys.START_APP)) {
        yield put(appEndreStatus( AppStatus.STARTER ));
        const startSaga = yield fork(startAppSaga);
        yield take([
            TeksterTypeKeys.HENT_FEILET,
            BarnTypeKeys.HENT_FEILET
        ]);
        yield cancel(startSaga);
        yield put( appEndreStatus( AppStatus.FEILSITUASJON ) );
    }
}

export {
    appSaga
};
