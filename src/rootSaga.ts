import { all } from 'redux-saga/effects';
import { appSaga } from './app/saga';
import { personSaga } from './person/saga';
import { innsendingSaga } from './innsending/saga';
import { teksterSaga } from './tekster/saga';

function* rootSaga() {
    yield all([appSaga(), personSaga(), teksterSaga(), innsendingSaga()]);
}

export { rootSaga };
