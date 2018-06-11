import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
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

const history = createBrowserHistory({
    basename: 'soknad-kontantstotte'
});

function configureStore() {

    const logger = createLogger( {
        collapsed: true,
    } );

    const saga = createSagaMiddleware();
    const middleware = applyMiddleware(
        routerMiddleware(history),
        saga,
        logger
    );
    const createdStore = createStore(
        connectRouter(history)(rootReducer),
        middleware,
    );

    saga.run( rootSaga );

    return createdStore;
}

const store = configureStore();

export { history, store };
