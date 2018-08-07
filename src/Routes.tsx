import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import ArbeidsforholdSide from './sider/arbeidsforhold/Arbeidsforhold';
import BarnehageplassSide from './sider/barnehageplass/Barnehageplass';
import FamilieforholdSide from './sider/familieforhold/Familieforhold';
import IkkeTilgang from './sider/feilsider/IkkeTilgang';
import InnsendingFeilet from './sider/feilsider/InnsendingFeilet';
import OppfyllerIkkeVilkaar from './sider/feilsider/OppfyllerIkkeVilkaar';
import SidenFinnesIkke from './sider/feilsider/SidenFinnesIkke';
import KravTilSoker from './sider/krav-til-soker/KravTilSoker';
import Kvittering from './sider/kvittering/Kvittering';
import MineBarnSide from './sider/mine-barn/MineBarn';
import OppsummeringSide from './sider/oppsummering/Oppsummering';
import Veiledning from './sider/veiledning/Veiledning';

export enum SideType {
    SKJEMASIDE = 'SKJEMASIDE',
    ANNEN_INFOSIDE = 'ANNEN_INFOSIDE',
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
        sideKomponent: Veiledning,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: -1,
    },
    {
        key: 'start',
        path: '/start',
        sideKomponent: KravTilSoker,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 0,
    },
    {
        key: 'mine-barn',
        path: '/mine-barn',
        sideKomponent: MineBarnSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 1,
    },
    {
        key: 'familieforhold',
        path: '/familieforhold',
        sideKomponent: FamilieforholdSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 2,
    },
    {
        key: 'barnehageplass',
        path: '/barnehageplass',
        sideKomponent: BarnehageplassSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 3,
    },
    {
        key: 'arbeidsforhold',
        path: '/arbeidsforhold',
        sideKomponent: ArbeidsforholdSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 4,
    },
    {
        key: 'oppsummering',
        path: '/oppsummering',
        sideKomponent: OppsummeringSide,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 5,
    },
    {
        key: 'kvittering',
        path: '/kvittering',
        sideKomponent: Kvittering,
        sideType: SideType.SKJEMASIDE,
        stegIndeks: 6,
    },
    {
        key: 'siden-finnes-ikke',
        path: '',
        sideKomponent: SidenFinnesIkke,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: -1,
    },
    {
        key: 'oppfyller-ikke-vilkaar',
        path: '/oppfyller-ikke-vilkaar',
        sideKomponent: OppfyllerIkkeVilkaar,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: -1,
    },
    {
        key: 'innsending-feilet',
        path: '/innsending-feilet',
        sideKomponent: InnsendingFeilet,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: -1,
    },
    {
        key: 'ikke-tilgang',
        path: '/ikke-tilgang',
        sideKomponent: IkkeTilgang,
        sideType: SideType.ANNEN_INFOSIDE,
        stegIndeks: -1,
    },
];

const sideMedPath = (path: string) => Sider.filter((side: ISide) => side.path === path);

export const hentIndeksForPath = (path: string): number => {
    const potensielleSider = sideMedPath(path);
    return potensielleSider.length > 0 ? potensielleSider[0].stegIndeks : -1;
};

const Routes: React.StatelessComponent<{}> = () => {
    return (
        <Switch>
            {Sider.sort((sideA, sideB) => sideB.path.localeCompare(sideA.path)).map(
                (side: ISide): JSX.Element => {
                    let routeProps: RouteProps = {
                        component: side.sideKomponent,
                    };

                    if (side.key !== 'siden-finnes-ikke') {
                        routeProps = {
                            exact: true,
                            path: side.path,
                            ...routeProps,
                        };
                    }

                    return <Route {...routeProps} key={side.key} />;
                }
            )}
        </Switch>
    );
};

export { Routes };
