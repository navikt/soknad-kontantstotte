import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import KvitteringIkon from './ikoner/KvitteringIkon';
import UtvidetInfo from './UtvidetInfo';

type KvitteringProps = InjectedIntlProps;
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

export default injectIntl(Kvittering);
