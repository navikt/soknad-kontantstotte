import * as moment from 'moment';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { barnHentFeilet, barnHentOk, BarnTypeKeys } from './actions';
import { fetchBarn } from './api';
import { IBarn, IBarnContainer } from './types';

function genererFlerling(barn: IBarn[]): IBarn[][] {
    const powerSet = genererPowerSet(barn);
    const flerlinger = powerSet.filter(erEttBarnEllerFlerling);
    return flerlinger.sort((a, b) => a.length - b.length);
}

/**
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/power-set/bwPowerSet.js
 */
function genererPowerSet(barn: IBarn[]): IBarn[][] {
    const subSets = [];

    const numberOfCombinations = 2 ** barn.length;

    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex++) {
        const subSet = [];
        for (let setElementIndex = 0; setElementIndex < barn.length; setElementIndex++) {
            // tslint:disable:no-bitwise
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(barn[setElementIndex]);
            }
        }
        subSets.push(subSet);
    }

    return subSets;
}

function erEttBarnEllerFlerling(set: IBarn[]) {
    if (set.length === 0) {
        return false;
    } else if (set.length === 1) {
        return true;
    }
    const fodsesldatoMoments = set.map((barn: IBarn) => moment(barn.fodselsdato, 'DD.MM.YYYY'));
    const min = moment.min(fodsesldatoMoments);
    const max = moment.max(fodsesldatoMoments);

    const granularity = 'days';
    const inclusivity = '[]';

    return min.isBetween(max.clone().subtract(2, 'days'), max, granularity, inclusivity);
}

function* fetchBarnSaga(): SagaIterator {
    try {
        const barn: IBarn[] = yield call(fetchBarn);
        const barnOgFlerlinger = yield call(genererFlerling, barn);

        const barnContainere: IBarnContainer[] = barnOgFlerlinger.map(
            (b: IBarn[], index: number) => {
                return {
                    barn: b,
                    erFlerling: b.length > 1,
                    index,
                };
            }
        );

        yield put(barnHentOk(barnContainere));
    } catch (err) {
        yield put(barnHentFeilet());
    }
}

function* barnSaga(): SagaIterator {
    yield takeEvery(BarnTypeKeys.HENT, fetchBarnSaga);
}

export { fetchBarnSaga, barnSaga };
