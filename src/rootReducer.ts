import { combineReducers } from 'redux';
import { barnReducer, IBarnState } from './barn/reducer';
import { ISoknadSate, soknadReducer } from './soknad/reducer';

export interface IRootState {
    barn: IBarnState;
    soknad: ISoknadSate;
}

const rootReducer = combineReducers({
    barn: barnReducer,
    soknad: soknadReducer,
});

export { rootReducer };
