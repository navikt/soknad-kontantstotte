import { TilknytningTilUtlandVerdier } from '../soknad/types';

export enum Standpunkt {
    JA = 'JA',
    NEI = 'NEI',
    UBESVART = 'UBESVART',
}

export const toStandpunkt = (standpunkt: string): Standpunkt => {
    return standpunkt as Standpunkt;
};

export const toTilknytningTilUtlandVerdier = (tilknytningTilUtland: string) => {
    return tilknytningTilUtland as TilknytningTilUtlandVerdier;
};

export interface IKontraktSøknad {
    innsendtTidspunkt: string;
    oppgittAnnenPartFødselsnummer: string;
    oppgittErklæring: IOppgittErklæring;
    oppgittFamilieforhold: IOppgittFamilieforhold;
    oppgittUtlandsTilknytning: IOppgittUtlandsTilknytning;
    søkerFødselsnummer: string;
}

export interface IKontraktBarn {
    barnehageAntallTimer: number;
    barnehageDato: string;
    barnehageKommune: string;
    barnehageStatus: string;
    fødselsnummer: string;
    vedlegg: string[];
}

export interface IOppgittFamilieforhold {
    barna: Set<IKontraktBarn>;
    borBeggeForeldreSammen: boolean;
}

export interface IAktørArbeidYtelseUtland {
    aktørId?: string;
    arbeidIUtlandet: Standpunkt;
    arbeidIUtlandetForklaring: string;
    fødselsnummer: string;
    kontantstøtteIUtlandet: Standpunkt;
    kontantstøtteIUtlandetForklaring: string;
    ytelseIUtlandet: Standpunkt;
    ytelseIUtlandetForklaring: string;
}

export interface IAktørTilknytningUtland {
    aktørId?: string;
    boddEllerJobbetINorgeMinstFemAar: TilknytningTilUtlandVerdier;
    boddEllerJobbetINorgeMinstFemAarForklaring: string;
    fødselsnummer: string;
}

export interface IOppgittUtlandsTilknytning {
    aktørerArbeidYtelseIUtlandet: Set<IAktørArbeidYtelseUtland>;
    aktørerTilknytningTilUtlandet: Set<IAktørTilknytningUtland>;
}

export interface IOppgittErklæring {
    isBarnetHjemmeværendeOgIkkeAdoptert: boolean;
    isBorSammenMedBarnet: boolean;
    isIkkeAvtaltDeltBosted: boolean;
    isBarnINorgeNeste12Måneder: boolean;
}
