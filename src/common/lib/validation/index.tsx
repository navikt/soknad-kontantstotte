import { Input, Select, TextareaControlled } from 'nav-frontend-skjema';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import * as PT from 'prop-types';
import * as React from 'react';
import DatoFelt from '../../../sider/barnehageplass/DatoFelt';
import { Validator } from './types';

export interface IValidBaseProps {
    id?: string;
    name?: string;
    optional?: boolean;
    validators?: Validator[];
    defaultValue?: string;
    feil?: SkjemaelementFeilmelding;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onChange?: (evt: any) => void;
    onBlur?: (evt: any) => void;
    onValidate?: (evt: any) => void;
}

export interface IProps extends IValidBaseProps {
    component: any;
}

export interface IValidBaseState {
    hasBlurred: boolean;
    tests: any[];
    valid: boolean;
    text: string;
    optional?: boolean;
}

class ValidBase extends React.Component<IProps, IValidBaseState> {
    public static contextTypes = {
        validForm: PT.object
    };

    public element: any;
    public context: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            hasBlurred: false,
            optional: this.props.optional,
            tests: [],
            text: this.props.defaultValue || '',
            valid: true,
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    public componentWillMount() {
        if (this.context.validForm) {
            this.context.validForm.register(this);
        }
    }

    public componentWillUnmount() {
        if (this.context.validForm) {
            this.context.validForm.unregister(this);
        }
    }

    public onChange(e: any) {
        if (this.state.hasBlurred) {
            setTimeout(() => {
                this.validate();
            });
        }
        if (this.context.validForm) {
            this.context.validForm.onChange(e, this);
        }

        if (this.props.onChange) {
            this.props.onChange(e);
        } else {
            this.setState({...this.state , text: (e as React.ChangeEvent<HTMLTextAreaElement>).target.value});
        }
    }

    public onBlur(e: React.FocusEvent<any>) {
        this.setState({
            hasBlurred: true
        });

        if (this.context.validForm) {
            this.context.validForm.onBlur(e, this);
        } else {
            setTimeout(() => {
                this.validate();
            });
        }

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    public getFirstFailedVerdict() {
        return this.state.tests.find((test) => !test.verdict);
    }

    public validate() {
        const result = this.runValidation();

        if (this.props.onValidate) {
            this.props.onValidate(result);
        }

        return result;
    }

    public runValidation() {
        if (!this.props.validators || !this.props.validators.length) {
            return;
        }

        let valid = true;
        const testsCopy = this.props.validators.map((validator) => {
            const validatorResult = {
                failText: validator.failText,
                verdict: validator.test(this.element)
            };

            if (!validatorResult.verdict) {
                valid = false;
            }
            return validatorResult;
        });

        this.setState({
            tests: testsCopy.slice(),
            valid
        });

        return {
            name: this.props.name,
            tests: testsCopy.slice(),
            valid
        };
    }

    public render() {
        const {
            component,
            onChange,
            onBlur,
            onValidate,
            validateOnChange,
            validateOnBlur,
            feil,
            optional,
            validators,
            ...other
        } = this.props;

        const failedVerdict = !this.state.valid
            ? { feilmelding: this.getFirstFailedVerdict().failText }
            : undefined;

        const elementRef: any = {};
        switch (component) {
            case Input:
                elementRef.inputRef = (node: any) => {
                    this.element = node;
                };
                break;
            case Select:
                elementRef.selectRef = (node: any) => {
                    this.element = node;
                };
                break;
            case RadioPanelGruppe:
                elementRef.inputRef = (node: any) => {
                    this.element = node;
                };
                break;
            case TextareaControlled:
                elementRef.textareaRef = (node: any) => {
                    this.element = node;
                };
                break;
            case DatoFelt:
                elementRef.datoinputRef = (node: any) => {
                    this.element = node;
                };
        }

        if (!!onChange) {
            return (
                <this.props.component
                    onChange={ this.onChange }
                    onBlur={this.onBlur}
                    feil={feil || failedVerdict}
                    {...other}
                />
            );
        } else {
            return (
                <this.props.component
                    onBlur={this.onBlur}
                    feil={feil || failedVerdict}
                    {...other}
                />
            );
        }
    }
}
export default ValidBase;

export { default as ValidForm } from './ValidForm';
export { default as ValidInput } from './ValidInput';
export { default as ValidGroup } from './ValidGroup';
export { default as ValidSelect } from './ValidSelect';
export { default as ValidRadioPanelGruppe } from './ValidRadioPanelGruppe';
export { default as ValidTextarea } from './ValidTextarea';
export { default as Feiloppsummering } from './Feiloppsummering';
