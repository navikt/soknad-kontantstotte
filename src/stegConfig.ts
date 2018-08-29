import * as React from 'react';
import ArbeidsforholdSide from './sider/arbeidsforhold/Arbeidsforhold';
import BarnehageplassSide from './sider/barnehageplass/Barnehageplass';
import FamilieforholdSide from './sider/familieforhold/Familieforhold';
import KravTilSoker from './sider/krav-til-soker/KravTilSoker';
import MineBarnSide from './sider/mine-barn/MineBarn';
import OppsummeringSide from './sider/oppsummering/Oppsummering';
import Veiledning from './sider/veiledning/Veiledning';

interface ISteg {
    component: React.ComponentType<any>;
    key: string;
    path: string;
    stegIndeks: number;
}

const stegConfig: ISteg[] = [
    {
        component: Veiledning,
        key: 'veiledning',
        path: '/',
        stegIndeks: 0,
    },
    {
        component: KravTilSoker,
        key: 'start',
        path: '/start',
        stegIndeks: 1,
    },
    {
        component: MineBarnSide,
        key: 'mine-barn',
        path: '/mine-barn',
        stegIndeks: 2,
    },
    {
        component: FamilieforholdSide,
        key: 'familieforhold',
        path: '/familieforhold',
        stegIndeks: 3,
    },
    {
        component: BarnehageplassSide,
        key: 'barnehageplass',
        path: '/barnehageplass',
        stegIndeks: 4,
    },
    {
        component: ArbeidsforholdSide,
        key: 'arbeidsforhold',
        path: '/arbeidsforhold',
        stegIndeks: 5,
    },
    {
        component: OppsummeringSide,
        key: 'oppsummering',
        path: '/oppsummering',
        stegIndeks: 6,
    },
];

export { stegConfig, ISteg };
