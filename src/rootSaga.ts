import { all } from 'redux-saga/effects';
import {
    faktaSaga,
} from './faktum/saga';

function * rootSaga() {
    yield all( [
        faktaSaga(),
    ] );
}

export {
    rootSaga,
};
