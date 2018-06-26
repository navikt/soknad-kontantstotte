import TextareaControlled from 'nav-frontend-skjema/lib/textarea-controlled';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface IOwnProps {
    nokkel: string;
    settForklaring: (verdi: string) => any;
    skalVises: boolean;
    forklaring?: string;
}

type SpesifiserTextareaProps = IOwnProps & InjectedIntlProps;

const SpesifiserTextarea: React.StatelessComponent<SpesifiserTextareaProps> = ({
    nokkel,
    settForklaring,
    forklaring,
    intl,
    skalVises
}) => {

    return skalVises ? (
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
    ) : null;

};

export default injectIntl(SpesifiserTextarea);