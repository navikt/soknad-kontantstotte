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
    readonly navn: IFelt;
    readonly fodselsdato: IFelt;
}

interface IFamilieforhold {
    readonly borForeldreneSammenMedBarnet: IFelt;
    readonly erAvklartDeltBosted: IFelt;
    readonly annenForelderNavn: IFelt;
    readonly annenForelderFodselsnummer: IFelt;
    readonly annenForelderYrkesaktivINorgeEOSIMinstFemAar: IFelt;
}

interface IArbeidsforhold {
    readonly mottarYtelserFraUtlandet: IFelt;
    readonly mottarYtelserFraUtlandetForklaring: IFelt;
    readonly arbeiderIUtlandetEllerKontinentalsokkel: IFelt;
    readonly arbeiderIUtlandetEllerKontinentalsokkelForklaring: IFelt;
    readonly mottarKontantstotteFraAnnetEOS: IFelt;
    readonly mottarKontantstotteFraAnnetEOSForklaring: IFelt;
}

interface IBarnehageplass {
    readonly harBarnehageplass: IFelt;
    readonly dato: IFelt;
    readonly kommune: IFelt;
    readonly antallTimer: IFelt;
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
