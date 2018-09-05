import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ValidInput } from '../../common/lib/validation';
import DatoInputWithValidation from '../../common/lib/validation/DatoInputWithValidation';
import { BarnehageplassVerdier, Feltnavn, IBarnehageplass } from '../../soknad/types';
import { erDatoSatt, harTekstomradeInnhold } from '../../soknad/validators';

interface IEkstraFelterProps extends IBarnehageplass {
    intl: InjectedIntl;
    settFelt: (nokkel: Feltnavn, verdi: string) => void;
}

type JaEkstraFelterProps = IEkstraFelterProps;

const EkstraFelter: React.StatelessComponent<JaEkstraFelterProps> = ({
    harBarnehageplass,
    dato,
    kommune,
    antallTimer,
    settFelt,
    intl,
}) => {
    let datoNokkel: string;
    switch (harBarnehageplass.verdi) {
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
                {...dato && { dato: new Date(dato.verdi) }}
                name="barnehageplass.dato"
                label={intl.formatMessage({ id: datoNokkel })}
                settDato={date => settFelt('dato', date.toDateString())}
                validators={[
                    {
                        failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                        test: () => erDatoSatt(dato.verdi),
                    },
                ]}
            />
            <ValidInput
                name="barnehageplass.kommune"
                label={intl.formatMessage({ id: 'barnehageplass.kommune' })}
                bredde={'M'}
                validators={[
                    {
                        failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                        test: () => harTekstomradeInnhold(kommune.verdi),
                    },
                ]}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('kommune', event.target.value)
                }
                defaultValue={kommune.verdi}
            />
            {[BarnehageplassVerdier.JaSkalSlutte, BarnehageplassVerdier.Ja].includes(
                harBarnehageplass.verdi as BarnehageplassVerdier
            ) && (
                <ValidInput
                    name="barnehageplass.antallTimer"
                    label={intl.formatMessage({ id: 'barnehageplass.antallTimer' })}
                    bredde={'M'}
                    validators={[
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                            test: () => harTekstomradeInnhold(antallTimer.verdi),
                        },
                    ]}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settFelt('antallTimer', event.target.value)
                    }
                    defaultValue={antallTimer.verdi}
                />
            )}
        </div>
    );
};

export default EkstraFelter;
