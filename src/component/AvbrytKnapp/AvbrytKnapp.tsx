import { Fareknapp, Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

interface IAvbrytKnappState {
    modalIsOpen: boolean;
}

Modal.setAppElement('#app');

/* tslint:disable */
interface IAvbrytKnappProps {}
/* tslint:enable */

type AvbrytKnappProps = IAvbrytKnappProps & InjectedIntlProps;

class AvbrytKnapp extends React.Component<AvbrytKnappProps, IAvbrytKnappState> {
    constructor(props: AvbrytKnappProps) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    public render() {
        const { intl } = this.props;

        return (
            <div>
                <Flatknapp onClick={this.openModal}>
                    <FormattedMessage id={'app.avbryt'} />
                </Flatknapp>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel={intl.formatMessage({ id: 'app.avbrytmodal.tekst' })}
                    onRequestClose={this.closeModal}
                >
                    <p>
                        <FormattedMessage id={'app.avbrytmodal.tekst'} />
                    </p>
                    <a href={'https://tjenester.nav.no/dittnav/innlogget'}>
                        <Fareknapp>
                            <FormattedMessage id={'app.avbryt'} />
                        </Fareknapp>
                    </a>
                    <Hovedknapp onClick={this.closeModal}>
                        <FormattedMessage id={'app.fortsett'} />
                    </Hovedknapp>
                </Modal>
            </div>
        );
    }

    private openModal() {
        this.setState({
            modalIsOpen: true,
        });
    }

    private closeModal() {
        this.setState({
            modalIsOpen: false,
        });
    }
}

export default injectIntl(AvbrytKnapp);
