import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IFeilmelding {
    tekstnokkel: string;
}

const Feilmelding: React.StatelessComponent<IFeilmelding> = ({ tekstnokkel }) => {
    const bekreftelseCheckboks = document
        .getElementsByClassName('inputPanel__field')
        .item(0) as HTMLElement;

    bekreftelseCheckboks.focus();

    return (
        <FormattedMessage id={tekstnokkel}>
            {txt => (
                <div role="alert" className={'skjemaelement__feilmelding'}>
                    {txt}
                </div>
            )}
        </FormattedMessage>
    );
};

export { Feilmelding };
