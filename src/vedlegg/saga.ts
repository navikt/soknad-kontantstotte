import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { soknadSettFelt } from '../soknad/actions';
import { IVedleggFelt, ValideringsStatus } from '../soknad/types';
import { IVedleggLastOpp, VedleggTypeKeys } from './actions';
import { ILastOppVedleggRespons, lastOppVedlegg } from './api';
import { IVedlegg } from './types';

function* lastOppVedleggSaga(action: IVedleggLastOpp): SagaIterator {
    try {
        const responses: ILastOppVedleggRespons[] = yield all(
            action.filer.map((fil: File) => call(lastOppVedlegg, fil))
        );

        const merged = action.filer.map(
            (fil: File, i): IVedlegg => {
                return {
                    fil,
                    filnavn: responses[i].filnavn,
                    filreferanse: responses[i].vedleggsId,
                };
            }
        );

        const vedleggFelt: IVedleggFelt = {
            feilmeldingsNokkel: '',
            valideringsStatus: ValideringsStatus.OK,
            verdi: merged,
        };

        yield put(soknadSettFelt(action.stegnavn, action.feltnavn, vedleggFelt));
    } catch (e) {
        console.error('noe gikk galt: ', e);
    }
}

function* vedleggSaga(): SagaIterator {
    yield takeEvery(VedleggTypeKeys.LAST_OPP, lastOppVedleggSaga);
}

export { vedleggSaga };
