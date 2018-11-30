import Modal from 'nav-frontend-modal';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Avbrytknapp from '../Avbrytknapp/Avbrytknapp';
import AvbrytSoknadKnapp from '../AvbrytSoknadKnapp/AvbrytSoknadKnapp';
import Fortsettknapp from '../Fortsettknapp/Fortsettknapp';
import Submitknapp from '../Submitknapp/Submitknapp';
import Tilbakeknapp from '../Tilbakeknapp/Tilbakeknapp';

interface INavigasjonState {
    modalIsOpen: boolean;
}

Modal.setAppElement('body');

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
                    className={'avbrytmodal'}
                    isOpen={this.state.modalIsOpen}
                    contentLabel={intl.formatMessage({ id: 'app.avbrytmodal.tekst' })}
                    onRequestClose={this.closeModal}
                >
                    <div className={'avbrytmodal__advarseltekst'}>
                        <Normaltekst>
                            <FormattedMessage id={'app.avbrytmodal.tekst'} />
                        </Normaltekst>
                    </div>
                    <AvbrytSoknadKnapp className={'avbrytmodal__avbrytknapp'} />

                    <Fortsettknapp
                        className={'avbrytmodal__fortsettknapp'}
                        closeModal={this.closeModal}
                    />
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
