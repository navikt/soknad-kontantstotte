import { OmBarnaDineSpørsmålId } from '../components/SøknadsSteg/OmBarnaDine/spørsmål';
import { OmDegSpørsmålId } from '../components/SøknadsSteg/OmDeg/spørsmål';
import { genererInitiellDokumentasjon } from '../utils/dokumentasjon';
import { Dokumentasjonsbehov } from './dokumentasjon';
import { ESivilstand } from './person';
export var ESøknadstype;
(function (ESøknadstype) {
    ESøknadstype["ORDIN\u00C6R"] = "ORDIN\u00C6R";
    ESøknadstype["UTVIDET"] = "UTVIDET";
})(ESøknadstype || (ESøknadstype = {}));
export const søknadstyper = {
    ORDINÆR: {
        id: 'ORDINÆR',
        navn: 'Ordinær barnetrygd',
    },
    UTVIDET: {
        id: 'UTVIDET',
        navn: 'Utvidet barnetrygd',
    },
};
export const initialStateSøknad = {
    søknadstype: ESøknadstype.ORDINÆR,
    barnInkludertISøknaden: [],
    lestOgForståttBekreftelse: false,
    barnRegistrertManuelt: [],
    dokumentasjon: [
        genererInitiellDokumentasjon(Dokumentasjonsbehov.AVTALE_DELT_BOSTED, 'dokumentasjon.deltbosted.vedleggtittel', 'dokumentasjon.deltbosted.informasjon'),
        genererInitiellDokumentasjon(Dokumentasjonsbehov.VEDTAK_OPPHOLDSTILLATELSE, 'dokumentasjon.oppholdstillatelse.vedleggtittel', 'dokumentasjon.oppholdstillatelse.informasjon'),
        genererInitiellDokumentasjon(Dokumentasjonsbehov.ADOPSJON_DATO, 'dokumentasjon.adopsjon.vedleggtittel', 'dokumentasjon.adopsjon.informasjon'),
        genererInitiellDokumentasjon(Dokumentasjonsbehov.BEKREFTELSE_FRA_BARNEVERN, 'dokumentasjon.bekreftelsebarnevernet.vedleggtittel', 'dokumentasjon.bekreftelsebarnevernet.informasjon'),
        genererInitiellDokumentasjon(Dokumentasjonsbehov.BOR_FAST_MED_SØKER, 'dokumentasjon.bekreftelseborsammen.vedleggtittel', 'dokumentasjon.bekreftelseborsammen.informasjon'),
        genererInitiellDokumentasjon(Dokumentasjonsbehov.ANNEN_DOKUMENTASJON, 'dokumentasjon.annendokumentasjon.vedleggtittel', 'dokumentasjon.annendokumentasjon.informasjon'),
    ],
    søker: {
        navn: '',
        barn: [],
        statsborgerskap: [],
        ident: '',
        sivilstand: { type: ESivilstand.UOPPGITT },
        adressebeskyttelse: false,
        adresse: {
            adressenavn: '',
            husbokstav: '',
            husnummer: '',
            bruksenhetsnummer: '',
            postnummer: '',
            poststed: '',
        },
        borPåRegistrertAdresse: {
            id: OmDegSpørsmålId.borPåRegistrertAdresse,
            svar: undefined,
        },
        telefonnummer: {
            id: OmDegSpørsmålId.telefonnummer,
            svar: '',
        },
        oppholderSegINorge: {
            id: OmDegSpørsmålId.oppholderSegINorge,
            svar: undefined,
        },
        oppholdsland: {
            id: OmDegSpørsmålId.oppholdsland,
            svar: '',
        },
        oppholdslandDato: {
            id: OmDegSpørsmålId.oppholdslandDato,
            svar: '',
        },
        værtINorgeITolvMåneder: {
            id: OmDegSpørsmålId.værtINorgeITolvMåneder,
            svar: undefined,
        },
        komTilNorgeDato: {
            id: OmDegSpørsmålId.komTilNorgeDato,
            svar: '',
        },
        planleggerÅBoINorgeTolvMnd: {
            id: OmDegSpørsmålId.planleggerÅBoINorgeTolvMnd,
            svar: undefined,
        },
        erAsylsøker: {
            id: OmDegSpørsmålId.erAsylsøker,
            svar: undefined,
        },
        jobberPåBåt: {
            id: OmDegSpørsmålId.jobberPåBåt,
            svar: undefined,
        },
        arbeidsland: {
            id: OmDegSpørsmålId.arbeidsland,
            svar: '',
        },
        mottarUtenlandspensjon: {
            id: OmDegSpørsmålId.mottarUtenlandspensjon,
            svar: undefined,
        },
        pensjonsland: {
            id: OmDegSpørsmålId.pensjonsland,
            svar: '',
        },
    },
    erNoenAvBarnaFosterbarn: {
        id: OmBarnaDineSpørsmålId.erNoenAvBarnaFosterbarn,
        svar: undefined,
    },
    oppholderBarnSegIInstitusjon: {
        id: OmBarnaDineSpørsmålId.oppholderBarnSegIInstitusjon,
        svar: undefined,
    },
    erBarnAdoptertFraUtland: {
        id: OmBarnaDineSpørsmålId.erBarnAdoptertFraUtland,
        svar: undefined,
    },
    oppholderBarnSegIUtland: {
        id: OmBarnaDineSpørsmålId.oppholderBarnSegIUtland,
        svar: undefined,
    },
    søktAsylForBarn: {
        id: OmBarnaDineSpørsmålId.søktAsylForBarn,
        svar: undefined,
    },
    barnOppholdtSegTolvMndSammenhengendeINorge: {
        id: OmBarnaDineSpørsmålId.barnOppholdtSegTolvMndSammenhengendeINorge,
        svar: undefined,
    },
    mottarBarnetrygdForBarnFraAnnetEøsland: {
        id: OmBarnaDineSpørsmålId.mottarBarnetrygdForBarnFraAnnetEøsland,
        svar: undefined,
    },
};
//# sourceMappingURL=s%C3%B8knad.js.map