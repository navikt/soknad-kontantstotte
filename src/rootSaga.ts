import { all } from 'redux-saga/effects';
import { appSaga } from './app/saga';
import { barnSaga } from './barn/saga';
import { innsendingSaga } from './innsending/saga';
import { teksterSaga } from './tekster/saga';

function* rootSaga() {
    yield all([appSaga(), barnSaga(), teksterSaga(), innsendingSaga()]);
}

export { rootSaga };
