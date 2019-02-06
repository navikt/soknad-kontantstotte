import * as classNames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import SkjemaelementFeilmelding, {
    SkjemaelementFeil,
} from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { IVedlegg } from '../../vedlegg/types';
import { VedleggForhandsvisning } from './VedleggForhandsvisning';
import VedleggKnapp from './VedleggKnapp';

const cls = (className?: string) => classNames('skjemaelement', className);

interface IVedleggProps {
    className?: string;
    feil?: SkjemaelementFeil;
    id?: string;
    label: React.ReactNode;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (filreferanse: string) => void;
    sporsmal: React.ReactNode;
    vedlegg: IVedlegg[];
}

class Vedlegg extends React.Component<IVedleggProps> {
    constructor(props: IVedleggProps) {
        super(props);
    }

    public render() {
        const { className, id, label, onChange, vedlegg, onDelete, feil, sporsmal } = this.props;

        const inputId = id || name || guid();

        return (
            <div className={cls(className)}>
                <Element className={'vedlegg__sporsmal'}>{sporsmal}</Element>
                <p className={'skjemaelement__label vedlegg__label'}>{label}</p>
                <VedleggKnapp onChange={onChange} inputId={inputId} />
                <VedleggForhandsvisning vedlegg={vedlegg} onDelete={onDelete} />
                <SkjemaelementFeilmelding feil={feil} />
            </div>
        );
    }
}

export { Vedlegg };
