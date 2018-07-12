import { CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import * as React from 'react';
import {
    default as ValidBase,
    IValidBaseProps
} from './index';

class ValidCheckboxPanelGruppe extends React.Component<CheckboksPanelGruppeProps & IValidBaseProps> {
    public render() {
        const { ...other } = this.props;
        return <ValidBase component={ CheckboksPanelGruppe } {...other} />;
    }
}

export default ValidCheckboxPanelGruppe;
