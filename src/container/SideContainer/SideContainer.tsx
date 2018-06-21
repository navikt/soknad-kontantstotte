import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { hentIndeksForPath, ISide, Sider, SideType } from '../../routes';


type Props = RouteProps;

class SideContainer extends React.Component<Props> {
    render() {
        const currentPath = this.props.location ? this.props.location.pathname : '';

        const indikatorsteg: StegindikatorStegProps[] = Sider
            .filter((side: ISide) => side.sideType === SideType.SKJEMASIDE)
            .map((side: ISide) => {
                    return {
                        aktiv: hentIndeksForPath(currentPath) === side.stegIndeks,
                        index: side.stegIndeks,
                        label: side.key
                    };
                }
            );

        return (
            <div>
                <Stegindikator
                    steg={ indikatorsteg }
                    autoResponsiv={true}
                    visLabel={false}
                    kompakt={false}
                    aktivtSteg={hentIndeksForPath(currentPath)}
                />
                <div>
                    { this.props.children }
                </div>
            </div>

        );
    }

}

const mapStateToProps = (state: any, ownProps: any) => ({
    location: state.router.location
});

export default connect(mapStateToProps)(SideContainer);
