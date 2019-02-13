import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { appEndreStatus } from '../app/actions';
import { AppStatus } from '../app/types';
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

enum Status {
    OK,
    VEDLEGG_FOR_STORT,
    SYSTEMFEIL,
}

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

        return Status.OK;
    } catch (e) {
        yield put(soknadFjernVedlegg(stegnavn, feltnavn, tempRef));

        if (e.response.status === 413) {
            return Status.VEDLEGG_FOR_STORT;
        }

        return Status.SYSTEMFEIL;
    }
}

function* lastOppVedleggSaga(action: IVedleggLastOpp): SagaIterator {
    const opplastingStatus: Status[] = yield all(
        action.filer.map((fil: File) =>
            call(lastOppEnkeltVedleggSaga, action.stegnavn, action.feltnavn, fil)
        )
    );

    for (const status of opplastingStatus) {
        switch (status) {
            case Status.SYSTEMFEIL:
                yield put(appEndreStatus(AppStatus.FEILSITUASJON));
                yield put(push('/vedlegg-opplasting-feilet'));
                return;
            case Status.VEDLEGG_FOR_STORT:
                console.log('må gjøre noe lurt her');
        }
    }
}

function* vedleggSaga(): SagaIterator {
    yield takeEvery(VedleggTypeKeys.LAST_OPP, lastOppVedleggSaga);
}

export { vedleggSaga };
