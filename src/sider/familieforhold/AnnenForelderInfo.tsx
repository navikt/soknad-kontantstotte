import Input from 'nav-frontend-skjema/lib/input';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';

interface IMapStateToProps {
    annenForelderNavn?: string;
    annenForelderPersonnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar?: boolean;
}

interface IMapDispatchToProps {
    settAnnenForelderNavn: (navn: string) => any;
    settAnnenForelderPersonnummer: (personnummer: string) => any;
}

type AnnenForelderInfoProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const AnnenForelderInfo: React.StatelessComponent<AnnenForelderInfoProps> = ({
    annenForelderNavn,
    annenForelderPersonnummer,
    annenForelderYrkesaktivINorgeEOSIMinstFemAar,
    intl,
    settAnnenForelderNavn,
    settAnnenForelderPersonnummer
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
                        settAnnenForelderPersonnummer((event.target as HTMLInputElement).value);
                    }
                }
                defaultValue={ annenForelderPersonnummer || '' }
            />

            <JaNeiSporsmal
                nokkel='annenForelderYrkesaktivINorgeEOSIMinstFemAar'
                sporsmalNokkel='familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.sporsmal'
                verdi={ annenForelderYrkesaktivINorgeEOSIMinstFemAar }
            />

            { annenForelderYrkesaktivINorgeEOSIMinstFemAar === false &&
            <div> Kan ikke gå videre, må gi beskjed om å søke på papir etc etc</div>
            }
        </div>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        annenForelderNavn: state.soknad.annenForelderNavn,
        annenForelderPersonnummer: state.soknad.annenForelderPersonnummer,
        annenForelderYrkesaktivINorgeEOSIMinstFemAar: state.soknad.annenForelderYrkesaktivINorgeEOSIMinstFemAar
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settAnnenForelderNavn: (navn) => {
            dispatch(soknadSettVerdi('annenForelderNavn', navn));
        },
        settAnnenForelderPersonnummer: (personnr) => {
            dispatch(soknadSettVerdi('annenForelderPersonnummer', personnr));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AnnenForelderInfo));
