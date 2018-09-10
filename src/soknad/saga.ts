import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { appNesteSteg, appSettHarForsoktNesteSteg } from '../app/actions';
import { selectAppSteg } from '../app/selectors';
import { ISteg, stegConfig } from '../stegConfig';
import {
    ISoknadValiderFelt,
    ISoknadValiderSteg,
    soknadSettFelt,
    SoknadTypeKeys,
    soknadValiderFelt,
    soknadValiderSteg,
} from './actions';
import { selectSoknad } from './selectors';
import {
    arbeidsforholdFeltnavn,
    barnehageplassFeltnavn,
    BarnehageplassVerdier,
    familieforholdFeltnavn,
    Feltnavn,
    IFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    Stegnavn,
    Svar,
    ValideringsStatus,
} from './types';
import valideringsConfig from './valideringsConfig';

function* validerFeltSaga(action: ISoknadValiderFelt): SagaIterator {
    const soknadState = yield select(selectSoknad);
    const feltMedOppdatertVerdi = {
        ...soknadState[action.stegnavn][action.feltnavn],
        verdi: action.verdi,
    };

    let validertFelt: IFelt = {
        feilmeldingsNokkel: '',
        valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
        verdi: '',
    };
    switch (action.stegnavn) {
        case 'arbeidsforhold':
            validertFelt = valideringsConfig.arbeidsforhold[
                action.feltnavn as arbeidsforholdFeltnavn
            ](feltMedOppdatertVerdi);
            break;
        case 'barnehageplass':
            validertFelt = valideringsConfig.barnehageplass[
                action.feltnavn as barnehageplassFeltnavn
            ](feltMedOppdatertVerdi);
            break;
        case 'familieforhold':
            validertFelt = valideringsConfig.familieforhold[
                action.feltnavn as familieforholdFeltnavn
            ](feltMedOppdatertVerdi);
            break;
        case 'kravTilSoker':
            validertFelt = valideringsConfig.kravTilSoker[action.feltnavn as kravTilSokerFeltnavn](
                feltMedOppdatertVerdi
            );
            break;
        case 'mineBarn':
            validertFelt = valideringsConfig.mineBarn[action.feltnavn as minebarnFeltnavn](
                feltMedOppdatertVerdi
            );
    }

    yield put(soknadSettFelt(action.stegnavn, action.feltnavn, validertFelt));
}

function* validerSteg(action: ISoknadValiderSteg) {
    const stegnavn = action.stegnavn;
    const soknadState = yield select(selectSoknad);

    yield all(
        Object.keys(soknadState[stegnavn]).map((feltKey: string) => {
            return call(
                validerFeltSaga,
                soknadValiderFelt(
                    stegnavn,
                    feltKey as Feltnavn,
                    soknadState[stegnavn][feltKey].verdi
                )
            );
        })
    );
}

function harListeMedFeltFeil(feltForSteg: IFelt[]): boolean {
    return Object.values(feltForSteg).reduce((acc: boolean, felt: IFelt) => {
        return acc || felt.valideringsStatus !== ValideringsStatus.OK;
    }, false);
}

function* sjekkValideringForSteg(stegnavn: Stegnavn) {
    const soknadState = yield select(selectSoknad);

    return harListeMedFeltFeil(soknadState[stegnavn]);
}

function* sjekkValideringForFamilieforhold(stegnavn: Stegnavn) {
    const soknadState = yield select(selectSoknad);

    if (soknadState[stegnavn]['borForeldreneSammenMedBarnet' as Stegnavn].verdi === Svar.NEI) {
        return false;
    } else {
        return harListeMedFeltFeil(soknadState[stegnavn]);
    }
}

function* sjekkValideringForBarnehageplass(stegnavn: Stegnavn) {
    const soknadState = yield select(selectSoknad);

    if (
        soknadState[stegnavn]['harBarnehageplass' as Stegnavn].verdi === BarnehageplassVerdier.Nei
    ) {
        return false;
    } else if (
        soknadState[stegnavn]['harBarnehageplass' as Stegnavn].verdi ===
        BarnehageplassVerdier.NeiHarFaatt
    ) {
        return (
            soknadState[stegnavn]['dato' as Stegnavn].valideringsStatus !== ValideringsStatus.OK &&
            soknadState[stegnavn]['kommune' as Stegnavn].valideringsStatus !== ValideringsStatus.OK
        );
    } else {
        return harListeMedFeltFeil(soknadState[stegnavn]);
    }
}

function* nesteStegSaga() {
    const appSteg = yield select(selectAppSteg);
    const tilSide: ISteg = Object.values(stegConfig).find(
        (side: ISteg) => side.stegIndeks === appSteg
    );
    let harFeil: boolean = false;

    yield put(soknadValiderSteg(tilSide.key as Stegnavn));
    switch (tilSide.key as Stegnavn) {
        case 'familieforhold':
            harFeil = yield call(sjekkValideringForFamilieforhold, tilSide.key as Stegnavn);
            break;
        case 'barnehageplass':
            harFeil = yield call(sjekkValideringForBarnehageplass, tilSide.key as Stegnavn);
            break;
        default:
            harFeil = yield call(sjekkValideringForSteg, tilSide.key as Stegnavn);
    }

    yield put(appSettHarForsoktNesteSteg(true));
    if (!harFeil) {
        yield put(appNesteSteg());
    }
}

function* soknadSaga() {
    yield takeEvery(SoknadTypeKeys.NESTE_STEG, nesteStegSaga);
    yield takeEvery(SoknadTypeKeys.VALIDER_STEG, validerSteg);
    yield takeEvery(SoknadTypeKeys.VALIDER_FELT, validerFeltSaga);
}

export { soknadSaga };
