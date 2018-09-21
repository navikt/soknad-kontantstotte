enum Svar {
    JA = 'JA',
    NEI = 'NEI',
    UBESVART = 'UBESVART',
}

enum BarnehageplassVerdier {
    garIkkeIBarnehage = 'garIkkeIBarnehage',
    harBarnehageplass = 'harBarnehageplass',
    harSluttetIBarnehage = 'harSluttetIBarnehage',
    skalBegynneIBarnehage = 'skalBegynneIBarnehage',
    skalSlutteIBarnehage = 'skalSlutteIBarnehage',
    Ubesvart = 'Ubesvart',
}

enum TilknytningTilUtlandVerdier {
    jaINorge = 'jaINorge',
    jaIEOS = 'jaIEOS',
    jaLeggerSammenPerioderEOS = 'jaLeggerSammenPerioderEOS',
    nei = 'nei',
    Ubesvart = 'Ubesvart',
}

enum ValideringsStatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

interface IFelt {
    verdi: Svar | BarnehageplassVerdier | TilknytningTilUtlandVerdier | string;
    valideringsStatus: ValideringsStatus;
    feilmeldingsNokkel: string;
}

interface ISoknadState {
    readonly mineBarn: IMineBarn;
    readonly familieforhold: IFamilieforhold;
    readonly arbeidsforhold: IArbeidsforhold;
    readonly barnehageplass: IBarnehageplass;
    readonly kravTilSoker: IKravTilSoker;
    readonly utenlandskeYtelser: IUtenlandskeYtelser;
    readonly tilknytningTilUtland: ITilknytningTilUtland;
}

interface IMineBarn {
    readonly navn: IFelt;
    readonly fodselsdato: IFelt;
}

interface IFamilieforhold {
    readonly borForeldreneSammenMedBarnet: IFelt;
    readonly annenForelderNavn: IFelt;
    readonly annenForelderFodselsnummer: IFelt;
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
    readonly barnBarnehageplassStatus: IFelt;
    readonly harSluttetIBarnehageAntallTimer: IFelt;
    readonly harSluttetIBarnehageDato: IFelt;
    readonly harSluttetIBarnehageKommune: IFelt;
    readonly harBarnehageplassAntallTimer: IFelt;
    readonly harBarnehageplassDato: IFelt;
    readonly harBarnehageplassKommune: IFelt;
}

interface IKravTilSoker {
    readonly norskStatsborger: IFelt;
    readonly boddEllerJobbetINorgeSisteFemAar: IFelt;
    readonly borSammenMedBarnet: IFelt;
    readonly barnIkkeHjemme: IFelt;
    readonly ikkeAvtaltDeltBosted: IFelt;
    readonly skalBoMedBarnetINorgeNesteTolvMaaneder: IFelt;
}

interface IUtenlandskeYtelser {
    readonly mottarYtelserFraUtland: IFelt;
    readonly mottarYtelserFraUtlandForklaring: IFelt;
    readonly mottarAnnenForelderYtelserFraUtland: IFelt;
    readonly mottarAnnenForelderYtelserFraUtlandForklaring: IFelt;
}

interface ITilknytningTilUtland {
    readonly boddEllerJobbetINorgeMinstFemAar: IFelt;
    readonly boddEllerJobbetINorgeMinstFemAarForklaring: IFelt;
    readonly annenForelderBoddEllerJobbetINorgeMinstFemAar: IFelt;
    readonly annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: IFelt;
}

type minebarnFeltnavn = keyof IMineBarn;
type familieforholdFeltnavn = keyof IFamilieforhold;
type arbeidsforholdFeltnavn = keyof IArbeidsforhold;
type barnehageplassFeltnavn = keyof IBarnehageplass;
type kravTilSokerFeltnavn = keyof IKravTilSoker;
type utenlandskeYtelserFeltnavn = keyof IUtenlandskeYtelser;
type tilknytningTilUtlandFeltnavn = keyof ITilknytningTilUtland;

type Stegnavn = keyof ISoknadState;
type Feltnavn =
    | minebarnFeltnavn
    | familieforholdFeltnavn
    | arbeidsforholdFeltnavn
    | barnehageplassFeltnavn
    | kravTilSokerFeltnavn
    | utenlandskeYtelserFeltnavn
    | tilknytningTilUtlandFeltnavn;

export {
    minebarnFeltnavn,
    familieforholdFeltnavn,
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    kravTilSokerFeltnavn,
    utenlandskeYtelserFeltnavn,
    tilknytningTilUtlandFeltnavn,
    BarnehageplassVerdier,
    TilknytningTilUtlandVerdier,
    Stegnavn,
    Feltnavn,
    IArbeidsforhold,
    IBarnehageplass,
    IFamilieforhold,
    IKravTilSoker,
    IUtenlandskeYtelser,
    ITilknytningTilUtland,
    ISoknadState,
    Svar,
    IFelt,
    ValideringsStatus,
};
