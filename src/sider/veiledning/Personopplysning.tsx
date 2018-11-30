import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

Modal.setAppElement('#pagewrapper');

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
                <a onClick={this.openModal} className={'lenke'}>
                    <FormattedMessage id={'veiledningsside.personopplysning.lenke'} />
                </a>
                <Modal
                    role={'dialog'}
                    aria-modal={'true'}
                    isOpen={this.state.isOpen}
                    onRequestClose={this.closeModal}
                    contentLabel={'personopplysning'}
                    closeButton={false}
                    className={'personopplysning__modal'}
                >
                    <div className={'personopplysning__innhold'}>
                        <FormattedHTMLMessage id={'veiledningsside.personopplysning.innhold'} />
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
