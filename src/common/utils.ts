import * as moment from 'moment';
import { InjectedIntl } from 'react-intl';
import { BarnehageplassVerdier, IFelt, ValideringsStatus } from '../soknad/types';
import { IFeltFeil } from './types';

export const ANTALL_LOVLIGE_TEGN_I_TEKSTFELT = 500;

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

export const harHattBarnehageplassOver33TimerPrUkeSisteTreMåneder = (
    harBarnehageplassAntallTimer: IFelt,
    harBarnehageplassDato: IFelt,
    barnBarnehageplassStatus: IFelt
) => {
    if (
        harBarnehageplassDato.valideringsStatus !== ValideringsStatus.OK ||
        harBarnehageplassAntallTimer.valideringsStatus !== ValideringsStatus.OK ||
        barnBarnehageplassStatus.valideringsStatus !== ValideringsStatus.OK
    ) {
        return false;
    }

    const datoStartetIBarnehage = moment(harBarnehageplassDato.verdi, 'DD.MM.YYYY');
    const treMånederSidenDagensDato = moment().subtract(90, 'days');

    if (
        barnBarnehageplassStatus.verdi === BarnehageplassVerdier.harBarnehageplass &&
        parseFloat(harBarnehageplassAntallTimer.verdi) > 33 &&
        datoStartetIBarnehage.isBefore(treMånederSidenDagensDato)
    ) {
        return true;
    } else {
        return false;
    }
};
