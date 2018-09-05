import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import BorSammenIkon from '../../component/Ikoner/BorSammenIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';

interface IMapDispatchToProps {
    settBorForeldreneSammenMedBarnet: (verdi: Svar) => void;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
    nesteSteg: () => void;
}

type FamilieforholdSideProps = IFamilieforhold & IMapDispatchToProps & InjectedIntlProps;

const Familieforhold: React.StatelessComponent<FamilieforholdSideProps> = ({
    borForeldreneSammenMedBarnet,
    nesteSteg,
    settBorForeldreneSammenMedBarnet,
    intl,
    ...annenForelderProps
}) => {
    return (
        <SideContainer className={'familieforhold'}>
            <div className={'familieforhold__ikon'}>
                <BorSammenIkon />
            </div>
            <form className={'familieforhold__form'} onSubmit={nesteSteg}>
                <h3>
                    <FormattedMessage id={'familieforhold.borForeldreneSammenMedBarnet.sporsmal'} />
                </h3>
                <div className={'familieforhold__sporsmaal'}>
                    <RadioPanelGruppe
                        legend={''}
                        name={'borForeldreneSammenMedBarnet'}
                        onChange={(evt: {}, value: string) =>
                            settBorForeldreneSammenMedBarnet(value as Svar)
                        }
                        checked={borForeldreneSammenMedBarnet.verdi}
                        radios={[
                            { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                            { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        ]}
                    />
                </div>

                {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <AnnenForelderInfo {...annenForelderProps} />
                )}
                <Submitknapp label="app.neste" onClick={nesteSteg} />
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IFamilieforhold => {
    return selectFamilieforhold(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settBorForeldreneSammenMedBarnet: (verdi: Svar) => {
            dispatch(soknadValiderFelt('familieforhold', 'borForeldreneSammenMedBarnet', verdi));
        },
        settAnnenForelderFodselsnummer: personnr => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderFodselsnummer', personnr));
        },
        settAnnenForelderNavn: navn => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderNavn', navn));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Familieforhold));
