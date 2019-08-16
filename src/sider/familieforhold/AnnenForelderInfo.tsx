import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { hentFeltMedFeil } from '../../common/utils';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';
import { IFamilieforhold } from '../../soknad/types';

interface IProps {
    familieforhold: IFamilieforhold;
    harForsoktNesteSteg: boolean;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFødselsnummer: (personnummer: string) => void;
}

type AnnenForelderInfoProps = IProps & InjectedIntlProps;

const AnnenForelderInfo: React.StatelessComponent<AnnenForelderInfoProps> = ({
    familieforhold,
    intl,
    harForsoktNesteSteg,
    settAnnenForelderNavn,
    settAnnenForelderFødselsnummer,
}) => {
    const feltMedFeil = hentFeltMedFeil(familieforhold, harForsoktNesteSteg, intl);
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
                maxLength={50}
            />
            <Input
                name="annenforelder.fødselsnummer"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.fødselsnummer.placeholder',
                })}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderFødselsnummer((event.target as HTMLInputElement).value);
                }}
                defaultValue={familieforhold.annenForelderFødselsnummer.verdi}
                feil={feltMedFeil.annenForelderFødselsnummer}
                type={'tel'}
                autoComplete={'off'}
                maxLength={11}
            />
        </SoknadPanel>
    );
};

export default injectIntl(AnnenForelderInfo);
