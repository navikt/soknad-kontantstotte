import { IRootState } from '../rootReducer';

function selectBarn(state: IRootState) {
    return state.person.person.barn;
}

function selectPerson(state: IRootState) {
    return state.person.person;
}

export { selectBarn, selectPerson };
