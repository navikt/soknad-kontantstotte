import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Anchor from './Anchor';

interface ISoknadHjelpetekstState {
    modalIsOpen: boolean;
    hover: boolean;
}

interface ISoknadHjelpetekstProps {
    hjelpetekstNokkel: string;
    className?: string;
    modalClassName?: string;
    hjelpetekstErHtml?: boolean;
}

type SoknadHjelpetekstProps = ISoknadHjelpetekstProps & InjectedIntlProps;

class SoknadHjelpetekst extends React.Component<SoknadHjelpetekstProps, ISoknadHjelpetekstState> {
    constructor(props: SoknadHjelpetekstProps) {
        super(props);
        this.state = {
            hover: false,
            modalIsOpen: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.setHover = this.setHover.bind(this);
    }

    public render() {
        const {
            intl,
            hjelpetekstNokkel,
            className,
            modalClassName,
            hjelpetekstErHtml,
        } = this.props;
        return (
            <div className={className}>
                <button
                    type="button"
                    className={'hjelpetekst__apneknapp'}
                    onClick={this.openModal}
                    onMouseEnter={this.setHover(true)}
                    onMouseLeave={this.setHover(false)}
                >
                    <Anchor hover={this.state.hover} className={'hjelpetekst__anchor'} />
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel={intl.formatMessage({ id: 'app.avbrytmodal.tekst' })}
                    onRequestClose={this.closeModal}
                    className={modalClassName}
                >
                    <p>
                        {hjelpetekstErHtml ? (
                            <FormattedHTMLMessage id={hjelpetekstNokkel} />
                        ) : (
                            <FormattedMessage id={hjelpetekstNokkel} />
                        )}
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

    private setHover(value: boolean) {
        return () => this.setState({ hover: value });
    }
}

export default injectIntl(SoknadHjelpetekst);
