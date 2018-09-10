import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IFeltFeil } from '../../common/lib/validation/types';
import { BarnehageplassVerdier, Feltnavn, IBarnehageplass } from '../../soknad/types';
import DatoFelt from './DatoFelt';

interface IEkstraFelterProps extends IBarnehageplass {
    feltMedFeil: IFeltFeil;
    intl: InjectedIntl;
    settFelt: (nokkel: Feltnavn, verdi: string) => void;
}

type JaEkstraFelterProps = IEkstraFelterProps;

const EkstraFelter: React.StatelessComponent<JaEkstraFelterProps> = ({
    feltMedFeil,
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
            <DatoFelt
                {...dato && { dato: new Date(dato.verdi) }}
                name="barnehageplass.dato"
                label={intl.formatMessage({ id: datoNokkel })}
                settDato={date => settFelt('dato', date.toDateString())}
                feil={feltMedFeil.dato}
            />
            <Input
                name="barnehageplass.kommune"
                label={intl.formatMessage({ id: 'barnehageplass.kommune' })}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('kommune', event.target.value)
                }
                defaultValue={kommune.verdi}
                feil={feltMedFeil.kommune}
            />
            {[BarnehageplassVerdier.JaSkalSlutte, BarnehageplassVerdier.Ja].includes(
                harBarnehageplass.verdi as BarnehageplassVerdier
            ) && (
                <Input
                    name="barnehageplass.antallTimer"
                    label={intl.formatMessage({ id: 'barnehageplass.antallTimer' })}
                    bredde={'M'}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settFelt('antallTimer', event.target.value)
                    }
                    defaultValue={antallTimer.verdi}
                    feil={feltMedFeil.antallTimer}
                />
            )}
        </div>
    );
};

export default EkstraFelter;
