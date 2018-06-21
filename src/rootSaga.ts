import { all } from 'redux-saga/effects';
import { barnSaga } from './barn/saga';
import { teksterSaga } from './tekster/saga';

function * rootSaga() {
    yield all( [
        barnSaga(),
        teksterSaga(),
    ]);
}

export {
    rootSaga,
};
