import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import HjelpetekstIkon from '../Ikoner/HjelpetekstIkon';

interface ISoknadHjelpetekstState {
    modalIsOpen: boolean;
}

interface ISoknadHjelpetekstProps {
    hjelpetekstNokkel: string;
    className?: string;
    modalClassName?: string;
}

type SoknadHjelpetekstProps = ISoknadHjelpetekstProps & InjectedIntlProps;

class SoknadHjelpetekst extends React.Component<SoknadHjelpetekstProps, ISoknadHjelpetekstState> {
    constructor(props: SoknadHjelpetekstProps) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    public render() {
        const { intl, hjelpetekstNokkel, className, modalClassName } = this.props;
        return (
            <div className={className}>
                <div onClick={this.openModal}>
                    <HjelpetekstIkon />
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel={intl.formatMessage({ id: 'app.avbrytmodal.tekst' })}
                    onRequestClose={this.closeModal}
                    className={modalClassName}
                >
                    <p>
                        <FormattedMessage id={hjelpetekstNokkel} />
                    </p>
                </Modal>
            </div>
        );
    }

    private openModal() {
        this.setState({ modalIsOpen: true });
    }

    private closeModal() {
        this.setState({ modalIsOpen: false });
    }
}

export default injectIntl(SoknadHjelpetekst);
