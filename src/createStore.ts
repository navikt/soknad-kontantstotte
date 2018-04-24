import {
    applyMiddleware,
    createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {
    rootReducer,
} from './rootReducer';
import {
    rootSaga,
} from './rootSaga';

function configureStore() {

    const logger = createLogger( {
        collapsed: true,
    } );

    const saga = createSagaMiddleware();
    const middleware = applyMiddleware(
        saga,
        logger,
    );
    const createdStore = createStore(
        rootReducer,
        middleware,
    );

    saga.run( rootSaga );

    return createdStore;
}

const store = configureStore();

export { store };
