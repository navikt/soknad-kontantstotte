import { combineReducers } from 'redux';
import { IFaktumState } from 'soknad-frontend/lib/faktum-container';
import { faktumReducer } from './faktum/reducer';
import { ISideState, sideReducer } from './sider/side/reducer';

export interface IRootState {
    faktum?: IFaktumState;
    side: ISideState;
}

const rootReducer = combineReducers({
    faktum: faktumReducer,
    side: sideReducer
});

export { rootReducer };
