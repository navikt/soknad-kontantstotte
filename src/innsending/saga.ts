import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { sendInnSoknad } from '../app/api';
import { ISoknad } from './soknad';
import { InnsendingTypeKeys, sendInnFeilet, sendInnOk } from './actions';

const soknad: ISoknad = {
    soker: '***REMOVED***'
};

function * sendInnSaga(): SagaIterator {
    try {
        yield call(sendInnSoknad, soknad);
        yield put(sendInnOk());
        yield put(push('/kvittering'));
    } catch (error) {
        yield put(sendInnFeilet());
    }
}

function * innsendingSaga(): SagaIterator {
    yield takeEvery(InnsendingTypeKeys.SENDINN, sendInnSaga);
}

export {
    sendInnSaga,
    innsendingSaga,
};
