import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { AnyAction } from 'redux';
import OppfyllerIkkeVilkaarSide from './sider/feilsider/OppfyllerIkkeVilkaarSide';
import MineBarnSide from "./sider/mine_barn/MineBarnSide";
import VeilendingSide from './sider/veiledning/VeiledningSide';

export interface IAppProps {
    navn: string;
}

type Props = DispatchProp<AnyAction> & IAppProps;

class App extends React.Component<Props> {

    private static renderSoknadRoutes(): JSX.Element[] {
        return [
            (
                <Route
                    key="veiledning"
                    path="/soknad-kontantstotte"
                    exact={true}
                    component={ VeilendingSide }
                />
            ),
            (
                <Route
                    key="oppfyller-ikke-vilkaar"
                    path="/soknad-kontantstotte/oppfyller-ikke-vilkaar"
                    exact={true}
                    component={ OppfyllerIkkeVilkaarSide }
                />
            ),
            (
                <Route
                    key="minebarn"
                    path="/soknad-kontantstotte/mine-barn"
                    component={ MineBarnSide }
                />
            )
        ];
    }

    render() {
        return (
            <Switch>
                <div> { App.renderSoknadRoutes() } </div>
            </Switch>
        );
    }
}

const mapStateToProps = (state: any, ownProp?: any): IAppProps  => ({
    navn: ownProp.navn
});

export default connect(mapStateToProps)(App);
