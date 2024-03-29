import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import AdvarselIkon from '../../component/Ikoner/AdvarselIkon';

interface IOppsummeringsAdvarsel {
    meldingsNokkel: string;
}

const OppsummeringsAdvarsel: React.StatelessComponent<IOppsummeringsAdvarsel> = ({
    meldingsNokkel,
}) => {
    return (
        <div className={'oppsummering__advarsel'}>
            <AdvarselIkon style={{ flex: 'none', marginRight: '1rem' }} />
            <FormattedHTMLMessage id={meldingsNokkel} />
        </div>
    );
};

export default OppsummeringsAdvarsel;
