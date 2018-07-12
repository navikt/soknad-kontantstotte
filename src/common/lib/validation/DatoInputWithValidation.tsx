import * as React from 'react';
import DatoFelt, {
    DatoFeltProps
} from '../../../sider/barnehageplass/DatoFelt';
import {
    default as ValidBase,
    IValidBaseProps
} from './index';

class DatoInputWithValidation extends React.Component<
    IValidBaseProps & DatoFeltProps
> {
    public render() {
        const { ...other } = this.props;
        return <ValidBase component={DatoFelt} {...other} />;
    }
}

export default DatoInputWithValidation;
