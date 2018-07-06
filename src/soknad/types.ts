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
    barn: IBarn;
    familieforhold: IFamilieforhold;
    arbeidsforhold: IArbeidsforhold;
    barnehageplass: IBarnehageplass;
    kravTilSoker: IKravTilSoker;
    annenForelderNavn?: string;
    annenForelderPersonnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar?: Svar;
}

interface IFamilieforhold {
    borForeldreneSammenMedBarnet: Svar;
    erAvklartDeltBosted: Svar;
    annenForelderNavn?: string;
    annenForelderFodselsnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar;
}

interface IArbeidsforhold {
    mottarYtelserFraUtlandet: Svar;
    mottarYtelserFraUtlandetForklaring?: string;
    arbeiderIUtlandetEllerKontinentalsokkel: Svar;
    arbeiderIUtlandetEllerKontinentalsokkelForklaring?: string;
    mottarKontantstotteFraAnnetEOS: Svar;
    mottarKontantstotteFraAnnetEOSForklaring?: string;
}

interface IBarnehageplass {
    harBarnehageplass: BarnehageplassVerdier;
    neiHarFaattPlassFraDato?: string;
    neiHarFaattPlassKommune?: string;
    fraDato?: string;
    kommune?: string;
    antallTimer?: string;
}

interface IKravTilSoker {
    boddINorgeSisteFemAar: Svar;
    borSammenMedBarnet: Svar;
    skalBoMedBarnetINorgeNesteTolvMaaneder: Svar;
}

export {
    ISoknadState,
    IFamilieforhold,
    Svar,
    IArbeidsforhold,
    IBarnehageplass,
    BarnehageplassVerdier,
    IKravTilSoker,
};
