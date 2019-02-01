import * as classNames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import * as React from 'react';
import { IVedlegg } from '../../vedlegg/types';
import { VedleggForhandsvisning } from './VedleggForhandsvisning';
import VedleggKnapp from './VedleggKnapp';

const cls = (className?: string) => classNames('skjemaelement', className);

interface IVedleggProps {
    className?: string;
    id?: string;
    label: React.ReactNode;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    vedlegg: IVedlegg[];
}

class Vedlegg extends React.Component<IVedleggProps> {
    constructor(props: IVedleggProps) {
        super(props);
    }

    public render() {
        const { className, id, label, onChange, vedlegg } = this.props;

        const inputId = id || name || guid();

        return (
            <div className={cls(className)}>
                <label className={'skjemaelement__label'}>{label}</label>
                <VedleggKnapp onChange={onChange} inputId={inputId} />
                <VedleggForhandsvisning vedlegg={vedlegg} />
            </div>
        );
    }
}

export { Vedlegg };
