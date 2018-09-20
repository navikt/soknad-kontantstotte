import * as classNames from 'classnames';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectAppSteg } from '../../app/selectors';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg } from '../../soknad/actions';
import { ISteg, stegConfig } from '../../stegConfig';
import Navigasjon from '../Navigering/Navigasjon';
import Tilbakeknapp from '../Tilbakeknapp/Tilbakeknapp';

interface IOwnProps {
    className?: string;
    children: React.ReactNode;
    ikon?: React.ReactNode;
    tittel?: string;
}

interface IMapStateToProps {
    aktivtSteg: number;
}

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

type Props = IOwnProps & IMapStateToProps & IMapDispatchToProps;

class SideContainer extends React.Component<Props> {
    public render() {
        const { aktivtSteg, children, className = '', ikon, tittel } = this.props;

        const indikatorsteg: StegindikatorStegProps[] = Object.values(stegConfig)
            .filter((steg: ISteg) => steg.stegIndeks !== 0)
            .map((steg: ISteg) => {
                return {
                    aktiv: aktivtSteg === steg.stegIndeks,
                    index: steg.stegIndeks,
                    label: steg.key,
                };
            });
        const displayTilbakeKnapp = aktivtSteg !== 1;

        return (
            <div>
                <Sidetittel className={'side-container__soknadtittel'}>
                    <FormattedMessage id={'kontantstotte.tittel'} />
                </Sidetittel>

                <div className={'side-container'}>
                    <Stegindikator
                        steg={indikatorsteg}
                        autoResponsiv={true}
                        visLabel={false}
                        kompakt={false}
                        aktivtSteg={aktivtSteg - 1} // -1 pga Stegindikator er 0-indeksert
                    />

                    {displayTilbakeKnapp && <Tilbakeknapp posisjon={'oppe'} />}
                    {ikon && <div className={'side-container__ikon'}>{ikon}</div>}
                    {tittel && (
                        <h3 className={'typo-innholdstittel side-container__sidetittel'}>
                            {tittel}
                        </h3>
                    )}
                    <div className={classNames('side-container__children', className)}>
                        {children}
                    </div>
                    <Navigasjon />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        aktivtSteg: selectAppSteg(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideContainer);
