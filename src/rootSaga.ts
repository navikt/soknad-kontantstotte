import { all } from 'redux-saga/effects';
import { barnSaga } from './barn/saga';

function * rootSaga() {
    yield all( [
        barnSaga()
    ] );
}

export {
    rootSaga,
};
