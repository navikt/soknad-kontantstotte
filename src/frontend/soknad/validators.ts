import * as moment from 'moment';
import { ANTALL_LOVLIGE_TEGN_I_TEKSTFELT } from '../common/utils';
import {
    BarnehageplassVerdier,
    FeltTyper,
    IFelt,
    IVedleggFelt,
    Svar,
    TilknytningTilUtlandVerdier,
    ValideringsStatus,
} from './types';

function ok(felt: IFelt): IFelt;
function ok(felt: IVedleggFelt): IVedleggFelt;
function ok(felt: FeltTyper) {
    return {
        feilmeldingsNokkel: '',
        valideringsStatus: ValideringsStatus.OK,
        verdi: felt.verdi,
    };
}

function advarsel(felt: IFelt, advarselNokkel: string): IFelt;
function advarsel(felt: IVedleggFelt, advarselNokkel: string): IVedleggFelt;
function advarsel(felt: FeltTyper, advarselNokkel: string) {
    return {
        feilmeldingsNokkel: advarselNokkel,
        valideringsStatus: ValideringsStatus.ADVARSEL,
        verdi: felt.verdi,
    };
}

function feil(felt: IFelt, feilmeldingsNokkel: string): IFelt;
function feil(felt: IVedleggFelt, feilmeldingsNokkel: string): IVedleggFelt;
function feil(felt: FeltTyper, feilmeldingsNokkel: string) {
    return {
        feilmeldingsNokkel,
        valideringsStatus: ValideringsStatus.FEIL,
        verdi: felt.verdi,
    };
}

const harSvart = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi !== Svar.UBESVART ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harSvartBarnehageplassVerdiMedFeilmelding = (felt: IFelt): IFelt => {
    return felt.verdi !== BarnehageplassVerdier.Ubesvart
        ? ok(felt)
        : feil(felt, 'barnehageplass.harPlass.feilmelding');
};

const harSvartTilknytningTilUtlandVerdiMedFeilmelding = (felt: IFelt): IFelt => {
    return felt.verdi !== TilknytningTilUtlandVerdier.Ubesvart
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.feilmelding');
};

const harSvartJa = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi === Svar.JA ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harSvartTekst = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi.length > 0 ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harSvartTekstUnderAntallTegn = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi.length <= ANTALL_LOVLIGE_TEGN_I_TEKSTFELT
        ? ok(felt)
        : feil(felt, feilmeldingsNokkel);
};

const harFyltInnNavn = (felt: IFelt): IFelt => {
    return felt.verdi.replace(' ', '').length > 0
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.navn');
};

const harFyltInnDato = (felt: IFelt): IFelt => {
    return /^\d{2}\.\d{2}\.\d{4}$/.test(felt.verdi)
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.dato');
};

const erGyldigDato = (felt: IFelt): IFelt => {
    return moment(felt.verdi, 'DD.MM.YYYY').isValid()
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.ugyldigDato');
};

const harSvartTomtFødselsnummer = (felt: IFelt): IFelt =>
    harSvartTekst(felt, 'feilmelding.generell.fødselsnummerTom');

const harFyltInnFødselsnummer = (felt: IFelt): IFelt => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.fødselsnummer');
};

const fødselsnummerPassererMod10ogMod11Sjekk = (felt: IFelt): IFelt => {
    const vektSifreMod10 = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
    const vektSifreMod11 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

    let sumMod10 = 0;
    for (let i = 0; i < 10; i++) {
        sumMod10 += Number.parseInt(felt.verdi.charAt(i), 10) * vektSifreMod10[i];
    }

    let sumMod11 = 0;
    for (let i = 0; i < 11; i++) {
        sumMod11 += Number.parseInt(felt.verdi.charAt(i), 10) * vektSifreMod11[i];
    }

    return sumMod10 % 11 === 0 && sumMod11 % 11 === 0
        ? ok(felt)
        : feil(felt, 'familieforhold.annenForelder.fødselsnummer.feilmeldingEtterModSjekk');
};

const harFyltInnTall = (felt: IFelt): IFelt => {
    return /^[+-]?\d+(\.\d+)?$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.tall');
};

const harFyltInnGyldigAntallTimer = (felt: IFelt): IFelt => {
    const timer = parseFloat(felt.verdi);
    return timer >= 0 && timer <= 80
        ? ok(felt)
        : feil(felt, 'feilmelding.barnehageplass.timerIBarnehage');
};

const sokerHarIkkeSvartNeiTilknytningTilUtland = (felt: IFelt): IFelt => {
    return felt.verdi !== TilknytningTilUtlandVerdier.nei
        ? ok(felt)
        : advarsel(felt, 'tilknytningTilUtland.advarsel.nei.soker');
};

const annenForelderHarIkkeSvartNeiTilknytningTilUtland = (felt: IFelt): IFelt => {
    return felt.verdi !== TilknytningTilUtlandVerdier.nei
        ? ok(felt)
        : advarsel(felt, 'tilknytningTilUtland.advarsel.nei.annenForelder');
};

const harBekreftetOppsummering = (felt: IFelt): IFelt =>
    harSvartJa(felt, 'oppsummering.bekreftelse.feilmelding');

const harBekreftetVeiledning = (felt: IFelt): IFelt =>
    harSvartJa(felt, 'veiledningsside.bekreftelse.feilmelding');

const harSvartMedFeilmelding = (felt: IFelt): IFelt =>
    harSvart(felt, 'feilmelding.generell.feilmelding');

const harSvartJaMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartJa(felt, 'feilmelding.generell.feilmeldingCheckbox');

const harSvartTekstMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartTekst(felt, 'feilmelding.generell.feilmelding');

const harSvartMineBarnMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartTekst(felt, 'barn.feilmelding');

const harSvartOppgiInfoMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartTekst(felt, 'feilmelding.generell.oppgiInformasjon');

const harSvartTekstUnderAntallTegnMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartTekstUnderAntallTegn(felt, 'feilmelding.generell.forMangeTegn');

const harLastetOppVedlegg = (felt: IVedleggFelt): IVedleggFelt => {
    return felt.verdi.length ? ok(felt) : feil(felt, 'feilmelding.generell.vedlegg.mangler');
};

const svarUtenValidering = (felt: IFelt): IFelt => ok(felt);

export {
    annenForelderHarIkkeSvartNeiTilknytningTilUtland,
    erGyldigDato,
    fødselsnummerPassererMod10ogMod11Sjekk,
    harBekreftetOppsummering,
    harBekreftetVeiledning,
    harFyltInnDato,
    harFyltInnFødselsnummer,
    harFyltInnGyldigAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harLastetOppVedlegg,
    harSvart,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJa,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartMineBarnMedFeilmelding,
    harSvartOppgiInfoMedFeilmelding,
    harSvartTekstMedFeilmelding,
    harSvartTekstUnderAntallTegnMedFeilmelding,
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    harSvartTomtFødselsnummer,
    sokerHarIkkeSvartNeiTilknytningTilUtland,
    svarUtenValidering,
};
