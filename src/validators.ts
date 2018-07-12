import { Svar } from './soknad/reducer';

export const harTekstomradeInnhold = (verdi?: string): boolean => {
    return verdi ? verdi.length > 0 : false;
};

export const erDatoSatt = (verdi?: string): boolean => {
    return harTekstomradeInnhold(verdi);
};

export const harSvartPaJaNeiSporsmal = (svar: Svar): boolean => {
    return svar !== Svar.UBESVART;
};
