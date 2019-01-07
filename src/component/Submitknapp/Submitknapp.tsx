import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectAppSteg } from '../../app/selectors';
import { selectSenderInn } from '../../innsending/selectors';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg } from '../../soknad/actions';
import { stegConfig } from '../../stegConfig';

interface ISubmitKnappProps {
    className?: string;
}

interface IMapStateToProps {
    senderinn: boolean;
    stegPosisjon: number;
}

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

type SubmitKnappProps = ISubmitKnappProps & IMapStateToProps & IMapDispatchToProps;

const Submitknapp: React.StatelessComponent<SubmitKnappProps> = ({
    className,
    nesteSteg,
    senderinn,
    stegPosisjon,
}) => {
    const erOppsummeringsSteg = stegConfig.oppsummering.stegIndeks === stegPosisjon;
    const label = erOppsummeringsSteg ? 'app.sendSoknad' : 'app.neste';

    return (
        <KnappBase spinner={senderinn} className={className} type="hoved" onClick={nesteSteg}>
            <FormattedMessage id={label} />
        </KnappBase>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        senderinn: selectSenderInn(state),
        stegPosisjon: selectAppSteg(state),
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
)(Submitknapp);
