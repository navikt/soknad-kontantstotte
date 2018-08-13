import Spinner from 'nav-frontend-spinner';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { selectAppStatus } from './app/selectors';
import { AppStatus } from './app/types';
import { IRootState } from './rootReducer';
import { Routes } from './Routes';
import GenerellFeilside from './sider/feilsider/GenerellFeilside';
import IkkeTilgang from './sider/feilsider/IkkeTilgang';

interface IMapStateToProps {
    status: AppStatus;
}

type Props = IMapStateToProps & RouteComponentProps<{}>;

const App: React.StatelessComponent<Props> = ({ status }) => {
    switch (status) {
        case AppStatus.IKKE_STARTET:
        case AppStatus.STARTER:
            return <Spinner type={'XXL'} />;
        case AppStatus.KLAR:
            return <Routes />;
        case AppStatus.FEILSITUASJON:
            return <GenerellFeilside />;
        case AppStatus.IKKE_TILGANG:
            return <IkkeTilgang />;
    }
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default withRouter(connect(mapStateToProps)(App));
