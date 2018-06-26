import TextareaControlled from 'nav-frontend-skjema/lib/textarea-controlled';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface IOwnProps {
    nokkel: string;
    settForklaring: (verdi: string) => any;
    forklaring?: string;
}

type SpesifiserTextareaProps = IOwnProps & InjectedIntlProps;

const SpesifiserTextarea: React.StatelessComponent<SpesifiserTextareaProps> = ({
    nokkel,
    settForklaring,
    forklaring,
    intl
}) => {

    return (
        <TextareaControlled
            label={ intl.formatMessage(
                {
                    id: 'tekstomrade.fyllInn'
                }
            ) }
            onBlur={
                (evt: React.SyntheticEvent<EventTarget>) => {
                    settForklaring((evt.target as HTMLInputElement).value);
                }
            }
            defaultValue={forklaring || ''}
            maxLength={500}
        />
    );

};

export default injectIntl(SpesifiserTextarea);