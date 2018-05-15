import { Action } from 'redux';
import { IFaktum } from 'soknad-frontend/lib/faktum-container';

enum FaktumTypeKeys {
    FAKTUM_HENT = 'FAKTUM_HENT',
    FAKTUM_HENT_OK = 'FAKTUM_HENT_OK',
    FAKTUM_HENT_FEILET = 'FAKTUM_HENT_FEILET',
    FAKTUM_OPPDATER_VERDI = 'FAKTUM_OPPDATER_VERDI',
}

type FaktumActionTypes =
    | IFaktumHent
    | IFaktumHentet
    | IFaktumHentFeilet
    | IFaktumOppdaterVerdi
    ;

interface IFaktumHent extends Action {
    type: FaktumTypeKeys.FAKTUM_HENT;
}

interface IFaktumHentet extends Action {
    type: FaktumTypeKeys.FAKTUM_HENT_OK;
    fakta: IFaktum[];
}

interface IFaktumHentFeilet extends Action {
    type: FaktumTypeKeys.FAKTUM_HENT_FEILET;
}

interface IFaktumOppdaterVerdi extends Action {
    type: FaktumTypeKeys.FAKTUM_OPPDATER_VERDI;
    faktum: IFaktum;
}

function faktumHent(): IFaktumHent {
    return {
        type: FaktumTypeKeys.FAKTUM_HENT,
    };
}

function faktumHentOk( fakta: IFaktum[] ): IFaktumHentet {
    return {
        fakta,
        type: FaktumTypeKeys.FAKTUM_HENT_OK,
    };
}

function faktumHentFeilet(): IFaktumHentFeilet {
    return {
        type: FaktumTypeKeys.FAKTUM_HENT_FEILET,
    };
}

function faktumOppdaterVerdi( faktum: IFaktum, value: string ): IFaktumOppdaterVerdi {
    const oppdatertFaktum = {
        ...faktum,
        value,
    };
    return {
        faktum: oppdatertFaktum,
        type: FaktumTypeKeys.FAKTUM_OPPDATER_VERDI,
    };
}

export {
    FaktumTypeKeys,
    FaktumActionTypes,
    IFaktumHent,
    IFaktumOppdaterVerdi,
    faktumHent,
    faktumHentOk,
    faktumHentFeilet,
    faktumOppdaterVerdi,
};
