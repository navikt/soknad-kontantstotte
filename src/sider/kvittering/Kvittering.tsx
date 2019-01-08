import * as React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { IRootState } from '../../rootReducer';
import { selectMineBarn } from '../../soknad/selectors';
import { IMineBarn, Svar } from '../../soknad/types';
import KvitteringIkon from './ikoner/KvitteringIkon';
import UtvidetInfo from './UtvidetInfo';

interface IMapStateToProps {
    barn: IMineBarn;
}

type KvitteringProps = InjectedIntlProps & IMapStateToProps;
const Kvittering: React.StatelessComponent<KvitteringProps> = ({ intl, barn }) => {
    if (intl) {
        document.title = intl.formatMessage({
            id: 'app.tittel.kvittering',
        });
    }
    return (
        <div>
            <Undertittel className={'side-container__soknadtittel'}>
                <FormattedMessage id={'kontantstotte.tittel'} />
            </Undertittel>
            <div className="kvittering__ikon-container">
                <KvitteringIkon className="kvittering__ikon" />
            </div>

            <h3 className="kvittering__tittel">
                {intl.formatMessage({
                    id: 'kvittering.takkForSoknad',
                })}
            </h3>

            <UtvidetInfo intl={intl} />
            {barn.erFlerling.verdi === Svar.JA && (
                <AlertStripe className="kvittering__advarsel" type="info">
                    <FormattedMessage id={'advarsel.flerebarn.utenlink'} />
                </AlertStripe>
            )}
        </div>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectMineBarn(state),
    };
};

export default injectIntl(connect(mapStateToProps)(Kvittering));
