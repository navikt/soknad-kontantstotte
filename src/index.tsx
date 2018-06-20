import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import { history, store } from './createStore';
import './index.less';

const rootElement = document.getElementById( 'app' );

render(
    <AppContainer>
        <Provider store={ store }>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </AppContainer>,
    rootElement,
);

if ( module.hot ) {
    module.hot.accept('./App', () => {
        const NewApp = require('./App').default;
        render(
            <AppContainer>
                <Provider store={ store }>
                    <ConnectedRouter history={history}>
                        <NewApp />
                    </ConnectedRouter>
                </Provider>
            </AppContainer>,
            rootElement,
        );
    });
}
