import { IRootState } from '../rootReducer';
import { IBarn } from './types';

function selectBarn(state: IRootState): IBarn[] {
    return state.barn.barn;
}

function selectIndeksForValgtBarn(state: IRootState) {
    return state.barn.indeksForValgtBarn;
}

export { selectBarn, selectIndeksForValgtBarn };
