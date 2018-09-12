import { IRootState } from '../rootReducer';

function selectAppStatus(state: IRootState) {
    return state.app.status;
}

function selectAppSteg(state: IRootState) {
    return state.app.steg;
}

function selectHarForsoktNesteSteg(state: IRootState) {
    return state.app.harForsoktNesteSteg;
}

export { selectAppStatus, selectAppSteg, selectHarForsoktNesteSteg };
