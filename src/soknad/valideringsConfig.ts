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
} from './types';
import {
    harBekreftetOppsummering,
    harFyltInnDato,
    harFyltInnFodselsnummer,
    harFyltInnGyldigAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harGyldigDato,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartTekstMedFeilmelding,
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
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
}

const valideringsConfig: IValideringsConfig = {
    arbeidIUtlandet: {
        arbeiderAnnenForelderIUtlandet: [harSvartMedFeilmelding],
        arbeiderAnnenForelderIUtlandetForklaring: [harSvartTekstMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkel: [harSvartMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: [harSvartTekstMedFeilmelding],
    },
    barnehageplass: {
        barnBarnehageplassStatus: [harSvartBarnehageplassVerdiMedFeilmelding],
        harBarnehageplass: [harSvartMedFeilmelding],
        harBarnehageplassAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harBarnehageplassDato: [harSvartTekstMedFeilmelding, harFyltInnDato, harGyldigDato],
        harBarnehageplassKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harSluttetIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato, harGyldigDato],
        harSluttetIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalBegynneIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalBegynneIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato, harGyldigDato],
        skalBegynneIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalSlutteIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato, harGyldigDato],
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
        fodselsdato: [harSvartTekstMedFeilmelding, harFyltInnDato, harGyldigDato],
        navn: [harFyltInnNavn],
    },
    oppsummering: {
        bekreftelse: [harBekreftetOppsummering],
    },
    tilknytningTilUtland: {
        annenForelderBoddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
        ],
        annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: [harSvartTekstMedFeilmelding],
        boddEllerJobbetINorgeMinstFemAar: [harSvartTilknytningTilUtlandVerdiMedFeilmelding],
        boddEllerJobbetINorgeMinstFemAarForklaring: [harSvartTekstMedFeilmelding],
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: [harSvartMedFeilmelding],
        mottarKontantstotteFraUtlandetTilleggsinfo: [harSvartTekstMedFeilmelding],
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: [harSvartMedFeilmelding],
        mottarAnnenForelderYtelserFraUtlandForklaring: [harSvartTekstMedFeilmelding],
        mottarYtelserFraUtland: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandForklaring: [harSvartTekstMedFeilmelding],
    },
};

export default valideringsConfig;
