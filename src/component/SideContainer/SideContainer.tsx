import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { IRootState } from '../../rootReducer';
import { hentIndeksForPath, ISide, Sider, SideType } from '../../Routes';
import AvbrytKnapp from '../AvbrytKnapp/AvbrytKnapp';

interface IOwnProps {
    className?: string;
    children: React.ReactNode;
}

interface IMapStateToProps {
    location: {
        pathname: string;
    };
}

type Props = IOwnProps & IMapStateToProps;

class SideContainer extends React.Component<Props> {
    public render() {
        const { children, className = '', location } = this.props;

        const currentPath = location ? location.pathname : '';

        const indikatorsteg: StegindikatorStegProps[] = Sider.filter(
            (side: ISide) => side.sideType === SideType.SKJEMASIDE
        ).map((side: ISide) => {
            return {
                aktiv: hentIndeksForPath(currentPath) === side.stegIndeks,
                index: side.stegIndeks,
                label: side.key,
            };
        });

        return (
            <div className={className}>
                <Sidetittel className={'side-container__sidetittel'}>
                    <FormattedMessage id={'kontantstotte.tittel'} />
                </Sidetittel>
                <Stegindikator
                    steg={indikatorsteg}
                    autoResponsiv={true}
                    visLabel={false}
                    kompakt={false}
                    aktivtSteg={hentIndeksForPath(currentPath)}
                />
                <div>{children}</div>

                <AvbrytKnapp />
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        location: state.router.location,
    };
};

export default connect(mapStateToProps)(SideContainer);
