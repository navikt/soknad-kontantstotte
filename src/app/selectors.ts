import { IRootState } from '../rootReducer';

function selectAppStatus(state: IRootState) {
    return state.app.status;
}

export {
    selectAppStatus
};
