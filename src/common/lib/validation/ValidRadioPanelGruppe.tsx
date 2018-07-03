import { RadioPanelGruppeProps } from 'nav-frontend-skjema';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import {
    default as ValidBase,
    IValidBaseProps
} from './index';

class ValidRadioPanelGruppe extends React.Component<RadioPanelGruppeProps & IValidBaseProps> {
    public render() {
        const { ...other } = this.props;
        return <ValidBase component={ RadioPanelGruppe } {...other} />;
    }
}

export default ValidRadioPanelGruppe;
