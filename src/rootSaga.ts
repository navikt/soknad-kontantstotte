import { all } from 'redux-saga/effects';
import { appSaga } from './app/saga';
import { innsendingSaga } from './innsending/saga';
import { personSaga } from './person/saga';
import { soknadSaga } from './soknad/saga';
import { teksterSaga } from './tekster/saga';

function* rootSaga() {
    yield all([appSaga(), personSaga(), teksterSaga(), innsendingSaga(), soknadSaga()]);
}

export { rootSaga };
