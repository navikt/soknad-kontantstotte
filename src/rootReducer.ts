import { RouterState } from "connected-react-router";
import { combineReducers } from 'redux';
import { appReducer, IAppState } from './app/reducer';
import { barnReducer, IBarnState } from './barn/reducer';
import { IInnsendingState, innsendingReducer } from './innsending/reducer';
import { ISoknadState, soknadReducer } from './soknad/reducer';
import { ITeksterState, teksterReducer } from './tekster/reducer';

export interface IRootState {
    app: IAppState;
    barn: IBarnState;
    innsending: IInnsendingState;
    soknad: ISoknadState;
    tekster: ITeksterState;
    router: RouterState;
}

const rootReducer = combineReducers({
    app: appReducer,
    barn: barnReducer,
    innsending: innsendingReducer,
    soknad: soknadReducer,
    tekster: teksterReducer,
});

export { rootReducer };
