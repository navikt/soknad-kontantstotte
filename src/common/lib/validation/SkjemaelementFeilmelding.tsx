import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';
import * as React from 'react';

export interface ISkjemaelementFeilmeldingProps {
    feil?: SkjemaelementFeil;
}

class SkjemaelementFeilmelding extends React.Component<ISkjemaelementFeilmeldingProps> {
    public renderFeil() {
        return (
            <div className="skjemaelement__feilmelding">
                {this.props.feil && this.props.feil.feilmelding}
            </div>
        );
    }

    public render() {
        const { feil } = this.props;
        return (
            <div role="alert" aria-live="assertive">
                {feil && this.renderFeil()}
            </div>
        );
    }
}

export default SkjemaelementFeilmelding;
