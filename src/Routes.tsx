import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import GenerellFeilside from './sider/feilsider/GenerellFeilside';
import InnsendingFeilet from './sider/feilsider/InnsendingFeilet';
import SidenFinnesIkke from './sider/feilsider/SidenFinnesIkke';
import Kvittering from './sider/kvittering/Kvittering';
import { ISteg, stegConfig } from './stegConfig';
import FortroligAdresse from './sider/feilsider/FortroligAdresse';

const Routes: React.StatelessComponent<{}> = () => {
    return (
        <Switch>
            {Object.values(stegConfig).map(
                (side: ISteg): JSX.Element => {
                    return <Route {...side} exact={true} key={side.key} />;
                }
            )}
            <Route component={Kvittering} key="kvittering" path="/kvittering" exact={true} />
            <Route
                component={FortroligAdresse}
                key={'fortrolig-adresse'}
                path={'/fortrolig-adresse'}
            />
            <Route
                component={InnsendingFeilet}
                key="innsending-feilet"
                path="/innsending-feilet"
                exact={true}
            />
            <Route component={GenerellFeilside} key={'feilside'} path={'/feilside'} exact={true} />
            <Route component={SidenFinnesIkke} key={'siden-finnes-ikke'} />
        </Switch>
    );
};

export { Routes };
