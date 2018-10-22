import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IFeil } from '../../common/lib/validation/types';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import TilleggsinformasjonInput from '../../component/TilleggsinformasjonInput/TilleggsinformasjonInput';
import { Feltnavn, IFelt, TilknytningTilUtlandVerdier } from '../../soknad/types';

interface IBoddEllerJobbetINorgeSporsmalProps {
    nullstillNeste: () => void;
    settTilknytningTilUtlandVerdiFelt: (
        feltnavn: Feltnavn,
        verdi: TilknytningTilUtlandVerdier
    ) => void;
    settForklaringsFelt: (feltnavn: Feltnavn, verdi: string) => void;
    feltFeil: IFeil | undefined;
    feltNavn: string;
    feltVerdi: TilknytningTilUtlandVerdier;
    forklaringFeltFeil: IFeil | undefined;
    forklaringFeltVerdi: IFelt;
    intl: InjectedIntl;
    visTilknytningTilUtlandAdvarsel: boolean;
}

const BoddEllerJobbetINorgeSporsmal: React.StatelessComponent<
    IBoddEllerJobbetINorgeSporsmalProps
> = ({
    feltFeil,
    feltNavn,
    feltVerdi,
    forklaringFeltFeil,
    forklaringFeltVerdi,
    intl,
    nullstillNeste,
    settForklaringsFelt,
    settTilknytningTilUtlandVerdiFelt,
    visTilknytningTilUtlandAdvarsel,
}) => {
    const person = feltNavn.includes('annenForelder') ? 'den andre forelderen' : 'jeg';
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
                        label: intl.formatMessage(
                            {
                                id: 'tilknytningTilUtland.svar.jaLeggerSammenPerioderEOS',
                            },
                            { person }
                        ),
                        value: TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS,
                    },
                    {
                        label: intl.formatMessage(
                            { id: 'tilknytningTilUtland.svar.nei' },
                            { person }
                        ),
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

            {feltVerdi === TilknytningTilUtlandVerdier.nei &&
                visTilknytningTilUtlandAdvarsel && (
                    <Veileder
                        posisjon={'høyre'}
                        className={'tilknytning-til-utland__advarsel'}
                        tekst={
                            <FormattedMessage
                                id={
                                    feltNavn === 'boddEllerJobbetINorgeMinstFemAar'
                                        ? 'tilknytningTilUtland.advarsel.nei.soker'
                                        : 'tilknytningTilUtland.advarsel.nei.annenForelder'
                                }
                            />
                        }
                        type={'advarsel'}
                    >
                        <Veilederikon morkBakgrunn={true} />
                    </Veileder>
                )}
        </form>
    );
};

export default BoddEllerJobbetINorgeSporsmal;
