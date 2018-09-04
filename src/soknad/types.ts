enum Svar {
    JA = 'JA',
    NEI = 'NEI',
    UBESVART = 'UBESVART',
}

enum BarnehageplassVerdier {
    Nei = 'Nei',
    NeiHarFaatt = 'NeiHarFaatt',
    Ja = 'Ja',
    JaSkalSlutte = 'JaSkalSlutte',
    Ubesvart = 'Ubesvart',
}

enum ValideringsStatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

interface IFelt {
    verdi: Svar | BarnehageplassVerdier | string;
    valideringsStatus: ValideringsStatus;
    feilmeldingsNokkel: string;
}

interface ISoknadState {
    readonly mineBarn: IMineBarn;
    readonly familieforhold: IFamilieforhold;
    readonly arbeidsforhold: IArbeidsforhold;
    readonly barnehageplass: IBarnehageplass;
    readonly kravTilSoker: IKravTilSoker;
}

interface IMineBarn {
    readonly navn: string;
    readonly fodselsdato: string;
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
    readonly norskStatsborger: IFelt;
    readonly boddEllerJobbetINorgeSisteFemAar: IFelt;
    readonly borSammenMedBarnet: IFelt;
    readonly barnIkkeHjemme: IFelt;
    readonly ikkeAvtaltDeltBosted: IFelt;
    readonly skalBoMedBarnetINorgeNesteTolvMaaneder: IFelt;
}

type Stegnavn = keyof ISoknadState;
type Feltnavn =
    | keyof IMineBarn
    | keyof IFamilieforhold
    | keyof IArbeidsforhold
    | keyof IBarnehageplass
    | keyof IKravTilSoker;

export {
    BarnehageplassVerdier,
    Stegnavn,
    Feltnavn,
    IArbeidsforhold,
    IBarnehageplass,
    IFamilieforhold,
    IKravTilSoker,
    ISoknadState,
    Svar,
    IFelt,
    ValideringsStatus,
};
