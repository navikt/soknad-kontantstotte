import { IRootState } from '../rootReducer';

function selectLand(state: IRootState) {
    return state.land.land;
}

function selectValgtSprak(state: IRootState) {
    return state.land.valgtSprak;
}

export { selectLand, selectValgtSprak };
