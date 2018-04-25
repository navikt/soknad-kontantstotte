import { SagaIterator } from 'redux-saga';
import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import {
    faktumHentFeilet,
    faktumHentOk,
    FaktumTypeKeys,
} from './actions';
import { fetchFaktum } from './api';

function * fetchFaktaSaga(): SagaIterator {
    try {
        const fakta = yield call( fetchFaktum );
        yield put( faktumHentOk( fakta ) );
    } catch ( err ) {
        yield put( faktumHentFeilet() );
    }
}

function * faktaSaga(): SagaIterator {
    yield takeEvery( FaktumTypeKeys.FAKTUM_HENT, fetchFaktaSaga );
}

export {
    fetchFaktaSaga,
    faktaSaga,
};
