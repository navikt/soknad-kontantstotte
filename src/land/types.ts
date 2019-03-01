interface ILandTekster {
    [language: string]: ILand;
}

interface ILand {
    [key: string]: string;
}

export { ILandTekster, ILand };
