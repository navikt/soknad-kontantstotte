import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { ValidInput } from '../../common/lib/validation';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import { Svar } from '../../soknad/types';
import { harTekstomradeInnhold } from '../../soknad/validators';

interface IProps {
    annenForelderNavn?: string;
    annenForelderFodselsnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
}

type AnnenForelderInfoProps = IProps & InjectedIntlProps;

const AnnenForelderInfo: React.StatelessComponent<AnnenForelderInfoProps> = ({
    annenForelderNavn,
    annenForelderFodselsnummer,
    annenForelderYrkesaktivINorgeEOSIMinstFemAar,
    intl,
    settAnnenForelderNavn,
    settAnnenForelderFodselsnummer,
}) => {
    return (
        <div>
            <h3>{intl.formatMessage({ id: 'familieforhold.annenForelder.tittel' })}</h3>
            <ValidInput
                name="annenForelder.navn"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.navn.placeholder',
                })}
                validators={[
                    {
                        failText: intl.formatMessage({
                            id: 'familieforhold.annenForelder.navn.feilmelding',
                        }),
                        test: () => harTekstomradeInnhold(annenForelderNavn),
                    },
                ]}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderNavn((event.target as HTMLInputElement).value);
                }}
                defaultValue={annenForelderNavn || ''}
            />
            <ValidInput
                name="annenforelder.fodselsnummer"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.fodselsnummer.placeholder',
                })}
                validators={[
                    {
                        failText: intl.formatMessage({
                            id: 'familieforhold.annenForelder.fodselsnummer.feilmelding',
                        }),
                        test: () => harTekstomradeInnhold(annenForelderFodselsnummer),
                    },
                ]}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderFodselsnummer((event.target as HTMLInputElement).value);
                }}
                defaultValue={annenForelderFodselsnummer || ''}
            />

            <JaNeiSporsmal
                bolk="familieforhold"
                felt="annenForelderYrkesaktivINorgeEOSIMinstFemAar"
                sporsmalNokkel="familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.sporsmal"
                verdi={annenForelderYrkesaktivINorgeEOSIMinstFemAar}
            />

            {annenForelderYrkesaktivINorgeEOSIMinstFemAar === Svar.NEI && (
                <div> Kan ikke gå videre, må gi beskjed om å søke på papir etc etc</div>
            )}
        </div>
    );
};

export default injectIntl(AnnenForelderInfo);
