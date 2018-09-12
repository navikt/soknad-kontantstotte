import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { IFeltFeil } from '../../common/lib/validation/types';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import { IFamilieforhold, Svar } from '../../soknad/types';

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
        <div>
            <h3>{intl.formatMessage({ id: 'familieforhold.annenForelder.tittel' })}</h3>
            <Input
                name="annenForelder.navn"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.navn.placeholder',
                })}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderNavn((event.target as HTMLInputElement).value);
                }}
                defaultValue={familieforhold.annenForelderNavn.verdi || ''}
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
                defaultValue={familieforhold.annenForelderFodselsnummer.verdi || ''}
                feil={feltMedFeil.annenForelderFodselsnummer}
            />

            <JaNeiSporsmal
                bolk="familieforhold"
                felt="annenForelderYrkesaktivINorgeEOSIMinstFemAar"
                sporsmalNokkel="familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.sporsmal"
                verdi={familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.verdi as Svar}
            />

            {familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.verdi === Svar.NEI && (
                <div> Kan ikke gå videre, må gi beskjed om å søke på papir etc etc</div>
            )}
        </div>
    );
};

export default injectIntl(AnnenForelderInfo);
