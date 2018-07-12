import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { ValidInput } from '../../common/lib/validation';
import DatoInputWithValidation from '../../common/lib/validation/DatoInputWithValidation';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { erDatoSatt, harTekstomradeInnhold } from '../../validators';
import { BarnehageplassVerdier } from './BarnehageplassSide';

interface IEkstraFelterProps {
    barnehageplassVerdi: BarnehageplassVerdier;
}

interface IMapStateToProps {
    barnehageplassDato?: string;
    barnehageplassKommune?: string;
    barnehageplassAntallTimer?: string;
}

interface IMapDispatchToProps {
    settFelt: (nokkel: string, verdi: string) => any;
}

type JaEkstraFelterProps = IEkstraFelterProps & IMapDispatchToProps & IMapStateToProps & InjectedIntlProps;

const EkstraFelter: React.StatelessComponent<JaEkstraFelterProps> = ({
    barnehageplassVerdi,
    barnehageplassDato,
    barnehageplassKommune,
    barnehageplassAntallTimer,
    settFelt,
    intl
}) => {
    let datoNokkel: string;
    switch (barnehageplassVerdi) {
        case BarnehageplassVerdier.Ja:
        case BarnehageplassVerdier.NeiHarFaatt:
            datoNokkel = 'barnehageplass.harFaattPlassDato';
            break;
        case BarnehageplassVerdier.JaSkalSlutte:
            datoNokkel = 'barnehageplass.skalSlutteDato';
            break;
        default:
            datoNokkel = '';
    }
    return (
        <div>
            <DatoInputWithValidation
                {...barnehageplassDato && {dato: new Date(barnehageplassDato)}}
                name='barnehageplass.dato'
                label={intl.formatMessage({ id: datoNokkel })}
                settDato={(dato) => settFelt('barnehageplassDato', dato.toDateString())}
                validators={[
                    {
                        failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                        test: () => erDatoSatt(barnehageplassDato)
                    }
                ]}
            />
            <ValidInput
                name='barnehageplass.kommune'
                label={intl.formatMessage({id: 'barnehageplass.kommune'})}
                bredde={'M'}
                validators={[
                    {
                        failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                        test: () => harTekstomradeInnhold(barnehageplassKommune)
                }
                    ]}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('barnehageplassKommune', event.target.value)}
            />
            { [BarnehageplassVerdier.JaSkalSlutte, BarnehageplassVerdier.Ja].includes(barnehageplassVerdi) &&
                <ValidInput
                    name='barnehageplass.antallTimer'
                    label={intl.formatMessage({id: 'barnehageplass.antallTimer'})}
                    bredde={'M'}
                    validators={
                        [
                            {
                                failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                                test: () => harTekstomradeInnhold(barnehageplassAntallTimer)
                            }
                        ]
                    }
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settFelt('barnehageplassAntallTimer', event.target.value)}
                />
            }
        </div>
    );
};

const mapStateToProps = (state: IRootState) => {
  return {
      barnehageplassAntallTimer: state.soknad.barnehageplassAntallTimer,
      barnehageplassDato: state.soknad.barnehageplassDato,
      barnehageplassKommune: state.soknad.barnehageplassKommune
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settFelt: (nokkel: string, verdi: string) => {
            dispatch(soknadSettVerdi(nokkel, verdi));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EkstraFelter));
