import Environment from '../Environment';

import { LOCATION_CHANGE, push, replace } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import {
    all,
    call,
    cancel,
    fork,
    put,
    select,
    take,
    takeEvery,
    takeLatest,
} from 'redux-saga/effects';
import { ISteg, stegConfig } from '../stegConfig';
import { teksterHent, TeksterTypeKeys } from '../tekster/actions';
import { appEndreStatus, appSettSteg, AppTypeKeys } from './actions';
import { pingBackend } from './api';
import { selectAppSteg } from './selectors';
import { AppStatus, ILocationChangeAction } from './types';

const redirectTilLogin = () => {
    window.location.href = Environment().loginUrl + '?redirect=' + window.location.href;
};

function* autentiserBruker(): SagaIterator {
    try {
        yield call(pingBackend);
    } catch (error) {
        if (error.response.status === 401) {
            redirectTilLogin();
            return;
        }
    }
}

function* forsteSidelastSaga(): SagaIterator {
    yield call(autentiserBruker);

    yield put(teksterHent('nb'));

    yield all([take(TeksterTypeKeys.HENT_OK)]);

    yield put(appEndreStatus(AppStatus.KLAR));
}

function* startAppSaga(): SagaIterator {
    yield put(appEndreStatus(AppStatus.STARTER));
    const startSaga = yield fork(forsteSidelastSaga);
    yield take([TeksterTypeKeys.HENT_FEILET]);
    yield cancel(startSaga);
    yield put(appEndreStatus(AppStatus.FEILSITUASJON));
}

function* urlEndretSaga(action: ILocationChangeAction): SagaIterator {
    const appSteg = yield select(selectAppSteg);
    const naavaerendeSide = stegConfig.find(
        (side: ISteg) => side.path === action.payload.location.pathname
    );
    if (naavaerendeSide && naavaerendeSide.stegIndeks > appSteg) {
        const riktigSide = stegConfig.find((side: ISteg) => side.stegIndeks === appSteg);
        if (riktigSide) {
            yield put(replace(riktigSide.path));
        }
    } else if (naavaerendeSide && naavaerendeSide.stegIndeks < appSteg) {
        yield put(appSettSteg(naavaerendeSide.stegIndeks));
        yield put(replace(naavaerendeSide.path));
    }
}

function* tilStegSaga(steg: number) {
    const tilSide = stegConfig.find((side: ISteg) => side.stegIndeks === steg);
    if (tilSide) {
        yield put(appSettSteg(steg));
        yield put(push(tilSide.path));
    }
}

function* nesteStegSaga(): SagaIterator {
    const appSteg = yield select(selectAppSteg);
    yield call(tilStegSaga, appSteg + 1);
}

function* forrigeStegSaga(): SagaIterator {
    const appSteg = yield select(selectAppSteg);
    yield call(tilStegSaga, appSteg - 1);
}

function* appSaga(): SagaIterator {
    yield takeLatest(AppTypeKeys.START_APP, startAppSaga);
    yield takeEvery(LOCATION_CHANGE, urlEndretSaga);
    yield takeEvery(AppTypeKeys.NESTE_STEG, nesteStegSaga);
    yield takeEvery(AppTypeKeys.FORRIGE_STEG, forrigeStegSaga);
}

export { appSaga };
