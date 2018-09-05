import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { IFelt } from '../../soknad/types';
import PanelBase, { Panel } from 'nav-frontend-paneler';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';

interface IProps {
    annenForelderNavn: IFelt;
    annenForelderFodselsnummer: IFelt;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
}

type AnnenForelderInfoProps = IProps & InjectedIntlProps;

const AnnenForelderInfo: React.StatelessComponent<AnnenForelderInfoProps> = ({
    annenForelderNavn,
    annenForelderFodselsnummer,
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
                defaultValue={annenForelderNavn.verdi}
            />
            <Input
                name="annenforelder.fodselsnummer"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.fodselsnummer.placeholder',
                })}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderFodselsnummer((event.target as HTMLInputElement).value);
                }}
                defaultValue={annenForelderFodselsnummer.verdi}
            />
        </SoknadPanel>
    );
};

export default injectIntl(AnnenForelderInfo);
