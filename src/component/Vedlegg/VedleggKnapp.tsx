import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IVedleggKnappProps {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    inputId: string;
}

class VedleggKnapp extends React.Component<IVedleggKnappProps> {
    constructor(props: IVedleggKnappProps) {
        super(props);
    }

    public render() {
        const { onChange, inputId } = this.props;

        return (
            <label htmlFor={inputId} className={'knapp knapp--standard vedlegg__knapp'}>
                <FormattedMessage id={'app.lastopp.vedlegg'} />
                <input
                    id={inputId}
                    type={'file'}
                    accept={
                        'image/png, image/jpg, image/jpeg, application/pdf, .jpg, .jpeg, .png, .pdf'
                    }
                    multiple={true}
                    style={{
                        display: 'none',
                    }}
                    onChange={onChange}
                />
            </label>
        );
    }
}

export default VedleggKnapp;
