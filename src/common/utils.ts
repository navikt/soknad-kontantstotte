import { InjectedIntl } from 'react-intl';
import { IFeltFeil } from '../common/lib/validation/types';
import { ValideringsStatus } from '../soknad/types';

export const ANTALL_LOVLIGE_TEGN_I_TEKSTFELT = 400;

export const hentFeltMedFeil = (
    steg: object,
    harForsoktNesteSteg: boolean,
    intl: InjectedIntl
): IFeltFeil => {
    const feltMedFeil = Object.entries(steg).reduce((accFeltMedFeil: IFeltFeil, [key, felt]) => {
        accFeltMedFeil[key] =
            felt.valideringsStatus === ValideringsStatus.FEIL && harForsoktNesteSteg
                ? {
                      feilmelding: intl.formatMessage({
                          id: felt.feilmeldingsNokkel,
                      }),
                  }
                : undefined;
        return accFeltMedFeil;
    }, {});

    return feltMedFeil;
};
