import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { IFeltFeil } from '../../common/lib/validation/types';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';
import { IFamilieforhold } from '../../soknad/types';

interface IProps {
    familieforhold: IFamilieforhold;
    feltMedFeil: IFeltFeil;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
}

type AnnenForelderInfoProps = IProps & InjectedIntlProps;

const AnnenForelderInfo: React.StatelessComponent<AnnenForelderInfoProps> = ({
    feltMedFeil,
    familieforhold,
    intl,
    settAnnenForelderNavn,
    settAnnenForelderFodselsnummer,
}) => {
    return (
        <SoknadPanel>
            <Input
                name="annenForelder.navn"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.navn.placeholder',
                })}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderNavn((event.target as HTMLInputElement).value);
                }}
                defaultValue={familieforhold.annenForelderNavn.verdi}
                feil={feltMedFeil.annenForelderNavn}
            />
            <Input
                name="annenforelder.fodselsnummer"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.fodselsnummer.placeholder',
                })}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderFodselsnummer((event.target as HTMLInputElement).value);
                }}
                defaultValue={familieforhold.annenForelderFodselsnummer.verdi}
                feil={feltMedFeil.annenForelderFodselsnummer}
            />
        </SoknadPanel>
    );
};

export default injectIntl(AnnenForelderInfo);
