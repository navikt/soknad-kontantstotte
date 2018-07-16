import * as PT from 'prop-types';
import * as React from 'react';
import Feiloppsummering from './Feiloppsummering';
import { SummaryError, ValidationResult } from './types';

type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export interface IValidFormProps {
    children: React.ReactNode;
    summaryTitle: string;
    onSubmit?: (evt: FormSubmitEvent) => void;
    noSummary?: boolean;
}

interface IValidFormState {
    failedSubmit: boolean;
    results: ValidationResult[];
    valid: boolean;
}

class ValidForm extends React.Component<IValidFormProps, IValidFormState> {
    public static childContextTypes = {
        validForm: PT.object,
    };
    public components: any[];

    constructor(props: IValidFormProps) {
        super(props);

        this.state = {
            failedSubmit: false,
            results: [],
            valid: true,
        };

        this.components = [];
        this.onSubmit = this.onSubmit.bind(this);
    }

    public getChildContext() {
        return {
            validForm: {
                onBlur: this.onBlur.bind(this),
                onChange: this.onChange.bind(this),
                register: this.registerComponent.bind(this),
                unregister: this.unRegisterComponent.bind(this),
            },
        };
    }

    public onChange(e: any, component: React.ComponentType) {
        if (this.state.failedSubmit) {
            this.validateOne(component);
        }
    }

    public onBlur(e: any, component: React.ComponentType) {
        if (this.state.failedSubmit) {
            this.validateOne(component);
        }
    }

    public onSubmit(e: FormSubmitEvent) {
        e.preventDefault();
        if (this.validateAll()) {
            if (this.props.onSubmit) {
                this.props.onSubmit(e);
            }
        } else {
            this.setState({
                failedSubmit: true,
            });
        }
    }

    public validateOne(component: React.ComponentType) {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            setTimeout(() => {
                const results = this.state.results.slice();
                const fieldResult = this.components[index].validate();
                results[index] = fieldResult;
                const valid = results.every(result => result.valid === true);

                this.setState({
                    failedSubmit: this.state.failedSubmit && !valid,
                    results,
                    valid,
                });
            });
        }
    }

    public validateAll() {
        const results = this.components.map(component => component.validate());
        const valid = results.every(result => result.valid === true);

        this.setState({
            failedSubmit: this.state.failedSubmit && !valid,
            results: results.slice(),
            valid,
        });

        return valid;
    }

    public registerComponent(component: React.Component) {
        if (this.components.indexOf(component) === -1) {
            this.components.push(component);
        }
    }

    public unRegisterComponent(component: React.Component) {
        // Fjern komponent fra komponent-listen
        const index = this.components.indexOf(component);
        this.components.splice(index, 1);

        // Fjern resultatene vi tidligere har lagret for komponenten
        const results = this.state.results.slice();
        results.splice(index, 1);

        // Sjekk om skjemaet er gyldig (valig)
        const valid = results.every(result => result.valid === true);

        // Oppdater state
        this.setState({
            results,
            valid,
        });
    }

    public mapResultsToErrorSummary(): SummaryError[] {
        return this.state.results.filter(result => !result.valid).map(result => ({
            name: result.name,
            text: result.tests.find((test: any) => !test.verdict).failText,
        }));
    }

    public render() {
        const { onSubmit, noSummary = false, summaryTitle, ...other } = this.props;
        let summaryBox;
        if (this.state.failedSubmit && !this.state.valid && !noSummary) {
            summaryBox = (
                <Feiloppsummering
                    title={summaryTitle}
                    show={true}
                    errors={this.mapResultsToErrorSummary()}
                />
            );
        }

        return (
            <form onSubmit={this.onSubmit} {...other}>
                {summaryBox}
                {this.props.children}
            </form>
        );
    }
}

export default ValidForm;
