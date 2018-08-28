import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { selectAppSteg } from '../../app/selectors';
import { IRootState } from '../../rootReducer';
import { ISteg, stegConfig } from '../../stegConfig';
import AvbrytKnapp from '../AvbrytKnapp/AvbrytKnapp';
import TilbakeKnapp from '../TilbakeKnapp/TilbakeKnapp';

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

        const indikatorsteg: StegindikatorStegProps[] = stegConfig
            .filter((steg: ISteg) => steg.stegIndeks !== 0)
            .map((steg: ISteg) => {
                return {
                    aktiv: aktivtSteg === steg.stegIndeks,
                    index: steg.stegIndeks,
                    label: steg.key,
                };
            });

        const visStegInformasjon = aktivtSteg !== 7;

        return (
            <div className={className}>
                <Sidetittel className={'side-container__sidetittel'}>
                    <FormattedMessage id={'kontantstotte.tittel'} />
                </Sidetittel>
                {visStegInformasjon && (
                    <Stegindikator
                        steg={indikatorsteg}
                        autoResponsiv={true}
                        visLabel={false}
                        kompakt={false}
                        aktivtSteg={aktivtSteg - 1} // -1 pga Stegindikator er 0-indeksert
                    />
                )}
                {visStegInformasjon && <TilbakeKnapp />}
                <div>{children}</div>

                {visStegInformasjon && <AvbrytKnapp />}
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
