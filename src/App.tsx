import * as React from 'react';
import { Switch } from 'react-router-dom';
import { renderSoknadRoutes } from './routes';

const App = (): JSX.Element => {
    return (
        <div>
            <Switch>
                { renderSoknadRoutes() }
            </Switch>
        </div>
    );
};

export default App;
