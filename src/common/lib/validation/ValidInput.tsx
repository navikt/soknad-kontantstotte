import { Input } from 'nav-frontend-skjema';
import { NavFrontendInputProps } from 'nav-frontend-skjema/lib/input';
import * as React from 'react';
import { default as ValidBase, IValidBaseProps } from './index';

class ValidInput extends React.Component<IValidBaseProps & NavFrontendInputProps> {
    public render() {
        const { ...other } = this.props;
        return <ValidBase component={Input} {...other} />;
    }
}

export default ValidInput;
