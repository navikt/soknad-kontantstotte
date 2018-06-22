import * as React from 'react';
import { Switch } from 'react-router-dom';
import Api from "./api/api";
import { renderSoknadRoutes } from './routes';

const App = (): JSX.Element => {
    Api.pingBackend();
    return (
        <div>
            <Switch>
                { renderSoknadRoutes() }
            </Switch>
        </div>
    );
};

export default App;
