import { IRootState } from '../rootReducer';

function selectTekster(state: IRootState) {
    return state.tekster.tekster;
}

function selectValgtSprak(state: IRootState) {
    return state.tekster.valgtSprak;
}

export { selectTekster, selectValgtSprak };
