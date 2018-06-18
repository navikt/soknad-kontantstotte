import { History } from 'history';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Api from "./api/api";
import BarnehageplassSide from "./sider/barnehageplass/BarnehageplassSide";
import OppfyllerIkkeVilkaarSide from './sider/feilsider/OppfyllerIkkeVilkaarSide';
import SidenFinnesIkkeSide from "./sider/feilsider/SidenFinnesIkkeSide";
import KvitteringSide from "./sider/kvittering/KvitteringSide";
import MineBarnSide from './sider/mine_barn/MineBarnSide';
import OmsorgssituasjonSide from "./sider/omsorgssituasjon/OmsorgssituasjonSide";
import OppsummeringSide from "./sider/oppsummering/OppsummeringSide";
import UtenlandskForbindelseSide from "./sider/utenlandsk_forbindelse/UtenlandskForbindelseSide";
import VeiledningSide from './sider/veiledning/VeiledningSide';

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
                    component={ VeiledningSide }
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
                    key="omsorgssituasjon"
                    path="/omsorgssituasjon"
                    component={ OmsorgssituasjonSide }
                />
            ),
            (
                <Route
                    key="barnehageplass"
                    path="/barnehageplass"
                    component={ BarnehageplassSide }
                />
            ),
            (
                <Route
                    key="utenlandsk-forbindelse"
                    path="/utenlandsk-forbindelse"
                    component={ UtenlandskForbindelseSide }
                />
            ),
            (
                <Route
                    key="oppsummering"
                    path="/oppsummering"
                    component={ OppsummeringSide }
                />
            ),
            (
                <Route
                    key="kvittering"
                    path="/kvittering"
                    component={ KvitteringSide }
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
        Api.pingBackend();
        return (
            <Switch>
                { App.renderSoknadRoutes() }
            </Switch>
        );
    }
}

const mapStateToProps = (state: IState, ownProp: any): IState  => ({});

export default withRouter(connect(mapStateToProps)(App));
