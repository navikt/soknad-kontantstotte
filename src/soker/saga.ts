import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { isEnabled } from '../toggles/selectors';
import { IToggleName } from '../toggles/types';
import { sokerHentFeilet, sokerHentOk, SokerTypeKeys } from './actions';
import { fetchSoker } from './api';
import { initialState } from './reducer';

function* fetchSokerSaga(): SagaIterator {
    try {
        const visInnloggetBrukerToggle = yield select(isEnabled, IToggleName.vis_innlogget_bruker);
        if (visInnloggetBrukerToggle) {
            const soker = yield call(fetchSoker);
            yield put(sokerHentOk(soker));
        } else {
            yield put(sokerHentOk(initialState.soker));
        }
    } catch (err) {
        yield put(sokerHentFeilet());
    }
}

function* sokerSaga(): SagaIterator {
    yield takeEvery(SokerTypeKeys.HENT, fetchSokerSaga);
}

export { fetchSokerSaga, sokerSaga };
