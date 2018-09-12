import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';
import { connect } from 'react-redux';
import { IRootState } from './rootReducer';
import { selectTekster, selectValgtSprak } from './tekster/selectors';
import { ISprak, ITekster } from './tekster/types';

addLocaleData(nb);
addLocaleData(nn);

interface IOwnProps {
    children: React.ReactNode;
}

interface IMapStateToProps {
    tekster: ITekster;
    valgtSprak: ISprak;
}

type Props = IOwnProps & IMapStateToProps;

const IntlProvider: React.StatelessComponent<Props> = ({ children, tekster, valgtSprak }) => {
    return (
        <Provider
            key={Object.keys(tekster).length}
            messages={tekster}
            defaultLocale={ISprak.nb}
            locale={valgtSprak}
        >
            {children}
        </Provider>
    );
};

function mapStateTorProps(state: IRootState): IMapStateToProps {
    return {
        tekster: selectTekster(state),
        valgtSprak: selectValgtSprak(state),
    };
}

export default connect(mapStateTorProps)(IntlProvider);
