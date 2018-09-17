import {
    BarnehageplassVerdier,
    IArbeidsforhold,
    IBarnehageplass,
    IFamilieforhold,
    IFelt,
    IUtenlandskeYtelser,
    Stegnavn,
    Svar,
    ValideringsStatus,
} from './types';

function harListeMedFeltFeil(feltForSteg: IFelt[]): boolean {
    return feltForSteg.reduce((acc: boolean, felt: IFelt) => {
        return acc || felt.valideringsStatus !== ValideringsStatus.OK;
    }, false);
}

function* sjekkValideringForSteg(stegnavn: Stegnavn, soknadState: any) {
    return harListeMedFeltFeil(Object.values(soknadState[stegnavn]));
}

function* sjekkValideringForArbeidsforhold(arbeidsforhold: IArbeidsforhold) {
    let harFeil = false;
    if (arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkelForklaring.verdi.length === 0;
    } else if (arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.verdi === Svar.UBESVART) {
        return true;
    }

    if (arbeidsforhold.mottarYtelserFraUtlandet.verdi === Svar.JA) {
        harFeil = harFeil || arbeidsforhold.mottarYtelserFraUtlandetForklaring.verdi.length === 0;
    } else if (arbeidsforhold.mottarYtelserFraUtlandet.verdi === Svar.UBESVART) {
        return true;
    }

    return harFeil;
}

function* sjekkValideringForBarnehageplass(barnehageplass: IBarnehageplass) {
    const barnehageplassStatus: BarnehageplassVerdier = barnehageplass.barnBarnehageplassStatus
        .verdi as BarnehageplassVerdier;

    if (barnehageplass.harBarnehageplass.verdi !== Svar.UBESVART) {
        switch (barnehageplassStatus) {
            case BarnehageplassVerdier.garIkkeIBarnehage:
                return;

            case BarnehageplassVerdier.harBarnehageplass:
                return;

            case BarnehageplassVerdier.skalBegynneIBarnehage:
                return;

            case BarnehageplassVerdier.skalSlutteIBarnehage:
                return;

            case BarnehageplassVerdier.harSluttetIBarnehage:
                if (
                    barnehageplass.harSluttetIBarnehageKommune.verdi.length > 0 &&
                    barnehageplass.harSluttetIBarnehageDato.verdi.length > 0 &&
                    barnehageplass.harSluttetIBarnehageAntallTimer.verdi.length > 0
                ) {
                    return;
                }
                break;

            default:
                return harListeMedFeltFeil(Object.values(barnehageplass));
        }
    }

    return harListeMedFeltFeil(Object.values(barnehageplass));
}

function* sjekkValideringForFamilieforhold(familieforhold: IFamilieforhold) {
    if (familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.NEI) {
        return false;
    } else {
        return harListeMedFeltFeil(Object.values(familieforhold));
    }
}

function* sjekkValideringForUtenlandskeYtelser(
    familieforhold: IFamilieforhold,
    utenlandsYtelser: IUtenlandskeYtelser
) {
    let harFeil =
        utenlandsYtelser.mottarYtelserFraUtland.valideringsStatus !== ValideringsStatus.OK;

    if (utenlandsYtelser.mottarYtelserFraUtland.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            utenlandsYtelser.mottarYtelserFraUtlandForklaring.valideringsStatus !==
                ValideringsStatus.OK;
    }

    if (familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            utenlandsYtelser.mottarAnnenForelderYtelserFraUtland.valideringsStatus !==
                ValideringsStatus.OK;

        if (utenlandsYtelser.mottarAnnenForelderYtelserFraUtland.verdi === Svar.JA) {
            harFeil =
                harFeil ||
                utenlandsYtelser.mottarAnnenForelderYtelserFraUtlandForklaring.valideringsStatus !==
                    ValideringsStatus.OK;
        }
    }

    return harFeil;
}

export {
    sjekkValideringForSteg,
    sjekkValideringForArbeidsforhold,
    sjekkValideringForBarnehageplass,
    sjekkValideringForFamilieforhold,
    sjekkValideringForUtenlandskeYtelser,
};
