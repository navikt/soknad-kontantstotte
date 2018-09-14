import { IRootState } from '../rootReducer';

function selectSenderInn(state: IRootState) {
    return state.innsending.senderinn;
}

export { selectSenderInn };
