import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectAppSteg } from '../../app/selectors';
import { sendInn } from '../../innsending/actions';
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
    sendSoknad: () => void;
}

type SubmitKnappProps = ISubmitKnappProps & IMapStateToProps & IMapDispatchToProps;

const Submitknapp: React.StatelessComponent<SubmitKnappProps> = ({
    className,
    nesteSteg,
    sendSoknad,
    senderinn,
    stegPosisjon,
}) => {
    const erOppsummeringsSteg = stegConfig.oppsummering.stegIndeks === stegPosisjon;
    const label = erOppsummeringsSteg ? 'app.sendSoknad' : 'app.neste';
    const onClick = erOppsummeringsSteg ? sendSoknad : nesteSteg;

    return (
        <KnappBase spinner={senderinn} className={className} type="hoved" onClick={onClick}>
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
        sendSoknad: () => {
            dispatch(sendInn());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submitknapp);
