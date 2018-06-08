import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './createStore';
import './index.less';

const rootElement = document.getElementById( 'app' );

render(
    <AppContainer>
        <Provider store={ store }>
            <Router>
                <App/>
            </Router>
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
                    <Router>
                        <NewApp />
                    </Router>
                </Provider>
            </AppContainer>,
            rootElement,
        );
    });
}
