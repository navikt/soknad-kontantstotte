import * as React from 'react';
import {
    default as ValidBase,
    IValidBaseProps
} from './index';
import DatoFelt, {
    DatoFeltProps
} from '../../../sider/barnehageplass/DatoFelt';

class DatoInputWithValidation extends React.Component<
    IValidBaseProps & DatoFeltProps
> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={DatoFelt} {...other} />;
    }
}

export default DatoInputWithValidation;
