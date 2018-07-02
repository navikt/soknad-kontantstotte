import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { sendInnSoknad } from '../app/api';
import { InnsendingTypeKeys, ISendInn, sendInnFeilet, sendInnOk } from './actions';

function * sendInnSaga(action: ISendInn): SagaIterator {
    try {
        yield call(sendInnSoknad, action.soknad);
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
