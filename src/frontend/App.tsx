import { captureException, withScope } from '@sentry/core';
import Spinner from 'nav-frontend-spinner';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { selectAppStatus } from './app/selectors';
import { AppStatus } from './app/types';
import { IRootState } from './rootReducer';
import { Routes } from './Routes';
import Vedlikeholdsmodus from './sider/vedlikehold/Vedlikeholdsmodus';
import { isEnabled } from './toggles/selectors';
import { IToggleName } from './toggles/types';

interface IMapStateToProps {
    status: AppStatus;
    vedlikeholdsmodus: boolean;
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
            return <Vedlikeholdsmodus />;
        }

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
        vedlikeholdsmodus: isEnabled(state, IToggleName.vedlikeholdsmodus),
    };
};

export default withRouter(connect(mapStateToProps)(App));
