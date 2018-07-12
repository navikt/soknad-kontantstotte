import Input from 'nav-frontend-skjema/lib/input';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import { Svar } from '../../soknad/types';

interface IProps {
    annenForelderNavn?: string;
    annenForelderFodselsnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar;
    settAnnenForelderNavn: (navn: string) => any;
    settAnnenForelderFodselsnummer: (personnummer: string) => any;
}

type AnnenForelderInfoProps = IProps & InjectedIntlProps;

const AnnenForelderInfo: React.StatelessComponent<AnnenForelderInfoProps> = ({
    annenForelderNavn,
    annenForelderFodselsnummer,
    annenForelderYrkesaktivINorgeEOSIMinstFemAar,
    intl,
    settAnnenForelderNavn,
    settAnnenForelderFodselsnummer
}) => {
    return (
        <div>
            <h3>{ intl.formatMessage({ id: 'familieforhold.annenForelder.tittel'}) }</h3>
            <Input
                label={
                    intl.formatMessage(
                        {
                            id: 'familieforhold.annenForelder.navn.placeholder'
                        }
                    )
                }
                onBlur={
                    (event: React.SyntheticEvent<EventTarget>) => {
                        settAnnenForelderNavn((event.target as HTMLInputElement).value);
                    }
                }
                defaultValue={ annenForelderNavn || '' }
            />
            <Input
                label={
                    intl.formatMessage(
                        {
                            id: 'familieforhold.annenForelder.personnummer.placeholder'
                        }
                    )
                }
                onBlur={
                    (event: React.SyntheticEvent<EventTarget>) => {
                        settAnnenForelderFodselsnummer((event.target as HTMLInputElement).value);
                    }
                }
                defaultValue={ annenForelderFodselsnummer || '' }
            />

            <JaNeiSporsmal
                bolk='familieforhold'
                felt='annenForelderYrkesaktivINorgeEOSIMinstFemAar'
                sporsmalNokkel='familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.sporsmal'
                verdi={ annenForelderYrkesaktivINorgeEOSIMinstFemAar }
            />

            { annenForelderYrkesaktivINorgeEOSIMinstFemAar === Svar.NEI &&
            <div> Kan ikke gå videre, må gi beskjed om å søke på papir etc etc</div>
            }
        </div>
    );
};

export default injectIntl(AnnenForelderInfo);
