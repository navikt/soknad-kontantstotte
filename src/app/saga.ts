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
import { sokerHent, SokerTypeKeys } from '../soker/actions';
import { ISteg, stegConfig } from '../stegConfig';
import { teksterHent, TeksterTypeKeys } from '../tekster/actions';
import { ISprak } from '../tekster/types';
import { ToggelsTypeKeys, togglesHent } from '../toggles/actions';
import { appEndreStatus, appSettSteg, AppTypeKeys } from './actions';
import { pingBackend } from './api';
import { selectAppSteg } from './selectors';
import { AppStatus, ILocationChangeAction } from './types';

const redirectTilLogin = () => {
    window.location.href = Environment().loginUrl + '?redirect=' + window.location.href;
};

const bestemSprakFraParams = (): ISprak => {
    const sprakParams = new URLSearchParams(window.location.search);
    const sprak = sprakParams.get('sprak');

    return Object.values(ISprak).includes(sprak) ? (sprak as ISprak) : ISprak.nb;
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

function fiksUtloggingsKnapp() {
    const logginnKnapp = window.document.querySelector('#login');
    const utloggingKnapp = window.document.querySelector('#logout');
    if (logginnKnapp && utloggingKnapp) {
        logginnKnapp.classList.add('hidden');
        utloggingKnapp.classList.remove('hidden');
    }
}

function* forsteSidelastSaga(): SagaIterator {
    yield call(autentiserBruker);
    yield call(fiksUtloggingsKnapp);
    yield put(togglesHent());
    yield take([ToggelsTypeKeys.HENT_FEILET, ToggelsTypeKeys.HENT_OK]);

    const sprak = bestemSprakFraParams();
    yield put(teksterHent(sprak));
    yield put(sokerHent());

    yield all([take(TeksterTypeKeys.HENT_OK), take(SokerTypeKeys.HENT_OK)]);

    yield put(appEndreStatus(AppStatus.KLAR));
}

function* startAppSaga(): SagaIterator {
    yield put(appEndreStatus(AppStatus.STARTER));
    const startSaga = yield fork(forsteSidelastSaga);
    yield take([TeksterTypeKeys.HENT_FEILET, SokerTypeKeys.HENT_FEILET]);
    yield cancel(startSaga);
    yield put(appEndreStatus(AppStatus.FEILSITUASJON));
}

function* urlEndretSaga(action: ILocationChangeAction): SagaIterator {
    const appSteg = yield select(selectAppSteg);
    const naavaerendeSide = Object.values(stegConfig).find(
        (side: ISteg) => side.path === action.payload.location.pathname
    );
    if (naavaerendeSide && naavaerendeSide.stegIndeks > appSteg) {
        const riktigSide = Object.values(stegConfig).find(
            (side: ISteg) => side.stegIndeks === appSteg
        );
        if (riktigSide) {
            yield put(replace(riktigSide.path));
        }
    } else if (naavaerendeSide && naavaerendeSide.stegIndeks < appSteg) {
        yield put(appSettSteg(naavaerendeSide.stegIndeks));
        yield put(replace(naavaerendeSide.path));
    }
}

function* tilStegSaga(steg: number) {
    const tilSide = Object.values(stegConfig).find((side: ISteg) => side.stegIndeks === steg);
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
