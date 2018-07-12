import { InnsendingActionTypes, InnsendingTypeKeys } from './actions';

interface IInnsendingState {
    readonly senderinn: boolean;
}

const initialState: IInnsendingState = {
    senderinn: false
};

function innsendingReducer(state = initialState, action: InnsendingActionTypes) {
    switch (action.type) {
        case InnsendingTypeKeys.SENDINN:
            return {
                ...state,
                senderinn: true,
            };
        case InnsendingTypeKeys.SENDINN_OK:
            return {
                ...state,
                senderinn: false,
            };
        case InnsendingTypeKeys.SENDINN_FEILET:
            return {
                ...state,
                senderinn: false,
            };
        default:
            return state;
    }
}

export {
    innsendingReducer,
    IInnsendingState,
};
