import { History } from 'history';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { IRootState } from './rootReducer';
import { ISide, Sider, SideType } from './sider/side/side';

export interface IAppProps {
    history: History;
}

interface  IMapStateToProps {
    aktivSide: ISide;
    skalStegindikatorVises: boolean;
}

type Props = DispatchProp & IAppProps & IMapStateToProps;

class App extends React.Component<Props, {}> {

    private static renderSoknadRoutes(): JSX.Element[] {
        return Sider.map((side: ISide) => {
                let routeProps = {
                    component: side.sideKomponent,
                    key: side.key,
                };

                if (side.key !== String('siden-finnes-ikke')) {
                    routeProps = Object.assign({ path: side.path, exact: true }, routeProps);
                }

                return (
                    <Route { ...routeProps }/>
                );
            });

    }

    render() {
        const indikatorsteg: StegindikatorStegProps[] = Sider
            .filter((side: ISide) => side.sideType === SideType.SKJEMASIDE)
            .map((side: ISide) => {
                return {
                    aktiv: this.props.aktivSide.stegIndeks === side.stegIndeks,
                    index: side.stegIndeks,
                    label: side.key
                };
            }
        );

        return (
            <div>
                <Stegindikator
                    steg={ indikatorsteg }
                    autoResponsiv={true}
                    visLabel={false}
                    kompakt={false}
                    aktivtSteg={this.props.aktivSide.stegIndeks}
                />
                <Switch>
                    { App.renderSoknadRoutes() }
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState, ownProp: any): IMapStateToProps  => ({
    aktivSide: state.side.aktivSide,
    skalStegindikatorVises: state.side.aktivSide ? state.side.aktivSide.sideType === SideType.SKJEMASIDE : false
});

export default withRouter(connect(mapStateToProps)(App));
