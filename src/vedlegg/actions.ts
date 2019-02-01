import { Action } from 'redux';
import { Feltnavn, Stegnavn } from '../soknad/types';

enum VedleggTypeKeys {
    LAST_OPP = 'VEDLEGG_LAST_OPP',
    SLETT = 'VEDLEGG_SLETT',
}

interface IVedleggLastOpp extends Action {
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: VedleggTypeKeys.LAST_OPP;
    filer: File[];
}

interface IVedleggSlett extends Action {
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: VedleggTypeKeys.SLETT;
    filref: string;
}

function vedleggLastOpp(stegnavn: Stegnavn, feltnavn: Feltnavn, filer: File[]): IVedleggLastOpp {
    return {
        feltnavn,
        filer,
        stegnavn,
        type: VedleggTypeKeys.LAST_OPP,
    };
}

function vedleggSlett(stegnavn: Stegnavn, feltnavn: Feltnavn, filref: string): IVedleggSlett {
    return {
        feltnavn,
        filref,
        stegnavn,
        type: VedleggTypeKeys.SLETT,
    };
}

export { vedleggLastOpp, vedleggSlett, VedleggTypeKeys, IVedleggLastOpp, IVedleggSlett };
