import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { IFeltFeil } from '../../common/lib/validation/types';
import BorSammenIkon from '../../component/Ikoner/BorSammenIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar, ValideringsStatus } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    feltMedFeil: IFeltFeil;
}

interface IMapDispatchToProps {
    settBorForeldreneSammenMedBarnet: (verdi: Svar) => void;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
    nesteSteg: () => void;
}

type FamilieforholdSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Familieforhold: React.StatelessComponent<FamilieforholdSideProps> = ({
    familieforhold,
    feltMedFeil,
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
                    onChange={(evt: {}, value: string) =>
                        settBorForeldreneSammenMedBarnet(value as Svar)
                    }
                    checked={familieforhold.borForeldreneSammenMedBarnet.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                    ]}
                />

                {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <AnnenForelderInfo
                        familieforhold={familieforhold}
                        feltMedFeil={feltMedFeil}
                        {...annenForelderProps}
                    />
                )}
            </form>
            <Submitknapp label="app.neste" onClick={nesteSteg} />
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    const familieforhold = selectFamilieforhold(state);
    const harForsoktNesteSteg = selectHarForsoktNesteSteg(state);

    const feltMedFeil = Object.entries(familieforhold).reduce(
        (accFeltMedFeil: IFeltFeil, [key, felt]) => {
            accFeltMedFeil[key] =
                felt.valideringsStatus !== ValideringsStatus.OK && harForsoktNesteSteg
                    ? { feilmelding: felt.feilmeldingsNokkel }
                    : undefined;
            return accFeltMedFeil;
        },
        {}
    );

    return {
        familieforhold,
        feltMedFeil,
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
        settBorForeldreneSammenMedBarnet: (verdi: Svar) => {
            dispatch(soknadValiderFelt('familieforhold', 'borForeldreneSammenMedBarnet', verdi));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Familieforhold));
