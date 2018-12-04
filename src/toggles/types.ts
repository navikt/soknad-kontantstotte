interface IToggles {
    [name: string]: boolean;
}

enum IToggleName {
    vis_advarsel_oppsummering = 'kontantstotte.oppsummering.advarsel',
    vis_advarsel_tilknytningTilUtland = 'kontantstotte.tilknytningTilUtland.advarsel',
    vis_innsendt_dato_kvittering = 'kontantstotte.kvittering.innsendtDato',
    bruk_tps_mineBarn = 'kontantstotte.bruk.tps.integrasjon.barn',
}

const allTogglesOff = (): IToggles => {
    return Object.values(IToggleName).reduce((previousValue, currentValue) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};

export { IToggleName, IToggles, allTogglesOff };
