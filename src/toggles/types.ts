interface IToggles {
    [name: string]: boolean;
}

enum IToggleName {
    vis_innlogget_bruker = 'kontantstotte.soker.fnr',
}

const allTogglesOff = (): IToggles => {
    return Object.values(IToggleName).reduce((previousValue, currentValue) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};

export { IToggleName, IToggles, allTogglesOff };
