import { ESvar } from '@navikt/familie-form-elements';
import { OmBarnaDineSpørsmålId } from '../components/SøknadsSteg/OmBarnaDine/spørsmål';
import { OmBarnetSpørsmålsId } from '../components/SøknadsSteg/OmBarnet/spørsmål';
import { OmDegSpørsmålId } from '../components/SøknadsSteg/OmDeg/spørsmål';
import { INøkkelPar } from './common';
import { IDokumentasjon, ISøknadKontraktDokumentasjon } from './dokumentasjon';
import { ESivilstand, IAdresse, IBarn, IBarnMedISøknad, ISøker } from './person';
export declare enum ESøknadstype {
    ORDINÆR = "ORDIN\u00C6R",
    UTVIDET = "UTVIDET"
}
export declare const søknadstyper: INøkkelPar;
export interface ISøknadsfelt<T> {
    label: string;
    verdi: T;
}
export interface ISøknad {
    søknadstype: ESøknadstype;
    søker: ISøker;
    lestOgForståttBekreftelse: boolean;
    barnInkludertISøknaden: IBarnMedISøknad[];
    barnRegistrertManuelt: IBarn[];
    erNoenAvBarnaFosterbarn: ISøknadSpørsmål<ESvar | undefined>;
    oppholderBarnSegIInstitusjon: ISøknadSpørsmål<ESvar | undefined>;
    erBarnAdoptertFraUtland: ISøknadSpørsmål<ESvar | undefined>;
    oppholderBarnSegIUtland: ISøknadSpørsmål<ESvar | undefined>;
    søktAsylForBarn: ISøknadSpørsmål<ESvar | undefined>;
    barnOppholdtSegTolvMndSammenhengendeINorge: ISøknadSpørsmål<ESvar | undefined>;
    mottarBarnetrygdForBarnFraAnnetEøsland: ISøknadSpørsmål<ESvar | undefined>;
    dokumentasjon: IDokumentasjon[];
}
export interface ISøknadSpørsmål<T> {
    id: OmDegSpørsmålId | OmBarnaDineSpørsmålId | OmBarnetSpørsmålsId;
    svar: T;
}
export declare type SpørsmålMap = Record<string, ISøknadsfelt<any>>;
export interface ISøknadKontrakt {
    søknadstype: ESøknadstype;
    søker: ISøknadKontraktSøker;
    barn: ISøknadKontraktBarn[];
    spørsmål: SpørsmålMap;
    dokumentasjon: ISøknadKontraktDokumentasjon[];
}
export interface ISøknadKontraktSøker {
    ident: ISøknadsfelt<string>;
    navn: ISøknadsfelt<string>;
    statsborgerskap: ISøknadsfelt<string[]>;
    adresse: ISøknadsfelt<IAdresse>;
    sivilstand: ISøknadsfelt<ESivilstand>;
    telefonnummer: ISøknadsfelt<string>;
    spørsmål: SpørsmålMap;
}
export interface ISøknadKontraktBarn {
    ident: ISøknadsfelt<string>;
    navn: ISøknadsfelt<string>;
    borMedSøker: ISøknadsfelt<boolean>;
    alder: ISøknadsfelt<string>;
    spørsmål: SpørsmålMap;
}
export declare const initialStateSøknad: ISøknad;
