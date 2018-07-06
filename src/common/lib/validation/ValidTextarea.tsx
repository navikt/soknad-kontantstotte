import { TextareaControlledProps } from 'nav-frontend-skjema';
import TextareaControlled from 'nav-frontend-skjema/lib/textarea-controlled';
import * as React from 'react';
import {
    default as ValidBase,
    IValidBaseProps
} from './index';

class ValidTextarea extends React.Component<IValidBaseProps & TextareaControlledProps> {
    public render() {
        const { ...other } = this.props;
        return <ValidBase component={ TextareaControlled } {...other} />;
    }
}

export default ValidTextarea;
