import * as React from 'react';
import { connect } from 'react-redux';
import { IPerson } from '../../person/types';
import { IRootState } from '../../rootReducer';

import { Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { selectPerson } from '../../person/selectors';
import KvitteringIkon from './ikoner/KvitteringIkon';
import UtvidetInfo from './UtvidetInfo';

type KvitteringProps = IPerson & InjectedIntlProps;
const Kvittering: React.StatelessComponent<KvitteringProps> = ({ intl }) => {
    return (
        <div>
            <Sidetittel className={'side-container__soknadtittel'}>
                <FormattedMessage id={'kontantstotte.tittel'} />
            </Sidetittel>
            <div className="kvittering__ikon-container">
                <KvitteringIkon className="kvittering__ikon" />
            </div>

            <h3 className="kvittering__tittel">
                {intl.formatMessage({
                    id: 'kvittering.takkForSoknad',
                })}
            </h3>

            <UtvidetInfo intl={intl} />
        </div>
    );
};

const mapStateToProps = (state: IRootState): IPerson => {
    return selectPerson(state);
};

export default injectIntl(
    connect(
        mapStateToProps,
        null
    )(Kvittering)
);
