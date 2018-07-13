import * as classnames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import * as React from 'react';
import SkjemaelementFeilmelding from './SkjemaelementFeilmelding';
import { IFeil } from './types';

export interface ISkjemaInputProps {
    label: string | React.ReactNode;
    feil?: IFeil;
    id?: string;
    children: React.ReactNode;
}

const SkjemaInputElement: React.StatelessComponent<ISkjemaInputProps> = (
    props: ISkjemaInputProps
) => {
    const { label, id, feil, children } = props;
    const inputId = id || guid();
    return (
        <div
            className={classnames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined,
            })}
        >
            <label className="skjemaelement__label" htmlFor={inputId}>
                {label}
            </label>
            <div
                className={classnames({
                    'skjema__feilomrade--harFeil': feil !== undefined,
                })}
            >
                {children}
            </div>
            <SkjemaelementFeilmelding feil={feil} />
        </div>
    );
};

export default SkjemaInputElement;
