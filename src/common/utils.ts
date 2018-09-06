import { IFeltFeil, IFeil } from '../common/lib/validation/types';
import { IFelt, ValideringsStatus } from '../soknad/types';
import { InjectedIntl } from 'react-intl';

export const hentFeltMedFeil = (
    steg: object,
    harForsoktNesteSteg: boolean,
    intl: InjectedIntl
): IFeltFeil => {
    const feltMedFeil = Object.entries(steg).reduce((accFeltMedFeil: IFeltFeil, [key, felt]) => {
        accFeltMedFeil[key] =
            felt.valideringsStatus !== ValideringsStatus.OK && harForsoktNesteSteg
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
