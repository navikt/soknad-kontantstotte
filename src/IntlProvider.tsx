import * as React from 'react';
import {
    addLocaleData,
    IntlProvider as Provider
} from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import { connect } from 'react-redux';
import { IRootState } from './rootReducer';
import {
    selectTekster,
    selectValgtSprak,
} from './tekster/selectors';
import { ITekster } from './tekster/types';

addLocaleData(nb);

interface IOwnProps {
    children: React.ReactNode;
}

interface IMapStateToProps {
    tekster: ITekster;
    valgtSprak: string;
}

type Props = IOwnProps & IMapStateToProps;

const IntlProvider: React.StatelessComponent<Props> = ({
    children,
    tekster,
    valgtSprak,
}) => {
    return (
        <Provider
            key={ Object.keys(tekster).length }
            messages={ tekster }
            defaultLocale={ 'nb' }
            locale={ valgtSprak }
        >
            { children }
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
