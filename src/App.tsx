import { showReportDialog } from '@sentry/browser';
import { captureException, configureScope, withScope } from '@sentry/core';
import Spinner from 'nav-frontend-spinner';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { selectAppStatus } from './app/selectors';
import { AppStatus } from './app/types';
import { IRootState } from './rootReducer';
import { Routes } from './Routes';

interface IMapStateToProps {
    status: AppStatus;
}

type Props = IMapStateToProps & RouteComponentProps<{}>;

class App extends React.Component<Props> {
    public constructor(props: any) {
        super(props);

        this.state = {};
    }

    public componentDidCatch(error: any, info: any) {
        if (process.env.NODE_ENV !== 'development') {
            withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    captureException(error);
                });
            });
        }
    }

    public render() {
        switch (this.props.status) {
            case AppStatus.IKKE_STARTET:
            case AppStatus.STARTER:
                return <Spinner className={'app__spinner'} type={'XXL'} />;
            default:
                return <Routes />;
        }
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default withRouter(connect(mapStateToProps)(App));
