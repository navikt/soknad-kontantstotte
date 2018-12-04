import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

if (document.getElementById('pagewrapper')) {
    Modal.setAppElement('#pagewrapper');
} else {
    Modal.setAppElement('#app');
}

interface IPersonopplysningModalProps {
    className: string;
}

interface IPersonopplysningModalState {
    isOpen: boolean;
}

class Personopplysning extends React.Component<
    IPersonopplysningModalProps,
    IPersonopplysningModalState
> {
    constructor(props: IPersonopplysningModalProps) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    public render() {
        return (
            <div className={this.props.className + ' personopplysning'}>
                <button
                    onClick={this.openModal}
                    aria-haspopup={'dialog'}
                    className={'personopplysning__lenkeknapp'}
                >
                    <FormattedMessage id={'veiledningsside.personopplysning.lenke'}>
                        {lenketekst => (
                            <span className={'personopplysning__lenketekst'}>{lenketekst}</span>
                        )}
                    </FormattedMessage>
                </button>
                <Modal
                    role={'dialog'}
                    aria-modal={'true'}
                    isOpen={this.state.isOpen}
                    onRequestClose={this.closeModal}
                    contentLabel={'personopplysning'}
                    closeButton={false}
                    className={'personopplysning__modal'}
                >
                    <div
                        className={'personopplysning__innhold'}
                        role={'document'}
                        tabIndex={0}
                        aria-describedby={'description_personopplysning_modal'}
                    >
                        <div id="description_personopplysning_modal">
                            <FormattedHTMLMessage id={'veiledningsside.personopplysning.innhold'} />
                        </div>
                        <Knapp className={'personopplysning__knapp'} onClick={this.closeModal}>
                            <FormattedMessage id={'veiledningsside.personopplysning.knapp'} />
                        </Knapp>
                    </div>
                </Modal>
            </div>
        );
    }

    private openModal() {
        this.setState({
            isOpen: true,
        });
    }

    private closeModal() {
        this.setState({
            isOpen: false,
        });
    }
}

export { Personopplysning };
