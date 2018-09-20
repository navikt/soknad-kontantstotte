import { all } from 'redux-saga/effects';
import { appSaga } from './app/saga';
import { innsendingSaga } from './innsending/saga';
import { sokerSaga } from './soker/saga';
import { soknadSaga } from './soknad/saga';
import { teksterSaga } from './tekster/saga';
import { togglesSaga } from './toggles/saga';

function* rootSaga() {
    yield all([
        appSaga(),
        sokerSaga(),
        teksterSaga(),
        togglesSaga(),
        innsendingSaga(),
        soknadSaga(),
    ]);
}

export { rootSaga };
