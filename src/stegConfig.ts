import * as React from 'react';
import ArbeidsforholdSide from './sider/arbeidsforhold/Arbeidsforhold';
import BarnehageplassSide from './sider/barnehageplass/Barnehageplass';
import FamilieforholdSide from './sider/familieforhold/Familieforhold';
import KravTilSoker from './sider/krav-til-soker/KravTilSoker';
import Kvittering from './sider/kvittering/Kvittering';
import MineBarnSide from './sider/mine-barn/MineBarn';
import OppsummeringSide from './sider/oppsummering/Oppsummering';
import Veiledning from './sider/veiledning/Veiledning';
import { Stegnavn } from './soknad/types';

interface IStegConfig {
    veiledning: ISteg;
    kravTilSoker: ISteg;
    mineBarn: ISteg;
    familieforhold: ISteg;
    barnehageplass: ISteg;
    arbeidsforhold: ISteg;
    oppsummering: ISteg;
    kvittering: ISteg;
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
    familieforhold: {
        component: FamilieforholdSide,
        key: 'familieforhold',
        path: '/familieforhold',
        stegIndeks: 3,
    },
    barnehageplass: {
        component: BarnehageplassSide,
        key: 'barnehageplass',
        path: '/barnehageplass',
        stegIndeks: 4,
    },
    arbeidsforhold: {
        component: ArbeidsforholdSide,
        key: 'arbeidsforhold',
        path: '/arbeidsforhold',
        stegIndeks: 5,
    },
    oppsummering: {
        component: OppsummeringSide,
        key: 'oppsummering',
        path: '/oppsummering',
        stegIndeks: 6,
    },
    kvittering: {
        component: Kvittering,
        key: 'kvittering',
        path: '/kvittering',
        stegIndeks: 7,
    },
};
/* tslint:enable:object-literal-sort-keys */

export { stegConfig, ISteg };
