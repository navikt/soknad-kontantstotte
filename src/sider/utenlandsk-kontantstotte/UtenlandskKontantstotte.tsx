import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import FlaskeIkon from '../../component/Ikoner/FlaskeIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadNullstillNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { IUtenlandskKontantstotte, Svar } from '../../soknad/types';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { hentFeltMedFeil } from '../../common/utils';
import { selectUtenlandskKontantstotte } from '../../soknad/selectors';
import UtenlandskeYtelserIkon from '../../component/Ikoner/UtenlandskeYtelserIkon';

interface IMapStateToProps {
    utenlandskKontantstotte: IUtenlandskKontantstotte;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    nesteSteg: () => void;
    settMottarKontantstotteFraUtlandet: (verdi: Svar) => void;
}

type UtenlandskKontantstotteSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const UtenlandskKontantstotte: React.StatelessComponent<UtenlandskKontantstotteSideProps> = ({
    utenlandskKontantstotte,
    harForsoktNesteSteg,
    settMottarKontantstotteFraUtlandet,
    nesteSteg,
    intl,
}) => {
    const feltMedFeil = hentFeltMedFeil(utenlandskKontantstotte, harForsoktNesteSteg, intl);

    return (
        <SideContainer
            ikon={<FlaskeIkon />}
            tittel={intl.formatMessage({ id: 'utenlandskKontantstotte.tittel' })}
        >
            <form className={'utenlandsk-kontantstotte__form'}>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'utenlandskKontantstotte.mottarKontantstotteFraUtlandet.sporsmal',
                    })}
                    name={'mottarKontantstotteFraUtlandet'}
                    className={'utenlandsk-kontantstotte__sporsmaal'}
                    onChange={(evt: {}, value: string) => {
                        settMottarKontantstotteFraUtlandet(value as Svar);
                    }}
                    checked={utenlandskKontantstotte.mottarKontantstotteFraUtlandet.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                    ]}
                    feil={feltMedFeil.mottarKontantstotteFraUtlandet}
                />
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        utenlandskKontantstotte: selectUtenlandskKontantstotte(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settMottarKontantstotteFraUtlandet: (verdi: Svar) => {
            dispatch(
                soknadValiderFelt(
                    'utenlandskKontantstotte',
                    'mottarKontantstotteFraUtlandet',
                    verdi
                )
            );
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(UtenlandskKontantstotte));
