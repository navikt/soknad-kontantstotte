import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import Veilederikon from '../../component/Veilederikon/Veilederikon';

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

type VeiledningProps = IMapDispatchToProps & InjectedIntlProps;

const Veiledning: React.StatelessComponent<VeiledningProps> = ({ nesteSteg, intl }) => {
    return (
        <div className={'veiledning'}>
            <div className={'veiledning__veileder-container'}>
                <Veileder
                    storrelse={'M'}
                    center={true}
                    tekst={
                        <div className={'veiledning__veileder-snakkeboble'}>
                            <Element>
                                <FormattedMessage id={'veiledningsside.veileder.hei'} /> PersonNavn
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
            <div className={'veiledning__lenke-container'}>
                <Lenke href={intl.formatMessage({ id: 'veiledningsside.lenke.url' })}>
                    <FormattedMessage id={'veiledningsside.lenke.tekst'} />
                </Lenke>
            </div>
            <Hovedknapp className={'veiledning__knapp'} onClick={nesteSteg}>
                <FormattedMessage id={'veiledningsside.knapp'} />
            </Hovedknapp>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
    };
};

export default connect(
    () => ({}),
    mapDispatchToProps
)(injectIntl(Veiledning));
