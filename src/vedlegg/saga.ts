import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { soknadSettFelt } from '../soknad/actions';
import { selectFelt } from '../soknad/selectors';
import { IVedleggFelt, ValideringsStatus } from '../soknad/types';
import { IVedleggLastOpp, IVedleggSlett, VedleggTypeKeys } from './actions';
import { ILastOppVedleggRespons, lastOppVedlegg } from './api';
import { IVedlegg } from './types';

function* lastOppVedleggSaga(action: IVedleggLastOpp): SagaIterator {
    try {
        const eksisterendeFelt: IVedleggFelt = yield select(
            selectFelt,
            action.stegnavn,
            action.feltnavn
        );

        const midlertidigFiler = action.filer.map(
            (fil: File, i): IVedlegg => {
                return {
                    fil,
                    filnavn: '',
                    filreferanse: `midlertidig-ref-${i}`,
                    isLoading: true,
                };
            }
        );

        const midlertidigFelt: IVedleggFelt = {
            feilmeldingsNokkel: eksisterendeFelt.feilmeldingsNokkel,
            valideringsStatus: eksisterendeFelt.valideringsStatus,
            verdi: eksisterendeFelt.verdi.concat(midlertidigFiler),
        };

        yield put(soknadSettFelt(action.stegnavn, action.feltnavn, midlertidigFelt));

        const responses: ILastOppVedleggRespons[] = yield all(
            action.filer.map((fil: File) => call(lastOppVedlegg, fil))
        );

        const merged = action.filer.map(
            (fil: File, i): IVedlegg => {
                return {
                    fil,
                    filnavn: responses[i].filnavn,
                    filreferanse: responses[i].vedleggsId,
                    isLoading: false,
                };
            }
        );

        const vedleggFelt: IVedleggFelt = {
            feilmeldingsNokkel: '',
            valideringsStatus: ValideringsStatus.OK,
            verdi: eksisterendeFelt.verdi.concat(merged),
        };

        yield put(soknadSettFelt(action.stegnavn, action.feltnavn, vedleggFelt));
    } catch (e) {
        const eksisterendeFelt: IVedleggFelt = yield select(
            selectFelt,
            action.stegnavn,
            action.feltnavn
        );

        const vedleggFelt: IVedleggFelt = {
            feilmeldingsNokkel: 'feilmelding.generell.vedlegg.opplasting',
            valideringsStatus: ValideringsStatus.FEIL,
            verdi: eksisterendeFelt.verdi.filter((vedlegg: IVedlegg) => !vedlegg.isLoading),
        };

        yield put(soknadSettFelt(action.stegnavn, action.feltnavn, vedleggFelt));
    }
}

function* slettVedleggSaga(action: IVedleggSlett): SagaIterator {
    const felt: IVedleggFelt = yield select(selectFelt, action.stegnavn, action.feltnavn);

    const vedleggFelt: IVedleggFelt = {
        feilmeldingsNokkel: felt.feilmeldingsNokkel,
        valideringsStatus: felt.valideringsStatus,
        verdi: felt.verdi.filter(e => e.filreferanse !== action.filref),
    };

    yield put(soknadSettFelt(action.stegnavn, action.feltnavn, vedleggFelt));
}

function* vedleggSaga(): SagaIterator {
    yield takeEvery(VedleggTypeKeys.LAST_OPP, lastOppVedleggSaga);
    yield takeEvery(VedleggTypeKeys.SLETT, slettVedleggSaga);
}

export { vedleggSaga };
