import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ValidTextarea from '../../common/lib/validation/ValidTextarea';
import { harTekstomradeInnhold } from '../../validators';

interface IOwnProps {
    nokkel: string;
    settForklaring: (verdi: string) => any;
    forklaring?: string;
}

type SpesifiserTextareaProps = IOwnProps & InjectedIntlProps;

const SpesifiserTextarea: React.StatelessComponent<SpesifiserTextareaProps> = ({
    nokkel,
    settForklaring,
    forklaring = '',
    intl
}) => {

    return (
        <ValidTextarea
            label={ intl.formatMessage(
                {
                    id: 'tekstomrade.fyllInn'
                }
            ) }
            name={ nokkel }
            validators={
                [
                    {
                        failText: intl.formatMessage({
                            id: 'tekstomrade.feilmelding'
                        }),
                        test: () => harTekstomradeInnhold(forklaring)
                    }
                ]
            }
            onBlur={
                (evt: React.SyntheticEvent<EventTarget>) => {
                    settForklaring((evt.target as HTMLInputElement).value);
                }
            }
            defaultValue={forklaring}
            maxLength={500}
        />
    );
};

export default injectIntl(SpesifiserTextarea);
