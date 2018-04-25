import { combineReducers } from 'redux';
import { faktumReducer, IFaktumState } from './faktum/reducer';

export interface IRootState {
    faktum: IFaktumState;
}

const rootReducer = combineReducers({
    faktum: faktumReducer
});

export { rootReducer };
