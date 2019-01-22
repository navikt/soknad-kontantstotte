import * as React from 'react';
import VedleggKnapp from './VedleggKnapp';

interface IVedleggProps {
    onChange: () => void;
}

interface IVedleggState {
    filer: File[];
}

class Vedlegg extends React.Component<IVedleggProps, IVedleggState> {
    constructor(props: IVedleggProps) {
        super(props);

        this.state = {
            filer: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        return (
            <div>
                <VedleggKnapp onChange={this.handleChange} />
                <div>
                    {this.state.filer.map(f => {
                        return <span key={f.name}>{f.name}</span>;
                    })}
                </div>
            </div>
        );
    }

    private handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        if (evt.target.files) {
            this.setState({
                filer: Array.from(evt.target.files),
            });
        }
    }
}

export { Vedlegg };
