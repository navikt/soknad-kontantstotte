import * as React from 'react';
import { IVedlegg } from '../../vedlegg/types';
import VedleggKnapp from './VedleggKnapp';

interface IVedleggProps {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    vedlegg: IVedlegg[];
}

class Vedlegg extends React.Component<IVedleggProps> {
    constructor(props: IVedleggProps) {
        super(props);
    }

    public render() {
        const { onChange, vedlegg } = this.props;
        return (
            <div>
                <VedleggKnapp onChange={onChange} />
                <div>
                    {vedlegg.map(f => {
                        return <span key={f.filnavn}>{f.filnavn}</span>;
                    })}
                </div>
            </div>
        );
    }
}

export { Vedlegg };
