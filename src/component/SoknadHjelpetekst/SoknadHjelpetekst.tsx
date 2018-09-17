import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import Anchor from './Anchor';

interface ISoknadHjelpetekstState {
    modalIsOpen: boolean;
    hover: boolean;
}

interface ISoknadHjelpetekstProps {
    hjelpetekstNokkel: string;
    ariaContentLabel: string;
    className?: string;
    modalClassName?: string;
    hjelpetekstErHtml?: boolean;
}

class SoknadHjelpetekst extends React.Component<ISoknadHjelpetekstProps, ISoknadHjelpetekstState> {
    constructor(props: ISoknadHjelpetekstProps) {
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
            hjelpetekstNokkel,
            ariaContentLabel,
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
                    contentLabel={ariaContentLabel}
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

export default SoknadHjelpetekst;
