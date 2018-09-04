import { IFelt } from '../soknad/types';

interface IPerson {
    navn: string;
    barn: IBarn[];
}

interface IBarn {
    navn: IFelt;
    fodselsdato: IFelt;
}

export { IPerson, IBarn };
