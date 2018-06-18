import BarnehageplassSide from '../barnehageplass/BarnehageplassSide';
import OppfyllerIkkeVilkaarSide from '../feilsider/OppfyllerIkkeVilkaarSide';
import SidenFinnesIkkeSide from '../feilsider/SidenFinnesIkkeSide';
import KvitteringSide from '../kvittering/KvitteringSide';
import MineBarnSide from '../mine_barn/MineBarnSide';
import OmsorgssituasjonSide from '../omsorgssituasjon/OmsorgssituasjonSide';
import OppsummeringSide from '../oppsummering/OppsummeringSide';
import StartSide from '../start/StartSide';
import UtenlandskForbindelseSide from '../utenlandsk_forbindelse/UtenlandskForbindelseSide';
import VeiledningSide from '../veiledning/VeiledningSide';

export enum SideType {
    SKJEMASIDE = 'SKJEMASIDE',
    ANNEN_INFOSIDE = 'ANNEN_INFOSIDE'
}

export interface ISide {
    key: string;
    path: string;
    stegIndeks: number;
    sideKomponent: () => JSX.Element;
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
