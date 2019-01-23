interface IToggles {
    [name: string]: boolean;
}

enum IToggleName {
    vis_innsendt_dato_kvittering = 'kontantstotte.kvittering.innsendtDato',
    legg_til_barn = 'kontantstotte.leggtilbarn',
}

const allTogglesOff = (): IToggles => {
    return Object.values(IToggleName).reduce((previousValue, currentValue) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};

export { IToggleName, IToggles, allTogglesOff };
