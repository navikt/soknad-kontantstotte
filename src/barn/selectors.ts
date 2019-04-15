import { IRootState } from '../rootReducer';
import { IBarnContainer } from './types';

function selectBarn(state: IRootState): IBarnContainer[] {
    return state.barn.barn;
}

export { selectBarn };
