import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { InnsendingTypeKeys, ISendInn, sendInnFeilet, sendInnOk } from './actions';
import { sendInnSoknad } from './api';

function * sendInnSaga(action: ISendInn): SagaIterator {
    try {
        yield call(sendInnSoknad, action.soknad);
        yield put(sendInnOk());
        yield put(push('/kvittering'));
    } catch (error) {
        yield put(sendInnFeilet());
        yield put(push('/innsending-feilet'));
    }
}

function * innsendingSaga(): SagaIterator {
    yield takeEvery(InnsendingTypeKeys.SENDINN, sendInnSaga);
}

export {
    sendInnSaga,
    innsendingSaga,
};
