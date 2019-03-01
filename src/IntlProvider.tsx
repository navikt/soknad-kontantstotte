import * as moment from 'moment-timezone';
import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';
import { connect } from 'react-redux';
import { ISprak } from './app/types';
import { selectValgtSprak } from './app/selectors';
import { selectLand } from './land/selectors';
import { ILand } from './land/types';
import { IRootState } from './rootReducer';
import { selectTekster } from './tekster/selectors';
import { ITekster } from './tekster/types';

addLocaleData(nb);
addLocaleData(nn);

interface IOwnProps {
    children: React.ReactNode;
}

interface IMapStateToProps {
    tekster: ITekster;
    land: ILand;
    valgtSprak: ISprak;
}

type Props = IOwnProps & IMapStateToProps;

const IntlProvider: React.StatelessComponent<Props> = ({ children, land, tekster, valgtSprak }) => {
    moment.locale(valgtSprak);
    moment.tz(moment.tz.guess());
    const teksterSamlet = { ...land, ...tekster };

    return (
        <Provider messages={teksterSamlet} defaultLocale={ISprak.nb} locale={valgtSprak}>
            {children}
        </Provider>
    );
};

function mapStateTorProps(state: IRootState): IMapStateToProps {
    return {
        land: selectLand(state),
        tekster: selectTekster(state),
        valgtSprak: selectValgtSprak(state),
    };
}

export default connect(mapStateTorProps)(IntlProvider);
