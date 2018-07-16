import { Select } from 'nav-frontend-skjema';
import * as React from 'react';
import { default as ValidBase, IValidBaseProps } from './index';
import { InputProps } from './types';

class ValidSelect extends React.Component<IValidBaseProps & InputProps> {
    public render() {
        const { ...other } = this.props;
        return <ValidBase component={Select} {...other} />;
    }
}

export default ValidSelect;
