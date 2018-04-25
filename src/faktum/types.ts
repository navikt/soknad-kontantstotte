type FaktumType = 'SYSTEMREGISTRERT' | 'BRUKERREGISTRERT';

interface IFaktum {
    faktumEgenskaper: any[];
    faktumId: number;
    key: string;
    parrentFaktum: null; // Burde dette referere til en faktumId?
    properties: object;
    soknadId: number;
    type: FaktumType;
    value: any;
}

export {
    IFaktum,
};
