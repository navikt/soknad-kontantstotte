interface IToggles {
    [name: string]: boolean;
}

enum IToggleName {
    legg_til_barn = 'kontantstotte.leggtilbarn',
    vedlikeholdsmodus = 'kontantstotte.vedlikehold',
}

const allTogglesOff = (): IToggles => {
    return Object.values(IToggleName).reduce((previousValue, currentValue) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};

export { IToggleName, IToggles, allTogglesOff };
