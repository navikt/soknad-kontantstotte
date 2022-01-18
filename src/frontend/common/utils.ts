import moment from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { BarnehageplassVerdier, IFelt, ValideringsStatus } from '../soknad/types';
import { IFeil, IFeltFeil } from './types';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { ISprak } from '../app/types';

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

export const hentFeilmeldingElement = (feil: IFeil | undefined): SkjemaelementFeil | undefined => {
    if (feil) {
        const element = React.createElement('p', null, feil.feilmelding);
        return { feilmelding: element };
    } else {
        return undefined;
    }
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

export const oppdaterLanguageAttributt = (språk: ISprak) => {
    document.documentElement.lang = språk;
};
