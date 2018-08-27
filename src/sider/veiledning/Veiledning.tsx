import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import { selectPersonNavn } from '../../person/selectors';
import { IRootState } from '../../rootReducer';
import { Personopplysning } from './Personopplysning';

interface IMapStateToProps {
    navn: string;
}

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

type VeiledningProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Veiledning: React.StatelessComponent<VeiledningProps> = ({ navn, nesteSteg, intl }) => {
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
                                <FormattedMessage id={'veiledningsside.veileder.hei'} /> {navn}
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
            <Hovedknapp className={'veiledning__knapp'} onClick={nesteSteg}>
                <FormattedMessage id={'veiledningsside.knapp'} />
            </Hovedknapp>
        </div>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        navn: selectPersonNavn(state),
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
