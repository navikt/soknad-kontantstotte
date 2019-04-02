import { cloneableGenerator, SagaIteratorClone } from '@redux-saga/testing-utils';
import { push } from 'connected-react-router';
import { all, fork, put, select, take } from 'redux-saga/effects';
import { barnHent, BarnTypeKeys } from '../barn/actions';
import { selectBarn } from '../barn/selectors';
import { IBarn } from '../barn/types';
import { landHent, LandTypeKeys } from '../land/actions';
import { sokerHent, SokerTypeKeys } from '../soker/actions';
import { teksterHent, TeksterTypeKeys } from '../tekster/actions';
import { ToggelsTypeKeys, togglesHent } from '../toggles/actions';
import { appEndreStatus, AppTypeKeys } from './actions';
import { autentiserBruker, forsteSidelastSaga } from './saga';
import { AppStatus } from './types';

describe('app - saga', () => {
    describe('forsteSidelastSaga', () => {
        let saga: SagaIteratorClone;
        let clone: SagaIteratorClone;

        beforeAll(() => {
            saga = cloneableGenerator(forsteSidelastSaga)();
        });

        test('autentiserer bruker', () => {
            expect(saga.next().value).toEqual(fork(autentiserBruker));
        });

        test('venter på at bruker er autentisert', () => {
            expect(saga.next().value).toEqual(take([AppTypeKeys.PING_OK]));
        });

        test('henter toggles', () => {
            expect(saga.next(AppTypeKeys.PING_OK).value).toEqual(put(togglesHent()));
        });

        test('venter på svar fra toggles', () => {
            expect(saga.next().value).toEqual(
                take([ToggelsTypeKeys.HENT_FEILET, ToggelsTypeKeys.HENT_OK])
            );
        });

        test('henter tekster, land, søker og barn', () => {
            expect(saga.next().value).toEqual(put(teksterHent()));
            expect(saga.next().value).toEqual(put(landHent()));
            expect(saga.next().value).toEqual(put(sokerHent()));
            expect(saga.next().value).toEqual(put(barnHent()));
        });

        test('venter på svar fra alle endepunktene', () => {
            expect(saga.next().value).toEqual(
                all([
                    take(TeksterTypeKeys.HENT_OK),
                    take(LandTypeKeys.HENT_OK),
                    take(SokerTypeKeys.HENT_OK),
                    take(BarnTypeKeys.HENT_OK),
                ])
            );
        });

        test('henter ut barn fra state', () => {
            expect(
                saga.next([
                    TeksterTypeKeys.HENT_OK,
                    LandTypeKeys.HENT_OK,
                    SokerTypeKeys.HENT_OK,
                    BarnTypeKeys.HENT_OK,
                ]).value
            ).toEqual(select(selectBarn));
        });

        describe('har barn flyt', () => {
            let barn: IBarn;
            beforeAll(() => {
                clone = saga.clone();
                barn = {
                    erFlerling: '',
                    fodselsdato: '01.01.2020',
                    fulltnavn: 'Mock',
                    index: '1',
                };
            });

            test('setter status til klar', () => {
                expect(clone.next([barn]).value).toEqual(put(appEndreStatus(AppStatus.KLAR)));
            });
        });

        describe('ingen barn flyt', () => {
            beforeAll(() => {
                clone = saga.clone();
            });

            test('setter status feilsituasjon', () => {
                expect(clone.next([]).value).toEqual(put(appEndreStatus(AppStatus.FEILSITUASJON)));
            });

            test('går til /ingen-barn siden', () => {
                expect(clone.next().value).toEqual(put(push('/ingen-barn')));
            });
        });
    });
});
