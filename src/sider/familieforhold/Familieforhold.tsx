import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import BorSammenIkon from '../../component/Ikoner/BorSammenIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import Tilbakeknapp from '../../component/Tilbakeknapp/Tilbakeknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadNullstillNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    settBorForeldreneSammenMedBarnetOgNullstillNeste: (verdi: Svar) => void;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
    nesteSteg: () => void;
}

type FamilieforholdSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Familieforhold: React.StatelessComponent<FamilieforholdSideProps> = ({
    familieforhold,
    harForsoktNesteSteg,
    nesteSteg,
    settBorForeldreneSammenMedBarnetOgNullstillNeste,
    intl,
    ...annenForelderProps
}) => {
    const feltMedFeil = hentFeltMedFeil(familieforhold, harForsoktNesteSteg, intl);

    return (
        <SideContainer className={'familieforhold'}>
            <div className={'familieforhold__ikon'}>
                <BorSammenIkon />
            </div>
            <form className={'familieforhold__form'}>
                <h3 className={'typo-innholdstittel familieforhold__tittel'}>
                    <FormattedMessage id={'familieforhold.tittel'} />
                </h3>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'familieforhold.borForeldreneSammenMedBarnet.sporsmal',
                    })}
                    name={'borForeldreneSammenMedBarnet'}
                    className={'familieforhold__sporsmaal'}
                    onChange={(evt: {}, value: string) => {
                        settBorForeldreneSammenMedBarnetOgNullstillNeste(value as Svar);
                    }}
                    checked={familieforhold.borForeldreneSammenMedBarnet.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                    ]}
                    feil={feltMedFeil.borForeldreneSammenMedBarnet}
                />

                {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <AnnenForelderInfo
                        familieforhold={familieforhold}
                        harForsoktNesteSteg={harForsoktNesteSteg}
                        {...annenForelderProps}
                    />
                )}
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        familieforhold: selectFamilieforhold(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settAnnenForelderFodselsnummer: personnr => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderFodselsnummer', personnr));
        },
        settAnnenForelderNavn: navn => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderNavn', navn));
        },
        settBorForeldreneSammenMedBarnetOgNullstillNeste: (verdi: Svar) => {
            dispatch(soknadValiderFelt('familieforhold', 'borForeldreneSammenMedBarnet', verdi));
            dispatch(soknadNullstillNesteSteg());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Familieforhold));
