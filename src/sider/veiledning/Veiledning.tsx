import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import { IRootState } from '../../rootReducer';
import { selectSoker } from '../../soker/selectors';
import { Personopplysning } from './Personopplysning';

interface IMapStateToProps {
    fornavn: string;
}

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

type VeiledningProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Veiledning: React.StatelessComponent<VeiledningProps> = ({ fornavn, nesteSteg, intl }) => {
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
                <FormattedMessage id={'veiledningsside.info'} />
            </Normaltekst>
            <Personopplysning className={'veiledning__personopplysning'} />
            <Normaltekst className={'veiledning__info'}>
                <FormattedHTMLMessage id={'veiledningsside.vilkaar.info'} />
            </Normaltekst>
            <Hovedknapp className={'veiledning__knapp'} onClick={nesteSteg}>
                <FormattedMessage id={'veiledningsside.knapp'} />
            </Hovedknapp>
        </div>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        fornavn: selectSoker(state).fornavn.toLocaleLowerCase(),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Veiledning));
