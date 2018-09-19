import * as classNames from 'classnames';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { selectAppSteg } from '../../app/selectors';
import { IRootState } from '../../rootReducer';
import { ISteg, stegConfig } from '../../stegConfig';
import Navigasjon from '../Navigering/Navigasjon';
import Tilbakeknapp from '../Tilbakeknapp/Tilbakeknapp';

interface IOwnProps {
    className?: string;
    children: React.ReactNode;
}

interface IMapStateToProps {
    aktivtSteg: number;
}

type Props = IOwnProps & IMapStateToProps;

class SideContainer extends React.Component<Props> {
    public render() {
        const { children, className = '', aktivtSteg } = this.props;

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
                <Sidetittel className={'side-container__sidetittel'}>
                    <FormattedMessage id={'kontantstotte.tittel'} />
                </Sidetittel>
                <Stegindikator
                    steg={indikatorsteg}
                    autoResponsiv={true}
                    visLabel={false}
                    kompakt={false}
                    aktivtSteg={aktivtSteg - 1} // -1 pga Stegindikator er 0-indeksert
                />
                {displayTilbakeKnapp && <Tilbakeknapp posisjon={'oppe'} />}
                <div className={classNames('side-container__children', className)}>{children}</div>
                <Navigasjon />
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        aktivtSteg: selectAppSteg(state),
    };
};

export default connect(mapStateToProps)(SideContainer);
