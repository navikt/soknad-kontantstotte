import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IFeil } from '../../common/lib/validation/types';
import TilleggsinformasjonInput from '../../component/TilleggsinformasjonInput/TilleggsinformasjonInput';
import { Feltnavn, IFelt, TilknytningTilUtlandVerdier } from '../../soknad/types';

interface IBoddEllerJobbetINorgeSporsmalProps {
    nullstillNeste: () => void;
    settTilknytningTilUtlandVerdiFelt: (
        feltnavn: Feltnavn,
        verdi: TilknytningTilUtlandVerdier
    ) => void;
    settForklaringsFelt: (feltnavn: Feltnavn, verdi: string) => void;
    intl: InjectedIntl;
    feltFeil: IFeil | undefined;
    feltNavn: string;
    feltVerdi: TilknytningTilUtlandVerdier;
    forklaringFeltVerdi: IFelt;
    forklaringFeltFeil: IFeil | undefined;
}

const BoddEllerJobbetINorgeSporsmal: React.StatelessComponent<
    IBoddEllerJobbetINorgeSporsmalProps
> = ({
    nullstillNeste,
    settTilknytningTilUtlandVerdiFelt,
    settForklaringsFelt,
    intl,
    feltFeil,
    feltNavn,
    feltVerdi,
    forklaringFeltVerdi,
    forklaringFeltFeil,
}) => {
    return (
        <form>
            <RadioPanelGruppe
                legend={intl.formatMessage({
                    id: 'tilknytningTilUtland.' + feltNavn + '.sporsmal',
                })}
                name={feltNavn}
                className={'soknad__inputPanelGruppe'}
                onChange={(evt: {}, value: string) => {
                    settTilknytningTilUtlandVerdiFelt(
                        feltNavn as Feltnavn,
                        value as TilknytningTilUtlandVerdier
                    );
                    nullstillNeste();
                }}
                checked={feltVerdi}
                radios={[
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaINorge' }),
                        value: TilknytningTilUtlandVerdier.jaINorge,
                    },
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaIEOS' }),
                        value: TilknytningTilUtlandVerdier.jaIEOS,
                    },
                    {
                        label: intl.formatMessage({
                            id: 'tilknytningTilUtland.svar.jaLeggerSammenPerioderEOS',
                        }),
                        value: TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS,
                    },
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.nei' }),
                        value: TilknytningTilUtlandVerdier.nei,
                    },
                ]}
                feil={feltFeil}
            />

            {(feltVerdi === TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS ||
                feltVerdi === TilknytningTilUtlandVerdier.jaIEOS) && (
                <TilleggsinformasjonInput
                    label={intl.formatMessage({
                        id: 'tilknytningTilUtland.forklaring.hjelpetekst',
                    })}
                    defaultValue={forklaringFeltVerdi}
                    onBlur={(value: string) => {
                        settForklaringsFelt((feltNavn + 'Forklaring') as Feltnavn, value);
                    }}
                    feil={forklaringFeltFeil}
                />
            )}
        </form>
    );
};

export default BoddEllerJobbetINorgeSporsmal;
