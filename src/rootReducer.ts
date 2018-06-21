import { combineReducers } from 'redux';
import { barnReducer, IBarnState } from './barn/reducer';
import { ISoknadSate, soknadReducer } from './soknad/reducer';
import { ITeksterState, teksterReducer } from './tekster/reducer';

export interface IRootState {
    barn: IBarnState;
    soknad: ISoknadSate;
    tekster: ITeksterState;
}

const rootReducer = combineReducers({
    barn: barnReducer,
    soknad: soknadReducer,
    tekster: teksterReducer,
});

export { rootReducer };
