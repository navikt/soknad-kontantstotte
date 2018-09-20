import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { appReducer, IAppState } from './app/reducer';
import { IInnsendingState, innsendingReducer } from './innsending/reducer';
import { IPersonState, personReducer } from './person/reducer';
import { soknadReducer } from './soknad/reducer';
import { ISoknadState } from './soknad/types';
import { ITeksterState, teksterReducer } from './tekster/reducer';
import { ITogglesState, toggelsReducer } from './toggles/reducer';

export interface IRootState {
    app: IAppState;
    innsending: IInnsendingState;
    person: IPersonState;
    router: RouterState;
    soknad: ISoknadState;
    tekster: ITeksterState;
    toggles: ITogglesState;
}

const rootReducer = combineReducers({
    app: appReducer,
    innsending: innsendingReducer,
    person: personReducer,
    soknad: soknadReducer,
    tekster: teksterReducer,
    toggles: toggelsReducer,
});

export { rootReducer };
