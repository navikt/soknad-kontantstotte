import * as React from 'react';
import ArbeidsforholdSide from './sider/arbeidsforhold/Arbeidsforhold';
import BarnehageplassSide from './sider/barnehageplass/Barnehageplass';
import FamilieforholdSide from './sider/familieforhold/Familieforhold';
import KravTilSoker from './sider/krav-til-soker/KravTilSoker';
import MineBarnSide from './sider/mine-barn/MineBarn';
import OppsummeringSide from './sider/oppsummering/Oppsummering';
import TilknytningTilUtland from './sider/tilknytning-utland/TilknytningTilUtland';
import UtenlandskeYtelser from './sider/utenlandske-ytelser/UtenlandskeYtelser';
import Veiledning from './sider/veiledning/Veiledning';

interface IStegConfig {
    veiledning: ISteg;
    kravTilSoker: ISteg;
    mineBarn: ISteg;
    familieforhold: ISteg;
    barnehageplass: ISteg;
    arbeidsforhold: ISteg;
    utenlandskeYtelser: ISteg;
    tilknytningTilUtland: ISteg;
    oppsummering: ISteg;
}

interface ISteg {
    component: React.ComponentType<any>;
    key: string;
    path: string;
    stegIndeks: number;
}

/* tslint:disable:object-literal-sort-keys */
const stegConfig: IStegConfig = {
    veiledning: {
        component: Veiledning,
        key: 'veiledning',
        path: '/',
        stegIndeks: 0,
    },
    kravTilSoker: {
        component: KravTilSoker,
        key: 'kravTilSoker',
        path: '/start',
        stegIndeks: 1,
    },
    mineBarn: {
        component: MineBarnSide,
        key: 'mineBarn',
        path: '/mine-barn',
        stegIndeks: 2,
    },
    barnehageplass: {
        component: BarnehageplassSide,
        key: 'barnehageplass',
        path: '/barnehageplass',
        stegIndeks: 3,
    },
    familieforhold: {
        component: FamilieforholdSide,
        key: 'familieforhold',
        path: '/familieforhold',
        stegIndeks: 4,
    },
    tilknytningTilUtland: {
        component: TilknytningTilUtland,
        key: 'tilknytningTilUtland',
        path: '/tilknytning-utland',
        stegIndeks: 5,
    },
    arbeidsforhold: {
        component: ArbeidsforholdSide,
        key: 'arbeidsforhold',
        path: '/arbeidsforhold',
        stegIndeks: 6,
    },
    utenlandskeYtelser: {
        component: UtenlandskeYtelser,
        key: 'utenlandskeYtelser',
        path: '/utenlandske-ytelser',
        stegIndeks: 7,
    },
    oppsummering: {
        component: OppsummeringSide,
        key: 'oppsummering',
        path: '/oppsummering',
        stegIndeks: 8,
    },
};
/* tslint:enable:object-literal-sort-keys */

export { stegConfig, ISteg };
