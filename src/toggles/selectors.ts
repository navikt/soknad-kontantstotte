import { IRootState } from '../rootReducer';
import { IToggleName } from './types';

function isEnabled(state: IRootState, toggleName: IToggleName): boolean {
    return state.toggles.toggles[toggleName];
}

function isMaintenance(state: IRootState): boolean {
    return state.toggles.toggles[IToggleName.vedlikeholdsmodus];
}

export { isEnabled, isMaintenance };
