import {
    arbeidIUtlandetFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    oppsummeringFeltnavn,
    tilknytningTilUtlandFeltnavn,
    utenlandskeYtelserFeltnavn,
    utenlandskKontantstotteFeltnavn,
    veiledningFeltnavn,
} from './types';
import {
    annenForelderHarIkkeSvartNeiTilknytningTilUtland,
    harBekreftetOppsummering,
    harBekreftetVeiledning,
    harFyltInnDato,
    harFyltInnFodselsnummer,
    harFyltInnGyldigAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartTekstMedFeilmelding,
    harSvartTekstUnderAntallTegnMedFeilmelding,
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    sokerHarIkkeSvartNeiTilknytningTilUtland,
    svarUtenValidering,
} from './validators';

interface IValideringsConfig {
    arbeidIUtlandet: { [felt in arbeidIUtlandetFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    barnehageplass: { [felt in barnehageplassFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    familieforhold: { [felt in familieforholdFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    mineBarn: { [felt in minebarnFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    oppsummering: { [felt in oppsummeringFeltnavn]: Array<((felt: IFelt) => IFelt)> };
    utenlandskKontantstotte: {
        [felt in utenlandskKontantstotteFeltnavn]: Array<((felt: IFelt) => IFelt)>
    };
    tilknytningTilUtland: {
        [felt in tilknytningTilUtlandFeltnavn]: Array<((felt: IFelt) => IFelt)>
    };
    veiledning: { [felt in veiledningFeltnavn]: Array<((felt: IFelt) => IFelt)> };
}

const valideringsConfig: IValideringsConfig = {
    arbeidIUtlandet: {
        arbeiderAnnenForelderIUtlandet: [harSvartMedFeilmelding],
        arbeiderAnnenForelderIUtlandetForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        arbeiderIUtlandetEllerKontinentalsokkel: [harSvartMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    barnehageplass: {
        barnBarnehageplassStatus: [harSvartBarnehageplassVerdiMedFeilmelding],
        harBarnehageplass: [harSvartMedFeilmelding],
        harBarnehageplassAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harBarnehageplassDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        harBarnehageplassKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harSluttetIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        harSluttetIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalBegynneIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        skalBegynneIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalSlutteIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        skalSlutteIBarnehageKommune: [harSvartTekstMedFeilmelding],
    },
    familieforhold: {
        annenForelderFodselsnummer: [harSvartTekstMedFeilmelding, harFyltInnFodselsnummer],
        annenForelderNavn: [harFyltInnNavn],
        borForeldreneSammenMedBarnet: [harSvartMedFeilmelding],
    },
    kravTilSoker: {
        barnIkkeHjemme: [harSvartJaMedFeilmelding],
        boddEllerJobbetINorgeSisteFemAar: [harSvartJaMedFeilmelding],
        borSammenMedBarnet: [harSvartJaMedFeilmelding],
        ikkeAvtaltDeltBosted: [harSvartJaMedFeilmelding],
        norskStatsborger: [harSvartJaMedFeilmelding],
        skalBoMedBarnetINorgeNesteTolvMaaneder: [harSvartJaMedFeilmelding],
    },
    mineBarn: {
        erFlerling: [svarUtenValidering],
        fodselsdato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        navn: [harFyltInnNavn],
    },
    oppsummering: {
        bekreftelse: [harBekreftetOppsummering],
    },
    tilknytningTilUtland: {
        annenForelderBoddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
            annenForelderHarIkkeSvartNeiTilknytningTilUtland,
        ],
        annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        boddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
            sokerHarIkkeSvartNeiTilknytningTilUtland,
        ],
        boddEllerJobbetINorgeMinstFemAarForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: [harSvartMedFeilmelding],
        mottarKontantstotteFraUtlandetTilleggsinfo: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: [harSvartMedFeilmelding],
        mottarAnnenForelderYtelserFraUtlandForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        mottarYtelserFraUtland: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    veiledning: {
        bekreftelse: [harBekreftetVeiledning],
    },
};

export default valideringsConfig;
