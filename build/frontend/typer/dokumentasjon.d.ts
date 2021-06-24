export declare enum Dokumentasjonsbehov {
    AVTALE_DELT_BOSTED = "AVTALE_DELT_BOSTED",
    VEDTAK_OPPHOLDSTILLATELSE = "VEDTAK_OPPHOLDSTILLATELSE",
    ADOPSJON_DATO = "ADOPSJON_DATO",
    BEKREFTELSE_FRA_BARNEVERN = "BEKREFTELSE_FRA_BARNEVERN",
    BOR_FAST_MED_SØKER = "BOR_FAST_MED_S\u00D8KER",
    ANNEN_DOKUMENTASJON = "ANNEN_DOKUMENTASJON"
}
export interface IVedlegg {
    dokumentId: string;
    navn: string;
    størrelse: number;
    tidspunkt: string;
}
export interface IDokumentasjon {
    dokumentasjonsbehov: Dokumentasjonsbehov;
    gjelderForBarnId: string[];
    gjelderForSøker: boolean;
    harSendtInn: boolean;
    opplastedeVedlegg: IVedlegg[];
    tittelSpråkId: string;
    beskrivelseSpråkId: string;
}
export interface ISøknadKontraktVedlegg {
    dokumentId: string;
    navn: string;
    tittel: Dokumentasjonsbehov;
}
export interface ISøknadKontraktDokumentasjon {
    dokumentasjonsbehov: Dokumentasjonsbehov;
    harSendtInn: boolean;
    opplastedeVedlegg: ISøknadKontraktVedlegg[];
}
export declare enum EFiltyper {
    PDF = "application/pdf",
    PNG = "image/png",
    JPG = "image/jpg",
    JPEG = "image/jpeg"
}
