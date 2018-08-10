import { IRootState } from '../rootReducer';

function selectBarn(state: IRootState) {
    return state.person.person.barn;
}

export { selectBarn };
