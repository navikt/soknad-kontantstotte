interface IToggles {
    [name: string]: boolean;
}

enum IToggleName {
    legg_til_barn = 'kontantstotte.leggtilbarn',
    vis_sprakvalg = 'kontantstotte.sprakvalg',
    vis_statsborgerskap = 'kontantstotte.visStatsborgerskap',
}

const allTogglesOff = (): IToggles => {
    return Object.values(IToggleName).reduce((previousValue, currentValue) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};

export { IToggleName, IToggles, allTogglesOff };
