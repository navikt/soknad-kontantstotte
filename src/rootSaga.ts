import { all, call } from 'redux-saga/effects';
import Api from "./api/api";
import { barnSaga } from './barn/saga';
import { teksterSaga } from './tekster/saga';

function * rootSaga() {
    yield call(Api.pingBackend);
    yield all( [
        barnSaga(),
        teksterSaga(),
    ]);
}

export {
    rootSaga,
};
