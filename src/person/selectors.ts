import { IRootState } from '../rootReducer';

function selectBarn(state: IRootState) {
    return state.person.person.barn;
}

function selectPersonNavn(state: IRootState) {
    return state.person.person.navn;
}

export { selectBarn, selectPersonNavn };
