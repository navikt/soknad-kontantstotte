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
    readonly arbeidIUtlandet: IArbeidIUtlandet;
    readonly barnehageplass: IBarnehageplass;
    readonly kravTilSoker: IKravTilSoker;
    readonly utenlandskeYtelser: IUtenlandskeYtelser;
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

interface IBarnehageplass {
    readonly harBarnehageplass: IFelt;
    readonly barnBarnehageplassStatus: IFelt;
    readonly harSluttetIBarnehageAntallTimer: IFelt;
    readonly harSluttetIBarnehageDato: IFelt;
    readonly harSluttetIBarnehageKommune: IFelt;
}

interface IKravTilSoker {
    readonly norskStatsborger: IFelt;
    readonly boddEllerJobbetINorgeSisteFemAar: IFelt;
    readonly borSammenMedBarnet: IFelt;
    readonly barnIkkeHjemme: IFelt;
    readonly ikkeAvtaltDeltBosted: IFelt;
    readonly skalBoMedBarnetINorgeNesteTolvMaaneder: IFelt;
}

interface IArbeidIUtlandet {
    readonly arbeiderIUtlandetEllerKontinentalsokkel: IFelt;
    readonly arbeiderIUtlandetEllerKontinentalsokkelForklaring: IFelt;
    readonly arbeiderAnnenForelderIUtlandet: IFelt;
    readonly arbeiderAnnenForelderIUtlandetForklaring: IFelt;
}

interface IUtenlandskeYtelser {
    readonly mottarYtelserFraUtland: IFelt;
    readonly mottarYtelserFraUtlandForklaring: IFelt;
    readonly mottarAnnenForelderYtelserFraUtland: IFelt;
    readonly mottarAnnenForelderYtelserFraUtlandForklaring: IFelt;
}

type minebarnFeltnavn = keyof IMineBarn;
type familieforholdFeltnavn = keyof IFamilieforhold;
type barnehageplassFeltnavn = keyof IBarnehageplass;
type kravTilSokerFeltnavn = keyof IKravTilSoker;
type utenlandskeYtelserFeltnavn = keyof IUtenlandskeYtelser;
type arbeidIUtlandetFeltnavn = keyof IArbeidIUtlandet;

type Stegnavn = keyof ISoknadState;
type Feltnavn =
    | minebarnFeltnavn
    | familieforholdFeltnavn
    | barnehageplassFeltnavn
    | kravTilSokerFeltnavn
    | arbeidIUtlandetFeltnavn
    | utenlandskeYtelserFeltnavn;

export {
    minebarnFeltnavn,
    familieforholdFeltnavn,
    arbeidIUtlandetFeltnavn,
    barnehageplassFeltnavn,
    kravTilSokerFeltnavn,
    utenlandskeYtelserFeltnavn,
    BarnehageplassVerdier,
    Stegnavn,
    Feltnavn,
    IArbeidIUtlandet,
    IBarnehageplass,
    IFamilieforhold,
    IKravTilSoker,
    IUtenlandskeYtelser,
    ISoknadState,
    Svar,
    IFelt,
    ValideringsStatus,
};
