import { Alpha3Code } from 'i18n-iso-countries';
import { ESvar, ISODateString } from '@navikt/familie-form-elements';
import { ISøknadSpørsmål } from './søknad';
export declare enum ESivilstand {
    GIFT = "GIFT",
    ENKE_ELLER_ENKEMANN = "ENKE_ELLER_ENKEMANN",
    SKILT = "SKILT",
    SEPARERT = "SEPARERT",
    REGISTRERT_PARTNER = "REGISTRERT_PARTNER",
    SEPARERT_PARTNER = "SEPARERT_PARTNER",
    SKILT_PARTNER = "SKILT_PARTNER",
    GJENLEVENDE_PARTNER = "GJENLEVENDE_PARTNER",
    UGIFT = "UGIFT",
    UOPPGITT = "UOPPGITT"
}
export interface IPerson {
    ident: string;
    navn: string;
    adressebeskyttelse: boolean;
}
export interface ISøkerRespons extends IPerson {
    barn: IBarnRespons[];
    statsborgerskap: {
        landkode: Alpha3Code;
    }[];
    adresse?: IAdresse;
    sivilstand: {
        type: ESivilstand;
    };
}
export interface ISøker extends ISøkerRespons {
    telefonnummer: ISøknadSpørsmål<string>;
    borPåRegistrertAdresse: ISøknadSpørsmål<ESvar | undefined>;
    oppholderSegINorge: ISøknadSpørsmål<ESvar | undefined>;
    oppholdsland: ISøknadSpørsmål<Alpha3Code | ''>;
    oppholdslandDato: ISøknadSpørsmål<ISODateString>;
    værtINorgeITolvMåneder: ISøknadSpørsmål<ESvar | undefined>;
    komTilNorgeDato: ISøknadSpørsmål<ISODateString>;
    planleggerÅBoINorgeTolvMnd: ISøknadSpørsmål<ESvar | undefined>;
    erAsylsøker: ISøknadSpørsmål<ESvar | undefined>;
    jobberPåBåt: ISøknadSpørsmål<ESvar | undefined>;
    arbeidsland: ISøknadSpørsmål<Alpha3Code | ''>;
    mottarUtenlandspensjon: ISøknadSpørsmål<ESvar | undefined>;
    pensjonsland: ISøknadSpørsmål<Alpha3Code | ''>;
}
export interface IAdresse {
    adressenavn?: string;
    postnummer?: string;
    husbokstav?: string;
    bruksenhetsnummer?: string;
    husnummer?: string;
    poststed?: string;
}
export declare enum barnDataKeySpørsmål {
    erFosterbarn = "erFosterbarn",
    erAdoptertFraUtland = "erAdoptertFraUtland",
    erAsylsøker = "erAsyls\u00F8ker",
    barnetrygdFraAnnetEøsland = "barnetrygdFraAnnetE\u00F8sland",
    barnetrygdFraEøslandHvilketLand = "barnetrygdFraE\u00F8slandHvilketLand",
    oppholderSegIInstitusjon = "oppholderSegIInstitusjon",
    institusjonsnavn = "institusjonsnavn",
    institusjonsadresse = "institusjonsadresse",
    institusjonspostnummer = "institusjonspostnummer",
    institusjonOppholdStartdato = "institusjonOppholdStartdato",
    institusjonOppholdSluttdato = "institusjonOppholdSluttdato",
    oppholderSegIUtland = "oppholderSegIUtland",
    oppholdsland = "oppholdsland",
    oppholdslandStartdato = "oppholdslandStartdato",
    oppholdslandSluttdato = "oppholdslandSluttdato",
    boddMindreEnn12MndINorge = "boddMindreEnn12MndINorge",
    nårKomBarnTilNorgeDato = "n\u00E5rKomBarnTilNorgeDato",
    planleggerÅBoINorge12Mnd = "planlegger\u00C5BoINorge12Mnd",
    andreForelderNavn = "andreForelderNavn",
    andreForelderFnr = "andreForelderFnr",
    andreForelderFødselsdato = "andreForelderF\u00F8dselsdato",
    andreForelderArbeidUtlandet = "andreForelderArbeidUtlandet",
    andreForelderArbeidUtlandetHvilketLand = "andreForelderArbeidUtlandetHvilketLand",
    andreForelderPensjonUtland = "andreForelderPensjonUtland",
    andreForelderPensjonHvilketLand = "andreForelderPensjonHvilketLand",
    borFastMedSøker = "borFastMedS\u00F8ker",
    skriftligAvtaleOmDeltBosted = "skriftligAvtaleOmDeltBosted",
    søkerForTidsromStartdato = "s\u00F8kerForTidsromStartdato",
    søkerForTidsromSluttdato = "s\u00F8kerForTidsromSluttdato"
}
export interface IBarnRespons extends IPerson {
    borMedSøker: boolean;
    fødselsdato: string | undefined;
}
export interface IBarn extends IPerson {
    borMedSøker: boolean | undefined;
    alder: string | undefined;
}
export declare enum AlternativtSvarForInput {
    UKJENT = "UKJENT"
}
export declare type DatoMedUkjent = ISODateString | AlternativtSvarForInput.UKJENT;
export interface IBarnMedISøknad extends IBarn {
    id: string;
    [barnDataKeySpørsmål.erFosterbarn]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.erAdoptertFraUtland]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.barnetrygdFraAnnetEøsland]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.erAsylsøker]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.oppholderSegIUtland]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.oppholdsland]: ISøknadSpørsmål<Alpha3Code | ''>;
    [barnDataKeySpørsmål.oppholdslandStartdato]: ISøknadSpørsmål<ISODateString>;
    [barnDataKeySpørsmål.oppholdslandSluttdato]: ISøknadSpørsmål<ISODateString>;
    [barnDataKeySpørsmål.oppholderSegIInstitusjon]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.institusjonsnavn]: ISøknadSpørsmål<string>;
    [barnDataKeySpørsmål.institusjonsadresse]: ISøknadSpørsmål<string>;
    [barnDataKeySpørsmål.institusjonspostnummer]: ISøknadSpørsmål<string>;
    [barnDataKeySpørsmål.institusjonOppholdStartdato]: ISøknadSpørsmål<ISODateString>;
    [barnDataKeySpørsmål.institusjonOppholdSluttdato]: ISøknadSpørsmål<DatoMedUkjent>;
    [barnDataKeySpørsmål.boddMindreEnn12MndINorge]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.nårKomBarnTilNorgeDato]: ISøknadSpørsmål<ISODateString>;
    [barnDataKeySpørsmål.planleggerÅBoINorge12Mnd]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.barnetrygdFraEøslandHvilketLand]: ISøknadSpørsmål<Alpha3Code | ''>;
    [barnDataKeySpørsmål.andreForelderNavn]: ISøknadSpørsmål<string | AlternativtSvarForInput.UKJENT>;
    [barnDataKeySpørsmål.andreForelderFnr]: ISøknadSpørsmål<string | AlternativtSvarForInput.UKJENT>;
    [barnDataKeySpørsmål.andreForelderFødselsdato]: ISøknadSpørsmål<DatoMedUkjent>;
    [barnDataKeySpørsmål.andreForelderArbeidUtlandet]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.andreForelderArbeidUtlandetHvilketLand]: ISøknadSpørsmål<Alpha3Code | ''>;
    [barnDataKeySpørsmål.andreForelderPensjonUtland]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.andreForelderPensjonHvilketLand]: ISøknadSpørsmål<Alpha3Code | ''>;
    [barnDataKeySpørsmål.borFastMedSøker]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.skriftligAvtaleOmDeltBosted]: ISøknadSpørsmål<ESvar | undefined>;
    [barnDataKeySpørsmål.søkerForTidsromStartdato]: ISøknadSpørsmål<DatoMedUkjent>;
    [barnDataKeySpørsmål.søkerForTidsromSluttdato]: ISøknadSpørsmål<DatoMedUkjent>;
}
