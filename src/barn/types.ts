interface IBarnContainer {
    barn: IBarn[];
    erFlerling: boolean;
    index: number;
}

interface IBarn {
    fodselsdato: string;
    fulltnavn: string;
}

export { IBarnContainer, IBarn };
