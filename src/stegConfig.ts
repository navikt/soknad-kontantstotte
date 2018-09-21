import * as React from 'react';
import Arbeidsforhold from './sider/arbeidsforhold/Arbeidsforhold';
import Barnehageplass from './sider/barnehageplass/Barnehageplass';
import Familieforhold from './sider/familieforhold/Familieforhold';
import KravTilSoker from './sider/krav-til-soker/KravTilSoker';
import MineBarn from './sider/mine-barn/MineBarn';
import Oppsummering from './sider/oppsummering/Oppsummering';
import UtenlandskKontantstotte from './sider/utenlandsk-kontantstotte/UtenlandskKontantstotte';
import UtenlandskeYtelser from './sider/utenlandske-ytelser/UtenlandskeYtelser';
import Veiledning from './sider/veiledning/Veiledning';

interface IStegConfig {
    veiledning: ISteg;
    kravTilSoker: ISteg;
    mineBarn: ISteg;
    familieforhold: ISteg;
    utenlandskKontantstotte: ISteg;
    barnehageplass: ISteg;
    arbeidsforhold: ISteg;
    utenlandskeYtelser: ISteg;
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
        component: MineBarn,
        key: 'mineBarn',
        path: '/mine-barn',
        stegIndeks: 2,
    },
    familieforhold: {
        component: Familieforhold,
        key: 'familieforhold',
        path: '/familieforhold',
        stegIndeks: 3,
    },
    barnehageplass: {
        component: Barnehageplass,
        key: 'barnehageplass',
        path: '/barnehageplass',
        stegIndeks: 4,
    },
    arbeidsforhold: {
        component: Arbeidsforhold,
        key: 'arbeidsforhold',
        path: '/arbeidsforhold',
        stegIndeks: 5,
    },
    utenlandskeYtelser: {
        component: UtenlandskeYtelser,
        key: 'utenlandskeYtelser',
        path: '/utenlandske-ytelser',
        stegIndeks: 6,
    },
    utenlandskKontantstotte: {
        component: UtenlandskKontantstotte,
        key: 'utenlandskKontantstotte',
        path: '/utenlandsk-kontantstotte',
        stegIndeks: 7,
    },
    oppsummering: {
        component: Oppsummering,
        key: 'oppsummering',
        path: '/oppsummering',
        stegIndeks: 8,
    },
};
/* tslint:enable:object-literal-sort-keys */

export { stegConfig, ISteg };
