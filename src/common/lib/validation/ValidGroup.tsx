import { SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import {
    default as ValidBase,
    IValidBaseProps
} from './index';

class ValidGroup extends React.Component<IValidBaseProps> {
    public render() {
        const { ...other } = this.props;
        return <ValidBase component={SkjemaGruppe} {...other} />;
    }
}

export default ValidGroup;
