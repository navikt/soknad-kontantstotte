import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAppStatus } from '../../app/selectors';
import { AppStatus } from '../../app/types';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import Environment from '../../Environment';
import { IRootState } from '../../rootReducer';

interface IMapStateToProps {
    status: AppStatus;
}

const FortroligAdresse: React.StatelessComponent<IMapStateToProps> = ({ status }) => {
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
                <a href={Environment().saksoversikt}>
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

export default connect(mapStateToProps)(FortroligAdresse);
