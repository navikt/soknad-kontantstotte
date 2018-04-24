import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './createStore';
import './index.less';

const rootElement = document.getElementById( 'app' );
const navn = 'Kontantstøtte';

render(
    <AppContainer>
        <Provider store={ store }>
            <App navn={ navn }/>
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
                    <NewApp navn={ navn }/>
                </Provider>
            </AppContainer>,
            rootElement,
        );
    });
}
