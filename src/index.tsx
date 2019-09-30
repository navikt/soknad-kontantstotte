import { init } from '@sentry/browser';
import { ConnectedRouter } from 'connected-react-router';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import { appStart } from './app/actions';
import { history, store } from './createStore';
import IntlProvider from './IntlProvider';

/* tslint:disable */
const packageConfig = require('../package.json');
/* tslint:enable */

import './index.less';

if (process.env.NODE_ENV !== 'development') {
    const environment = window.location.hostname;

    init({
        dsn: 'https://1efd40f84cce477f82c25b93cc18eaa0@sentry.nav.no/16',
        environment,
        release: packageConfig.version,
    });
}

if (document.getElementById('pagewrapper')) {
    Modal.setAppElement('#pagewrapper');
} else {
    Modal.setAppElement('#app');
}

const rootElement = document.getElementById('app');

const renderApp = (Component: React.ComponentType<{}>) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <IntlProvider>
                    <ConnectedRouter history={history}>
                        <Component />
                    </ConnectedRouter>
                </IntlProvider>
            </Provider>
        </AppContainer>,
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
