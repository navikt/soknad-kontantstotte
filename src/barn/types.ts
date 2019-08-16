interface IBarn {
    barn: IBarnDTO[];
    erFlerling: boolean;
    index: number;
}

interface IBarnDTO {
    fødselsdato: string;
    fulltnavn: string;
}

export { IBarn, IBarnDTO };
