import * as React from 'react';
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

const GenerellFeilside: React.StatelessComponent<IMapStateToProps> = ({ status }) => {
    if (status === AppStatus.FEILSITUASJON) {
        return (
            <Feilside
                ikon={<InnsendingFeiletIkon />}
                tekster={{
                    feilmelding: 'feilside.generell.feilmelding',
                    knapp: 'feilside.generell.knapp',
                    tittel: 'feilside.generell.tittel',
                }}
            />
        );
    } else {
        return <Redirect to={'/'} />;
    }
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default connect(mapStateToProps)(GenerellFeilside);
