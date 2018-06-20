import {hentIndeksForPath, ISide, Sider, SideType} from "../../routes";
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";
import {StegindikatorStegProps} from "nav-frontend-stegindikator/lib/stegindikator-steg";
import * as React from 'react';
import {connect, DispatchProp} from "react-redux";
import {withRouter, RouterProps, RouteProps} from "react-router";


type Props = DispatchProp & RouteProps;

class SideContainer extends React.Component<Props> {

    render() {
        const currentPath = this.props.location ? this.props.location.pathname : "";

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
});

export default withRouter(connect(mapStateToProps)(SideContainer));
