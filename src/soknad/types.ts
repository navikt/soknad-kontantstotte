import { IBarn } from '../barn/types';

enum Svar {
    JA = 'JA',
    NEI = 'NEI',
    UBESVART = 'UBESVART'
}

enum BarnehageplassVerdier {
    Nei = 'Nei',
    NeiHarFaatt = 'NeiHarFaatt',
    Ja = 'Ja',
    JaSkalSlutte = 'JaSkalSlutte',
    Ubesvart = 'Ubesvart'
}

interface ISoknadState {
    readonly mineBarn: IMineBarn;
    readonly familieforhold: IFamilieforhold;
    readonly arbeidsforhold: IArbeidsforhold;
    readonly barnehageplass: IBarnehageplass;
    readonly kravTilSoker: IKravTilSoker;
}

interface IMineBarn {
    readonly valgtBarn: IBarn;
}

interface IFamilieforhold {
    readonly borForeldreneSammenMedBarnet: Svar;
    readonly erAvklartDeltBosted: Svar;
    readonly annenForelderNavn: string;
    readonly annenForelderFodselsnummer: string;
    readonly annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar;
}

interface IArbeidsforhold {
    readonly mottarYtelserFraUtlandet: Svar;
    readonly mottarYtelserFraUtlandetForklaring: string;
    readonly arbeiderIUtlandetEllerKontinentalsokkel: Svar;
    readonly arbeiderIUtlandetEllerKontinentalsokkelForklaring: string;
    readonly mottarKontantstotteFraAnnetEOS: Svar;
    readonly mottarKontantstotteFraAnnetEOSForklaring: string;
}

interface IBarnehageplass {
    readonly harBarnehageplass: BarnehageplassVerdier;
    readonly dato: string;
    readonly kommune: string;
    readonly antallTimer: string;
}

interface IKravTilSoker {
    readonly boddINorgeSisteFemAar: Svar;
    readonly borSammenMedBarnet: Svar;
    readonly skalBoMedBarnetINorgeNesteTolvMaaneder: Svar;
}

type Bolk = keyof ISoknadState;
type Felt =
    | keyof IMineBarn
    | keyof IFamilieforhold
    | keyof IArbeidsforhold
    | keyof IBarnehageplass
    | keyof IKravTilSoker;

export {
    BarnehageplassVerdier,
    Bolk,
    Felt,
    IArbeidsforhold,
    IBarnehageplass,
    IFamilieforhold,
    IKravTilSoker,
    ISoknadState,
    Svar,
};
