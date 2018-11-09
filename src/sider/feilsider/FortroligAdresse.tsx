import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAppStatus } from '../../app/selectors';
import { AppStatus } from '../../app/types';
import { InnsendingFeiletIkon } from '../../component/Ikoner/InnsendingFeiletIkon';
import { IRootState } from '../../rootReducer';
import Feilside from './Feilside';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import Modal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Veileder from 'nav-frontend-veileder';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import { Personopplysning } from '../veiledning/Personopplysning';

interface IMapStateToProps {
    status: AppStatus;
}

const InnsendingFeilet: React.StatelessComponent<IMapStateToProps> = ({ status }) => {
    if (status === AppStatus.FEILSITUASJON) {
        return (
            <div className={'veiledning'}>
                <div className={'veiledning__veileder-container'}>
                    <Veileder
                        posisjon={'topp'}
                        className={'veiledning__veileder'}
                        storrelse={'M'}
                        center={true}
                        tekst={
                            <div className={'veiledning__veileder-snakkeboble'}>
                                <Element>
                                    <FormattedMessage id={'fortrolig.adresse.veileder.hei'} />
                                </Element>
                                <Normaltekst>
                                    <FormattedMessage id={'fortrolig.adresse.veileder.melding'} />
                                </Normaltekst>
                            </div>
                        }
                    >
                        <Veilederikon morkBakgrunn={true} />
                    </Veileder>
                </div>

                <Sidetittel className={'veiledning__sidetittel'}>
                    <FormattedMessage id={'fortrolig.adresse.tittel'} />
                </Sidetittel>
                <Normaltekst className={'veiledning__info'}>
                    <FormattedMessage id={'fortrolig.adresse.info'} />
                </Normaltekst>
                <a
                    href={
                        'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&languagecode=53&veiledertype=privatperson'
                    }
                >
                    <Hovedknapp className={'veiledning__knapp'}>
                        <FormattedMessage id={'fortrolig.adresse.knapp'} />
                    </Hovedknapp>
                </a>
            </div>
        );
    }
    return <Redirect to={'/'} />;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default connect(mapStateToProps)(InnsendingFeilet);
