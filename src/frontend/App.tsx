import { captureException, withScope } from '@sentry/core';
import Spinner from 'nav-frontend-spinner';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { selectAppStatus } from './app/selectors';
import { AppStatus } from './app/types';
import Environment from './Environment';
import { IRootState } from './rootReducer';
import { Routes } from './Routes';
import Vedlikeholdsmodus from './sider/vedlikehold/Vedlikeholdsmodus';
import { isEnabled } from './toggles/selectors';
import { IToggleName } from './toggles/types';

interface IMapStateToProps {
    status: AppStatus;
    vedlikeholdsmodus: boolean;
    error: any;
    state: string;
}

type Props = IMapStateToProps & RouteComponentProps;

class App extends React.Component<Props> {
    public constructor(props: any) {
        super(props);
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
        if (this.props.vedlikeholdsmodus) {
            return (
                <div>
                    <Vedlikeholdsmodus />
                    <div>{JSON.stringify(this.props.error)}</div>
                    <div>{JSON.stringify(Environment().apiUrl)}</div>
                    <div>{JSON.stringify(Environment().apiUrl)}</div>
                </div>
            );
        }

        switch (this.props.status) {
            case AppStatus.IKKE_STARTET:
            case AppStatus.STARTER:
                return (
                    <div>
                        <Spinner className={'app__spinner'} type={'XXL'} />
                        <div>{JSON.stringify(this.props.error)}</div>
                        <div>{JSON.stringify(Environment().apiUrl)}</div>
                        <div>{JSON.stringify(Environment().apiUrl)}</div>
                    </div>
                );
            default:
                return (
                    <div>
                        <Routes />
                        <div>{JSON.stringify(this.props.error)}</div>
                        <div>{JSON.stringify(Environment().apiUrl)}</div>
                        <div>{JSON.stringify(Environment().apiUrl)}</div>
                    </div>
                );
        }
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
        vedlikeholdsmodus: isEnabled(state, IToggleName.vedlikeholdsmodus),
        error: state.app.error,
        state: JSON.stringify(state, null, 4),
    };
};

export default withRouter(connect(mapStateToProps)(App));
