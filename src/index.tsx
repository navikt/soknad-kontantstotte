import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import { barnHent } from './barn/actions';
import { history, store } from './createStore';
import './index.less';
import { teksterHent } from './tekster/actions';
import IntlProvider from './IntlProvider';

const rootElement = document.getElementById( 'app' );

const renderApp = (Component: React.ComponentClass<any>) => {
    render(
        <AppContainer>
            <Provider store={ store }>
                <ConnectedRouter history={history}>
                    <IntlProvider>
                        <Component/>
                    </IntlProvider>
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        rootElement,
    );
};

renderApp(App);

if ( module.hot ) {
    module.hot.accept('./App', () => {
        const NewApp = require('./App').default;
        renderApp(NewApp);
    });
}

store.dispatch(barnHent());
store.dispatch(teksterHent());
