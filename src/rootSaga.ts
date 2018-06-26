import { all } from 'redux-saga/effects';
import { appSaga } from './app/saga';
import { barnSaga } from './barn/saga';
import { teksterSaga } from './tekster/saga';

function * rootSaga() {
    yield all( [
        appSaga(),
        barnSaga(),
        teksterSaga(),
    ]);
}

export {
    rootSaga,
};
