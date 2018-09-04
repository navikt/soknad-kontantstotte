import { IFelt, Svar, ValideringsStatus } from './types';

export const harTekstomradeInnhold = (verdi?: string): boolean => {
    return verdi ? verdi.length > 0 : false;
};

export const erDatoSatt = (verdi?: string): boolean => {
    return harTekstomradeInnhold(verdi);
};

export const harSvartPaJaNeiSporsmal = (svar: Svar): boolean => {
    return svar !== Svar.UBESVART;
};

export const harHuketAvPaCheckbox = (svar: Svar): boolean => {
    return svar === Svar.JA;
};

const ok = (felt: IFelt): IFelt => ({
    ...felt,
    valideringsStatus: ValideringsStatus.OK,
});

const feil = (felt: IFelt, feilmeldingsNokkel: string): IFelt => ({
    feilmeldingsNokkel,
    valideringsStatus: ValideringsStatus.FEIL,
    verdi: felt.verdi,
});

const harSvart = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi !== Svar.UBESVART ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harSvartJa = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi === Svar.JA ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harFyltInnNavn = (felt: IFelt): IFelt => {
    return felt.verdi.replace(' ', '').length > 0
        ? ok(felt)
        : feil(felt, 'familieforhold.annenForelder.navn.feilmelding');
};

const harFyltInnFodselsdato = (felt: IFelt): IFelt => {
    return /^\d{2}.\d{2}.\d{4}/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'feilmelding.mineBarn.fodselsDato');
};

const harFyltInnFodselsnummer = (felt: IFelt): IFelt => {
    return /^\d{11}/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'familieforhold.annenForelder.fodselsnummer.feilmelding');
};

const harSvartMedFeilmelding = (felt: IFelt): IFelt => harSvart(felt, 'svar.feilmelding');
const harSvartJaMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartJa(felt, 'svar.feilmeldingCheckbox');

const svarUtenValidering = (felt: IFelt): IFelt => felt;

export {
    harSvart,
    harSvartMedFeilmelding,
    harSvartJa,
    harSvartJaMedFeilmelding,
    harFyltInnNavn,
    harFyltInnFodselsdato,
    harFyltInnFodselsnummer,
    svarUtenValidering,
};
