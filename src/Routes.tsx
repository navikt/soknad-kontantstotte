import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import GenerellFeilside from './sider/feilsider/GenerellFeilside';
import InnsendingFeilet from './sider/feilsider/InnsendingFeilet';
import SidenFinnesIkke from './sider/feilsider/SidenFinnesIkke';
import VedleggOpplastingFeilet from './sider/feilsider/VedleggOpplastingFeilet';
import Kvittering from './sider/kvittering/Kvittering';
import { ISteg, stegConfig } from './stegConfig';

import Axios from 'axios';
import PapirsoknadFeilside from './sider/feilsider/PapirsoknadFeilside';

const Routes: React.StatelessComponent<{}> = () => {
    const sentryTest = () => {
        Axios.request({
            method: 'GET',
            url: '/familie-ks-sak/api/sentryFail',
        })
            .then(data => console.log('data: ', data))
            .catch(error => console.log('error: ', error));
    };

    return (
        <Switch>
            <button onClick={sentryTest}>Sentry test</button>
            {Object.values(stegConfig).map(
                (side: ISteg): JSX.Element => {
                    return <Route {...side} exact={true} key={side.key} />;
                }
            )}
            <Route component={Kvittering} key="kvittering" path="/kvittering" exact={true} />
            <Route
                key={'fortrolig-adresse'}
                render={props => (
                    <PapirsoknadFeilside
                        {...props}
                        feilsidemelding="papirsoknad.feilmelding.veileder.fortrolig.adresse"
                    />
                )}
                path={'/fortrolig-adresse'}
            />
            <Route
                key={'ingen-barn'}
                render={props => (
                    <PapirsoknadFeilside
                        {...props}
                        feilsidemelding="papirsoknad.feilmelding.veileder.ingen.barn"
                    />
                )}
                path={'/ingen-barn'}
            />
            <Route
                component={VedleggOpplastingFeilet}
                key={'vedlegg-opplasting-feilet'}
                path={'/vedlegg-opplasting-feilet'}
                exact={true}
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
