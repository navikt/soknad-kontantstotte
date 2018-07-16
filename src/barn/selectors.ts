import { IRootState } from '../rootReducer';

function selectBarn(state: IRootState) {
    return state.barn.barn;
}

export {
    selectBarn
};
