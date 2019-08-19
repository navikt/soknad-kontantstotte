interface IBarn {
    barn: IBarnDTO[];
    erFlerling: boolean;
    index: number;
}

interface IBarnDTO {
    fødselsnummer: string;
    fødselsdato: string;
    fulltnavn: string;
}

export { IBarn, IBarnDTO };
