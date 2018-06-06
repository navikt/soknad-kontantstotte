import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './createStore';
import './index.less';
import { BrowserRouter as Router } from 'react-router-dom';

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
                        <NewApp navn={ navn }/>
                    </Router>
                </Provider>
            </AppContainer>,
            rootElement,
        );
    });
}
