import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import { IRootState } from '../../rootReducer';
import { selectSoker } from '../../soker/selectors';
import { Personopplysning } from './Personopplysning';
import { ISoknadState, Svar, ValideringsStatus } from '../../soknad/types';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectSoknad } from '../../soknad/selectors';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import Submitknapp from '../../component/Submitknapp/Submitknapp';

interface IMapStateToProps {
    fornavn: string;
    soknad: ISoknadState;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    settBekreftelse: (verdi: Svar) => void;
}

type VeiledningProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Veiledning: React.StatelessComponent<VeiledningProps> = ({
    fornavn,
    intl,
    settBekreftelse,
    soknad,
    harForsoktNesteSteg,
}) => {
    if (intl) {
        document.title = intl.formatMessage({
            id: 'app.tittel.veiledning',
        });
    }

    return (
        <div className={'veiledning'}>
            <div className={'veiledning__veileder-container'}>
                <Veileder
                    posisjon={'topp'}
                    className={'veiledning__veileder'}
                    storrelse={'M'}
                    center={true}
                    tekst={
                        <div className={'veiledning__veileder-snakkeboble'}>
                            <Element>
                                <FormattedMessage id={'veiledningsside.veileder.hei'} />{' '}
                                <span className={'veiledning__veileder-navn'}>{fornavn}</span>!
                            </Element>
                            <Normaltekst>
                                <FormattedMessage id={'veiledningsside.veileder.melding'} />
                            </Normaltekst>
                        </div>
                    }
                >
                    <Veilederikon morkBakgrunn={true} />
                </Veileder>
            </div>

            <Sidetittel className={'veiledning__sidetittel'}>
                <FormattedMessage id={'kontantstotte.tittel'} />
            </Sidetittel>
            <Normaltekst className={'veiledning__info'}>
                <FormattedHTMLMessage id={'veiledningsside.vilkaar.info'} />
            </Normaltekst>

            <BekreftCheckboksPanel
                className={'veiledning__bekreftelse'}
                onChange={(evt: React.SyntheticEvent<EventTarget>) => {
                    const target = evt.nativeEvent.target as HTMLInputElement;
                    settBekreftelse(target.checked ? Svar.JA : Svar.NEI);
                }}
                checked={soknad.veiledning.bekreftelse.verdi === Svar.JA}
                label={intl.formatHTMLMessage({ id: 'veiledningsside.bekreftelse.label' })}
            >
                <FormattedHTMLMessage id={'veiledningsside.bekreftelse.innhold'} />
            </BekreftCheckboksPanel>
            {harForsoktNesteSteg &&
                soknad.veiledning.bekreftelse.valideringsStatus !== ValideringsStatus.OK && (
                    <FormattedMessage id={soknad.veiledning.bekreftelse.feilmeldingsNokkel}>
                        {txt => (
                            <div role="alert" className={'skjemaelement__feilmelding'}>
                                {txt}
                            </div>
                        )}
                    </FormattedMessage>
                )}
            <Personopplysning className={'veiledning__personopplysning'} />
            <Submitknapp className={'veiledning__knapp'} />
        </div>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        fornavn: selectSoker(state).fornavn.toLocaleLowerCase(),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        soknad: selectSoknad(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settBekreftelse: (verdi: Svar) =>
            dispatch(soknadValiderFelt('veiledning', 'bekreftelse', verdi)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Veiledning));
