import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import BorSammenIkon from '../../component/Ikoner/BorSammenIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';
import SoknadHjelpetekst from '../../component/SoknadHjelpetekst/SoknadHjelpetekst';

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
                <div className={'familieforhold__tittelcontainer'}>
                    <h3 className={'typo-innholdstittel familieforhold__tittel'}>
                        <FormattedMessage id={'familieforhold.tittel'} />
                    </h3>
                    <SoknadHjelpetekst
                        className={'familieforhold__hjelpetekst'}
                        modalClassName={'familieforhold__hjelpetekst__modal'}
                        hjelpetekstNokkel={
                            'familieforhold.borForeldreneSammenMedBarnet.hjelpetekst'
                        }
                    />
                </div>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'familieforhold.borForeldreneSammenMedBarnet.sporsmal',
                    })}
                    name={'borForeldreneSammenMedBarnet'}
                    className={'familieforhold__sporsmaal'}
                    onChange={(evt: {}, value: string) =>
                        settBorForeldreneSammenMedBarnet(value as Svar)
                    }
                    checked={borForeldreneSammenMedBarnet.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                    ]}
                />

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
