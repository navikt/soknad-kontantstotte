import { IRootState } from '../rootReducer';
import { IFaktum } from './types';

function selectFakta(state: IRootState) {
    return state.faktum.fakta;
}

function selectFaktumByKey(state: IRootState, key: string): IFaktum | undefined {
    return selectFakta( state ).find( ( f ) => f.key === key );
}

export {
    selectFakta,
    selectFaktumByKey,
};