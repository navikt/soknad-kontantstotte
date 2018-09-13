import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Avbrytknapp from '../Avbrytknapp/Avbrytknapp';
import Submitknapp from '../Submitknapp/Submitknapp';
import Tilbakeknapp from '../Tilbakeknapp/Tilbakeknapp';

import InjectedIntlProps = ReactIntl.InjectedIntlProps;

interface INavigasjonState {
    modalIsOpen: boolean;
}

Modal.setAppElement('#app');

/* tslint:disable */
interface INavigasjonsProps {}
/* tslint:enable */

type NavigasjonProps = INavigasjonsProps & InjectedIntlProps;

class Navigasjon extends React.Component<NavigasjonProps, INavigasjonState> {
    constructor(props: NavigasjonProps) {
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
            <div className={'navigasjon'}>
                <Submitknapp className={'navigasjon__knapp'} />
                <Tilbakeknapp posisjon={'nede'} />
                <Avbrytknapp className={'navigasjon__knapp'} openModal={this.openModal} />
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

export default injectIntl(Navigasjon);
