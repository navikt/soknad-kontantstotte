import * as React from 'react';

import * as Sentry from '@sentry/react';
import { ConnectedRouter } from 'connected-react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Modal from 'nav-frontend-modal';

import App from './App';
import { appStart } from './app/actions';
import { history, store } from './createStore';
import IntlProvider from './IntlProvider';
/* tslint:enable */

import './index.less';

/* tslint:disable */
const packageConfig = require('../../package.json');

const environment = window.location.hostname;
Sentry.init({
    dsn: 'https://9bb17d6a1f384a618adf60f3b80ad060@sentry.gc.nav.no/2',
    environment,
    release: packageConfig.version,
    autoSessionTracking: false,
    enabled: process.env.NODE_ENV !== 'development',
});

if (document.getElementById('pagewrapper')) {
    Modal.setAppElement('#pagewrapper');
} else {
    Modal.setAppElement('#app');
}

const rootElement = document.getElementById('app');

const renderApp = Component => {
    render(
        <Provider store={store}>
            <IntlProvider>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </IntlProvider>
        </Provider>,
        rootElement
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NewApp = require('./App').default;
        renderApp(NewApp);
    });
}

store.dispatch(appStart());
