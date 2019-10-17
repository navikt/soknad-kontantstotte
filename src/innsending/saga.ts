import { captureException, withScope } from '@sentry/core';
import { push } from 'connected-react-router';
import * as moment from 'moment';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { appEndreStatus } from '../app/actions';
import { selectValgtSprak } from '../app/selectors';
import { AppStatus, ISprak } from '../app/types';
import { selectBarn, selectIndeksForValgtBarn } from '../barn/selectors';
import { IBarn, IBarnDTO } from '../barn/types';
import { selectSoker } from '../soker/selectors';
import { ISoker } from '../soker/types';
import { selectSoknad } from '../soknad/selectors';
import { BarnehageplassVerdier, isIVedleggFelt, ISoknadState } from '../soknad/types';
import { IVedlegg } from '../vedlegg/types';
import { InnsendingTypeKeys, sendInnFeilet, sendInnOk } from './actions';
import { sendInnSamletSøknad } from './api';
import {
    IAktørArbeidYtelseUtland,
    IAktørTilknytningUtland,
    IKontraktBarn,
    IKontraktSøknad,
    IOppgittErklæring,
    IOppgittFamilieforhold,
    IOppgittUtlandsTilknytning,
    Standpunkt,
    toStandpunkt,
    toTilknytningTilUtlandVerdier,
} from './types';

function* mapStateToModel(): object {
    const soknad = yield select(selectSoknad);

    const strippetSoknad = Object.keys(soknad).reduce((acc: object, stegKey: string) => {
        return {
            ...acc,
            [stegKey]: {
                ...Object.keys(soknad[stegKey]).reduce((accFelt: object, feltKey) => {
                    if (isIVedleggFelt(soknad[stegKey][feltKey])) {
                        return {
                            ...accFelt,
                            [feltKey]: soknad[stegKey][feltKey].verdi.map((v: IVedlegg) => ({
                                filnavn: v.filnavn,
                                filreferanse: v.filreferanse,
                            })),
                        };
                    }
                    return { ...accFelt, [feltKey]: soknad[stegKey][feltKey].verdi };
                }, {}),
            },
        };
    }, {});

    const sprak = yield select(selectValgtSprak);
    return { ...strippetSoknad, sprak };
}

const mapStandpunktTilBoolean = (standpunkt: string): boolean => {
    if (standpunkt === Standpunkt.JA.toString()) {
        return true;
    } else {
        return false;
    }
};

const mapStateToKontraktSøknad = (
    barna?: IBarn[],
    indeksForValgtBarn?: string,
    soknad?: ISoknadState,
    språk?: ISprak,
    søker?: ISoker
): IKontraktSøknad => {
    if (!barna) {
        throw new Error('Barna fra state mangler');
    }

    if (!indeksForValgtBarn) {
        throw new Error('Valgt index for barn fra state mangler');
    }

    if (!soknad) {
        throw new Error('Søknad fra state mangler');
    }

    if (!språk) {
        throw new Error('Språk fra state mangler');
    }

    if (!søker) {
        throw new Error('Søker fra state mangler');
    }

    const oppgittAnnenPartFødselsnummer: string =
        soknad.familieforhold.annenForelderFødselsnummer.verdi;

    const oppgittErklæring: IOppgittErklæring = {
        isBarnINorgeNeste12Måneder: mapStandpunktTilBoolean(
            soknad.kravTilSoker.barnIkkeHjemme.verdi
        ),
        isBarnetHjemmeværendeOgIkkeAdoptert: mapStandpunktTilBoolean(
            soknad.kravTilSoker.barnIkkeHjemme.verdi
        ),
        isBorSammenMedBarnet: mapStandpunktTilBoolean(soknad.kravTilSoker.borSammenMedBarnet.verdi),
        isIkkeAvtaltDeltBosted: mapStandpunktTilBoolean(
            soknad.kravTilSoker.ikkeAvtaltDeltBosted.verdi
        ),
    };

    let barnehageAntallTimer = 0;
    let barnehageDato = '';
    let barnehageKommune = '';
    let vedlegg: string[] = [];
    switch (soknad.barnehageplass.barnBarnehageplassStatus.verdi) {
        case BarnehageplassVerdier.harBarnehageplass:
            barnehageAntallTimer = parseFloat(
                soknad.barnehageplass.harBarnehageplassAntallTimer.verdi
            );
            barnehageDato = mapNorskDatoTilIso(soknad.barnehageplass.harBarnehageplassDato.verdi);
            barnehageKommune = soknad.barnehageplass.harBarnehageplassKommune.verdi;
            break;
        case BarnehageplassVerdier.harSluttetIBarnehage:
            barnehageAntallTimer = parseFloat(
                soknad.barnehageplass.harSluttetIBarnehageAntallTimer.verdi
            );
            barnehageDato = mapNorskDatoTilIso(
                soknad.barnehageplass.harSluttetIBarnehageDato.verdi
            );
            barnehageKommune = soknad.barnehageplass.harSluttetIBarnehageKommune.verdi;
            vedlegg = soknad.barnehageplass.harSluttetIBarnehageVedlegg.verdi.map(
                mapVedlegg => mapVedlegg.filreferanse
            );
            break;
        case BarnehageplassVerdier.skalSlutteIBarnehage:
            barnehageAntallTimer = parseFloat(
                soknad.barnehageplass.skalSlutteIBarnehageAntallTimer.verdi
            );
            barnehageDato = mapNorskDatoTilIso(
                soknad.barnehageplass.skalSlutteIBarnehageDato.verdi
            );
            barnehageKommune = soknad.barnehageplass.skalSlutteIBarnehageKommune.verdi;
            vedlegg = soknad.barnehageplass.skalSlutteIBarnehageVedlegg.verdi.map(
                mapVedlegg => mapVedlegg.filreferanse
            );
            break;
        case BarnehageplassVerdier.skalBegynneIBarnehage:
            barnehageAntallTimer = parseFloat(
                soknad.barnehageplass.skalBegynneIBarnehageAntallTimer.verdi
            );
            barnehageDato = mapNorskDatoTilIso(
                soknad.barnehageplass.skalBegynneIBarnehageDato.verdi
            );
            barnehageKommune = soknad.barnehageplass.skalBegynneIBarnehageKommune.verdi;
            break;
    }

    const oppgittFamilieforhold: IOppgittFamilieforhold = {
        barna: new Set(
            barna[parseInt(indeksForValgtBarn, 10)].barn.map(
                (barn: IBarnDTO): IKontraktBarn => ({
                    barnehageAntallTimer,
                    barnehageDato,
                    barnehageKommune,
                    barnehageStatus: soknad.barnehageplass.barnBarnehageplassStatus.verdi,
                    barnehageVedlegg: vedlegg,
                    fødselsnummer: barn.fødselsnummer,
                    navn: barn.fulltnavn,
                })
            )
        ),
        borBeggeForeldreSammen: mapStandpunktTilBoolean(
            soknad.familieforhold.borForeldreneSammenMedBarnet.verdi
        ),
        oppgittAnnenPartNavn: soknad.familieforhold.annenForelderNavn.verdi,
    };

    const oppgittUtlandsTilknytning: IOppgittUtlandsTilknytning = {
        aktørerArbeidYtelseIUtlandet: new Set([
            mapAktørArbeidYtelseUtland(soknad, søker.innloggetSom, false),
        ]),
        aktørerTilknytningTilUtlandet: new Set([
            mapAktørTilknytningUtland(soknad, søker.innloggetSom, false),
        ]),
    };

    if (oppgittAnnenPartFødselsnummer !== '') {
        oppgittUtlandsTilknytning.aktørerArbeidYtelseIUtlandet.add(
            mapAktørArbeidYtelseUtland(soknad, oppgittAnnenPartFødselsnummer, true)
        );
        oppgittUtlandsTilknytning.aktørerTilknytningTilUtlandet.add(
            mapAktørTilknytningUtland(soknad, oppgittAnnenPartFødselsnummer, true)
        );
    }

    const utcOffset = moment.tz('Europe/Paris').utcOffset();
    const kontraktSøknad: IKontraktSøknad = {
        innsendtTidspunkt: moment
            .utc()
            .add(utcOffset, 'minutes')
            .toISOString(),
        oppgittAnnenPartFødselsnummer,
        oppgittErklæring,
        oppgittFamilieforhold,
        oppgittUtlandsTilknytning,
        språk,
        søkerFødselsnummer: søker.innloggetSom,
    };

    return kontraktSøknad;
};

const mapAktørArbeidYtelseUtland = (
    soknad: ISoknadState,
    fødselsnummer: string,
    annenPart: boolean
): IAktørArbeidYtelseUtland => {
    return {
        arbeidIUtlandet: !annenPart
            ? toStandpunkt(soknad.arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkel.verdi)
            : toStandpunkt(soknad.arbeidIUtlandet.arbeiderAnnenForelderIUtlandet.verdi),
        arbeidIUtlandetForklaring: !annenPart
            ? soknad.arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkelForklaring.verdi
            : soknad.arbeidIUtlandet.arbeiderAnnenForelderIUtlandetForklaring.verdi,
        fødselsnummer,
        kontantstøtteIUtlandet: !annenPart
            ? toStandpunkt(soknad.utenlandskKontantstotte.mottarKontantstotteFraUtlandet.verdi)
            : Standpunkt.UBESVART,
        kontantstøtteIUtlandetForklaring: !annenPart
            ? soknad.utenlandskKontantstotte.mottarKontantstotteFraUtlandetTilleggsinfo.verdi
            : '',
        ytelseIUtlandet: !annenPart
            ? toStandpunkt(soknad.utenlandskeYtelser.mottarYtelserFraUtland.verdi)
            : toStandpunkt(soknad.utenlandskeYtelser.mottarAnnenForelderYtelserFraUtland.verdi),
        ytelseIUtlandetForklaring: !annenPart
            ? soknad.utenlandskeYtelser.mottarYtelserFraUtlandForklaring.verdi
            : soknad.utenlandskeYtelser.mottarAnnenForelderYtelserFraUtlandForklaring.verdi,
    };
};

const mapAktørTilknytningUtland = (
    soknad: ISoknadState,
    fødselsnummer: string,
    annenPart: boolean
): IAktørTilknytningUtland => {
    return {
        boddEllerJobbetINorgeMinstFemAar: !annenPart
            ? toTilknytningTilUtlandVerdier(
                  soknad.tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.verdi
              )
            : toTilknytningTilUtlandVerdier(
                  soknad.tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar.verdi
              ),
        boddEllerJobbetINorgeMinstFemAarForklaring: !annenPart
            ? soknad.tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAarForklaring.verdi
            : soknad.tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring
                  .verdi,
        fødselsnummer,
    };
};

const mapNorskDatoTilIso = (dato: string) => {
    return moment(dato, 'DD.MM.YYYY').format('YYYY-MM-DD');
};

function* sendInnSaga(): SagaIterator {
    try {
        const barna = yield select(selectBarn);
        const indexForValgtBarn = yield select(selectIndeksForValgtBarn);
        const stateSoknad = yield select(selectSoknad);
        const språk = yield select(selectValgtSprak);
        const søker = yield select(selectSoker);

        const kontraktSøknad: IKontraktSøknad = mapStateToKontraktSøknad(
            barna,
            indexForValgtBarn,
            stateSoknad,
            språk,
            søker
        );

        const soknad = yield call(mapStateToModel);
        if (!soknad || !kontraktSøknad) {
            throw new Error('Søknad mangler etter mapping ved innsending');
        }
        const dato = yield call(sendInnSamletSøknad, soknad, kontraktSøknad);
        if (!dato) {
            throw new Error('Dato mangler etter innsending. Innsending har trolig feilet');
        }
        yield put(sendInnOk(dato));
        yield put(push('/kvittering'));
    } catch (error) {
        if (process.env.NODE_ENV !== 'development') {
            withScope(scope => {
                scope.setExtra('melding', 'Innsending av søknad feilet');
                captureException(error);
            });
        }

        yield put(sendInnFeilet());
        yield put(appEndreStatus(AppStatus.FEILSITUASJON));
        yield put(push('/innsending-feilet'));
    }
}

function* innsendingSaga(): SagaIterator {
    yield takeEvery(InnsendingTypeKeys.SENDINN, sendInnSaga);
}

export { sendInnSaga, innsendingSaga };
