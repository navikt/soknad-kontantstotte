interface IToggles {
    [name: string]: boolean;
}

enum IToggleName {
    vis_advarsel = 'kontantstotte.barnehageplass.advarsel',
    vis_oppsummering_advarsel = 'kontantstotte.oppsummering.advarsel',
    vis_advarsel_tilknytningTilUtland = 'kontantstotte.tilknytningTilUtland.advarsel',
}

const allTogglesOff = (): IToggles => {
    return Object.values(IToggleName).reduce((previousValue, currentValue) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};

export { IToggleName, IToggles, allTogglesOff };
