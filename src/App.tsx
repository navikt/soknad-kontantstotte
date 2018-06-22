import Spinner from 'nav-frontend-spinner';
import * as React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AppStatus } from './app/types';
import { IRootState } from './rootReducer';
import { renderSoknadRoutes } from './routes';

interface IMapStateToProps {
    status: AppStatus;
}

type Props = IMapStateToProps;

const App: React.StatelessComponent<Props> = ({
    status
}) => {

    switch (status) {
        case AppStatus.IKKE_STARTET:
        case AppStatus.STARTER:
            return (
                <Spinner type={'XXL'} />
            );
        case AppStatus.KLAR:
            return (
                <div>
                    <Switch>
                        { renderSoknadRoutes() }
                    </Switch>
                </div>
            );
        case AppStatus.FEILSITUASJON:
            return (
                <div>
                    <p>En feil har oppstått</p>
                </div>
            );
    }

};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: state.app.status
    };
};

export default connect(mapStateToProps)(App);
