interface IToggles {
    [name: string]: boolean;
}

enum IToggleName {
    vis_oppsummering_advarsel = 'kontantstotte.oppsummering.advarsel',
    vis_advarsel_tilknytningTilUtland = 'kontantstotte.tilknytningTilUtland.advarsel',
    vis_innsendt_dato_kvittering = 'kontantstotte.kvittering.innsendtDato',
}

const allTogglesOff = (): IToggles => {
    return Object.values(IToggleName).reduce((previousValue, currentValue) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};

export { IToggleName, IToggles, allTogglesOff };
