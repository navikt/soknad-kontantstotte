import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { appNesteSteg } from '../app/actions';
import { selectSoknad } from '../soknad/selectors';
import { InnsendingTypeKeys, sendInnFeilet, sendInnOk } from './actions';
import { sendInnSoknad } from './api';

function* mapStateToModel(): object {
    const soknad = yield select(selectSoknad);

    const strippetSoknad = Object.entries(soknad).reduce((acc: object, [stegKey, steg]) => {
        return {
            ...acc,
            [stegKey]: {
                ...Object.entries(steg).reduce((accFelt: object, [feltKey, felt]) => {
                    return { ...accFelt, [feltKey]: felt.verdi };
                }, {}),
            },
        };
    }, {});

    return strippetSoknad;
}

function* sendInnSaga(): SagaIterator {
    try {
        yield call(sendInnSoknad, mapStateToModel());
        yield put(sendInnOk());
        yield put(appNesteSteg());
    } catch (error) {
        yield put(sendInnFeilet());
        yield put(push('/innsending-feilet'));
    }
}

function* innsendingSaga(): SagaIterator {
    yield takeEvery(InnsendingTypeKeys.SENDINN, sendInnSaga);
}

export { sendInnSaga, innsendingSaga };
