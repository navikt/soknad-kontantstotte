import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAppStatus } from '../../app/selectors';
import { AppStatus } from '../../app/types';
import { InnsendingFeiletIkon } from '../../component/Ikoner/InnsendingFeiletIkon';
import { IRootState } from '../../rootReducer';
import Feilside from './Feilside';

interface IMapStateToProps {
    status: AppStatus;
}
type InnsendingFeiletProps = IMapStateToProps & InjectedIntlProps;

const InnsendingFeilet: React.StatelessComponent<InnsendingFeiletProps> = ({ status, intl }) => {
    if (intl) {
        document.title = intl.formatMessage({
            id: 'app.tittel.feilside.innsending',
        });
    }
    if (status === AppStatus.FEILSITUASJON) {
        return (
            <Feilside
                ikon={<InnsendingFeiletIkon />}
                tekster={{
                    feilmelding: 'feilside.innsending.feilmelding',
                    knapp: 'feilside.innsending.knapp',
                    tittel: 'feilside.innsending.tittel',
                }}
            />
        );
    }
    return <Redirect to={'/'} />;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default injectIntl(connect(mapStateToProps)(InnsendingFeilet));
