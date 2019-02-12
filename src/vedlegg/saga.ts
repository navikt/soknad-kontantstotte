import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
    soknadErstattVedlegg,
    soknadFjernVedlegg,
    soknadLeggTilVedlegg,
    soknadSettFelt,
} from '../soknad/actions';
import { selectFelt } from '../soknad/selectors';
import { Feltnavn, Stegnavn, ValideringsStatus } from '../soknad/types';
import { IVedleggLastOpp, VedleggTypeKeys } from './actions';
import { ILastOppVedleggRespons, lastOppVedlegg } from './api';
import { IVedlegg } from './types';

function* lastOppEnkeltVedleggSaga(
    stegnavn: Stegnavn,
    feltnavn: Feltnavn,
    fil: File
): SagaIterator {
    const tempRef = Math.random()
        .toString(36)
        .substring(7);

    const midlertidigVedlegg: IVedlegg = {
        fil,
        filnavn: '',
        filreferanse: tempRef,
        isLoading: true,
    };

    yield put(soknadLeggTilVedlegg(stegnavn, feltnavn, midlertidigVedlegg));

    try {
        const response: ILastOppVedleggRespons = yield call(lastOppVedlegg, fil);

        const oppdatertVedlegg: IVedlegg = {
            fil,
            filnavn: response.filnavn,
            filreferanse: response.vedleggsId,
            isLoading: false,
        };

        yield put(soknadErstattVedlegg(stegnavn, feltnavn, tempRef, oppdatertVedlegg));

        return response;
    } catch (e) {
        yield put(soknadFjernVedlegg(stegnavn, feltnavn, tempRef));

        return {
            status: e.response.status,
        };
    }
}

function* lastOppVedleggSaga(action: IVedleggLastOpp): SagaIterator {
    const responses = yield all(
        action.filer.map((fil: File) =>
            call(lastOppEnkeltVedleggSaga, action.stegnavn, action.feltnavn, fil)
        )
    );
}

function* vedleggSaga(): SagaIterator {
    yield takeEvery(VedleggTypeKeys.LAST_OPP, lastOppVedleggSaga);
}

export { vedleggSaga };
