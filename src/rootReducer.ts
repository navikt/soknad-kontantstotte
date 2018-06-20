import { combineReducers } from 'redux';
import { IFaktumState } from 'soknad-frontend/lib/faktum-container';
import { faktumReducer } from './faktum/reducer';

export interface IRootState {
    faktum?: IFaktumState;
}

const rootReducer = combineReducers({
    faktum: faktumReducer,
});

export { rootReducer };
