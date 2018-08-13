import { Action } from 'redux';
import { IPerson } from './types';

enum PersonTypeKeys {
    HENT = 'PERSON_HENT',
    HENT_OK = 'PERSON_HENT_OK',
    HENT_FEILET = 'PERSON_HENT_FEILET',
}

type PersonActionTypes = IPersonHent | IPersonHentOk | IPersonHentFeilet;

interface IPersonHent extends Action {
    type: PersonTypeKeys.HENT;
}

interface IPersonHentOk extends Action {
    type: PersonTypeKeys.HENT_OK;
    person: IPerson;
}

interface IPersonHentFeilet extends Action {
    type: PersonTypeKeys.HENT_FEILET;
}

function personHent(): IPersonHent {
    return {
        type: PersonTypeKeys.HENT,
    };
}

function personHentOk(person: IPerson): IPersonHentOk {
    return {
        person,
        type: PersonTypeKeys.HENT_OK,
    };
}

function personHentFeilet(): IPersonHentFeilet {
    return {
        type: PersonTypeKeys.HENT_FEILET,
    };
}

export { PersonActionTypes, personHent, personHentFeilet, personHentOk, PersonTypeKeys };
