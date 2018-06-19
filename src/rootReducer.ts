import { combineReducers } from 'redux';
import { barnReducer, IBarnState } from './barn/reducer';

export interface IRootState {
    barn: IBarnState;
}

const rootReducer = combineReducers({
    barn: barnReducer
});

export { rootReducer };
