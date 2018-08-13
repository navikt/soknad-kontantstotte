interface IPerson {
    barn: IBarn[];
}

interface IBarn {
    navn: string;
    fodselsdato: string;
}

export { IPerson, IBarn };
