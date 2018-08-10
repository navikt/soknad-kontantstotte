import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { appReducer, IAppState } from './app/reducer';
import { personReducer, IPersonState } from './person/reducer';
import { IInnsendingState, innsendingReducer } from './innsending/reducer';
import { soknadReducer } from './soknad/reducer';
import { ISoknadState } from './soknad/types';
import { ITeksterState, teksterReducer } from './tekster/reducer';

export interface IRootState {
    app: IAppState;
    person: IPersonState;
    innsending: IInnsendingState;
    soknad: ISoknadState;
    tekster: ITeksterState;
    router: RouterState;
}

const rootReducer = combineReducers({
    app: appReducer,
    barn: personReducer,
    innsending: innsendingReducer,
    soknad: soknadReducer,
    tekster: teksterReducer,
});

export { rootReducer };
