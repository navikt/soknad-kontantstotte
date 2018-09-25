import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { appReducer, IAppState } from './app/reducer';
import { IInnsendingState, innsendingReducer } from './innsending/reducer';
import { ISokerState, sokerReducer } from './soker/reducer';
import { soknadReducer } from './soknad/reducer';
import { ISoknadState } from './soknad/types';
import { ITeksterState, teksterReducer } from './tekster/reducer';
import { ITogglesState, toggelsReducer } from './toggles/reducer';

export interface IRootState {
    app: IAppState;
    innsending: IInnsendingState;
    soker: ISokerState;
    router: RouterState;
    soknad: ISoknadState;
    tekster: ITeksterState;
    toggles: ITogglesState;
}

const rootReducer = combineReducers({
    app: appReducer,
    innsending: innsendingReducer,
    soker: sokerReducer,
    soknad: soknadReducer,
    tekster: teksterReducer,
    toggles: toggelsReducer,
});

export { rootReducer };
