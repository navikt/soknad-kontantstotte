import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { appReducer, IAppState } from './app/reducer';
import { IInnsendingState, innsendingReducer } from './innsending/reducer';
import { ISokerState, sokerReducer } from './person/reducer';
import { soknadReducer } from './soknad/reducer';
import { ISoknadState } from './soknad/types';
import { ITeksterState, teksterReducer } from './tekster/reducer';

export interface IRootState {
    app: IAppState;
    innsending: IInnsendingState;
    person: ISokerState;
    router: RouterState;
    soknad: ISoknadState;
    tekster: ITeksterState;
}

const rootReducer = combineReducers({
    app: appReducer,
    innsending: innsendingReducer,
    person: sokerReducer,
    soknad: soknadReducer,
    tekster: teksterReducer,
});

export { rootReducer };
