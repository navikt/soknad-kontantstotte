import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import BarnehageplassSide from './sider/barnehageplass/BarnehageplassSide';
import OppfyllerIkkeVilkaarSide from './sider/feilsider/OppfyllerIkkeVilkaarSide';
import SidenFinnesIkkeSide from './sider/feilsider/SidenFinnesIkkeSide';
import KvitteringSide from './sider/kvittering/KvitteringSide';
import MineBarnSide from './sider/mine_barn/MineBarnSide';
import OmsorgssituasjonSide from './sider/omsorgssituasjon/OmsorgssituasjonSide';
import OppsummeringSide from './sider/oppsummering/OppsummeringSide';
import StartSide from './sider/start/StartSide';
import UtenlandskForbindelseSide from './sider/utenlandsk_forbindelse/UtenlandskForbindelseSide';
import VeiledningSide from './sider/veiledning/VeiledningSide';

export enum SideType {
    SKJEMASIDE = 'SKJEMASIDE',
    ANNEN_INFOSIDE = 'ANNEN_INFOSIDE'
}

export interface ISide {
    key: string;
    path: string;
    stegIndeks: number;
    sideKomponent: React.ComponentType<any>;
    sideType: SideType;
}

export const Sider: ISide[] = [
    {
        key: 'veiledning',
        path: '/',
        sideKomponent: VeiledningSide,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: -1
    },
    {
        key: 'start',
        path: '/start',
        sideKomponent: StartSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 0
    },
    {
        key: 'mine-barn',
        path: '/mine-barn',
        sideKomponent: MineBarnSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 1
    },
    {
        key: 'omsorgssituasjon',
        path: '/omsorgssituasjon',
        sideKomponent: OmsorgssituasjonSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 2
    },
    {
        key: 'barnehageplass',
        path: '/barnehageplass',
        sideKomponent: BarnehageplassSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 3
    },
    {
        key: 'utenlandsk-forbindelse',
        path: '/utenlandsk-forbindelse',
        sideKomponent: UtenlandskForbindelseSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 4
    },
    {
        key: 'oppsummering',
        path: '/oppsummering',
        sideKomponent: OppsummeringSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 5
    },
    {
        key: 'kvittering',
        path: '/kvittering',
        sideKomponent: KvitteringSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 6
    },
    {
        key: 'siden-finnes-ikke',
        path: '',
        sideKomponent: SidenFinnesIkkeSide,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: 7
    },
    {
        key: 'oppfyller-ikke-vilkaar',
        path: '/oppfyller-ikke-vilkaar',
        sideKomponent: OppfyllerIkkeVilkaarSide,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: 8
    }
];

const sideMedPath = (path: string) => Sider.filter((side: ISide) => side.path === path);

export const hentIndeksForPath = (path: string): number => {
    const potensielleSider = sideMedPath(path);
    return potensielleSider.length > 0 ? potensielleSider[0].stegIndeks : -1;
};

export const renderSoknadRoutes = (): JSX.Element[] => {
    const routes: JSX.Element[] = Sider.sort((sideA, sideB) => sideB.path.localeCompare(sideA.path))
        .map((side: ISide): JSX.Element => {
            let routeProps: RouteProps = {
                component: side.sideKomponent
            };

            if (side.key !== String('siden-finnes-ikke')) {
                routeProps = Object.assign({ path: side.path, exact: true }, routeProps);
            }

            return(
                <Route { ...routeProps } key={side.key}/>
            );
        });

    return routes;
};
