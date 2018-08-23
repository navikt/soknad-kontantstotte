import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ValidInput from '../../common/lib/validation/ValidInput';
import { harTekstomradeInnhold } from '../../validators';

interface IOwnProps {
    settLand: (verdi: string) => void;
    nokkel: string;
    tekstNokkel: string;
    land: string;
}

type LandvelgerProps = IOwnProps & InjectedIntlProps;

const LandInput: React.StatelessComponent<LandvelgerProps> = ({
    intl,
    land,
    settLand,
    nokkel,
    tekstNokkel,
}) => {
    return (
        <ValidInput
            name={nokkel}
            label={intl.formatMessage({
                id: tekstNokkel,
            })}
            validators={[
                {
                    failText: intl.formatMessage({
                        id: 'familieforhold.annenForelder.navn.feilmelding',
                    }),
                    test: () => harTekstomradeInnhold(land),
                },
            ]}
            onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                settLand((event.target as HTMLInputElement).value);
            }}
            defaultValue={land || ''}
        />
    );
};

export default injectIntl(LandInput);
