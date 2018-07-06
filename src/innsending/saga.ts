import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { selectSoknad } from '../soknad/selectors';
import { InnsendingTypeKeys, sendInnFeilet, sendInnOk } from './actions';
import { sendInnSoknad } from './api';

function * sendInnSaga(): SagaIterator {
    try {
        const soknad = yield select(selectSoknad);
        yield call(sendInnSoknad, soknad);
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
