import OppfyllerIkkeVilkaarSide from './sider/feilsider/OppfyllerIkkeVilkaarSide';
import MineBarnSide from './sider/mine_barn/MineBarnSide';
import VeilendingSide from './sider/veiledning/VeiledningSide';
import { History } from 'history';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import SidenFinnesIkkeSide from "./sider/feilsider/SidenFinnesIkkeSide";

export interface IAppProps {
    history: History;
}

export interface IState {}

type Props = DispatchProp & IAppProps;

class App extends React.Component<Props, {}> {

    private static renderSoknadRoutes(): JSX.Element[] {
        return [
            (
                <Route
                    key="veiledning"
                    path="/"
                    exact={true}
                    component={ VeilendingSide }
                />
            ),
            (
                <Route
                    key="oppfyller-ikke-vilkaar"
                    path="/oppfyller-ikke-vilkaar"
                    exact={true}
                    component={ OppfyllerIkkeVilkaarSide }
                />
            ),
            (
                <Route
                    key="mine-barn"
                    path="/mine-barn"
                    component={ MineBarnSide }
                />
            ),
            (
                <Route
                    key="siden-finnes-ikke"
                    component={ SidenFinnesIkkeSide }
                />
            )
        ];
    }

    render() {
        return (
            <Switch>
                { App.renderSoknadRoutes() }
            </Switch>
        );
    }
}

const mapStateToProps = (state: IState, ownProp: any): IState  => ({});

export default withRouter(connect(mapStateToProps)(App));
