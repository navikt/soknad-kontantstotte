import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ValidInput } from '../../common/lib/validation';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { Svar } from '../../soknad/reducer';
import { harTekstomradeInnhold } from '../../validators';

interface IMapStateToProps {
    annenForelderNavn?: string;
    annenForelderPersonnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar;
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
            <ValidInput
                label={
                    intl.formatMessage(
                        {
                            id: 'familieforhold.annenForelder.navn.placeholder'
                        }
                    )
                }
                validators={
                    [
                        {
                            failText: intl.formatMessage({
                                id: 'familieforhold.annenForelder.navn.feilmelding'
                            }),
                            test: () => harTekstomradeInnhold(annenForelderPersonnummer)
                        }
                    ]
                }
                onBlur={
                    (event: React.SyntheticEvent<EventTarget>) => {
                        settAnnenForelderNavn((event.target as HTMLInputElement).value);
                    }
                }
                defaultValue={ annenForelderNavn || '' }
            />
            <ValidInput
                label={
                    intl.formatMessage(
                        {
                            id: 'familieforhold.annenForelder.personnummer.placeholder'
                        }
                    )
                }
                validators={
                    [
                        {
                            failText: intl.formatMessage({
                                id: 'familieforhold.annenForelder.personnummer.feilmelding'
                            }),
                            test: () => harTekstomradeInnhold(annenForelderPersonnummer)
                        }
                    ]
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

            { annenForelderYrkesaktivINorgeEOSIMinstFemAar === Svar.NEI &&
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
