import { Dokumentasjonsbehov, IDokumentasjon } from '../typer/dokumentasjon';
export declare const formaterFilstørrelse: (bytes: number, decimals?: number) => string;
export declare const genererInitiellDokumentasjon: (dokumentasjonsbehov: Dokumentasjonsbehov, tittelSpråkId: string, beskrivelseSpråkId: any) => IDokumentasjon;
export declare const erDokumentasjonRelevant: (dokumentasjon: IDokumentasjon) => number | true;
