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
    annenForelderFodselsnummer?: string;
    annenForelderYrkesaktivINorgeEOSIMinstFemAar: Svar;
}

interface IMapDispatchToProps {
    settAnnenForelderNavn: (navn: string) => any;
    settAnnenForelderFodselsnummer: (personnummer: string) => any;
}

type AnnenForelderInfoProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

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
            <ValidInput
                name='annenForelder.navn'
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
                            test: () => harTekstomradeInnhold(annenForelderNavn)
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
                name='annenforelder.fodselsnummer'
                label={
                    intl.formatMessage(
                        {
                            id: 'familieforhold.annenForelder.fodselsnummer.placeholder'
                        }
                    )
                }
                validators={
                    [
                        {
                            failText: intl.formatMessage({
                                id: 'familieforhold.annenForelder.fodselsnummer.feilmelding'
                            }),
                            test: () => harTekstomradeInnhold(annenForelderFodselsnummer)
                        }
                    ]
                }
                onBlur={
                    (event: React.SyntheticEvent<EventTarget>) => {
                        settAnnenForelderFodselsnummer((event.target as HTMLInputElement).value);
                    }
                }
                defaultValue={ annenForelderFodselsnummer || '' }
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
        annenForelderFodselsnummer: state.soknad.annenForelderFodselsnummer,
        annenForelderNavn: state.soknad.annenForelderNavn,
        annenForelderYrkesaktivINorgeEOSIMinstFemAar: state.soknad.annenForelderYrkesaktivINorgeEOSIMinstFemAar
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settAnnenForelderFodselsnummer: (fodselsnummer) => {
            dispatch(soknadSettVerdi('annenForelderFodselsnummer', fodselsnummer));
        },
        settAnnenForelderNavn: (navn) => {
            dispatch(soknadSettVerdi('annenForelderNavn', navn));
        }
    };
};

export {
    IMapStateToProps as IAnnenForelder
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AnnenForelderInfo));
