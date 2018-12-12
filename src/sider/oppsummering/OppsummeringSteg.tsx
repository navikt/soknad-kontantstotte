import Knapp from 'nav-frontend-knapper/lib/knapp';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { appGaaTilSteg } from '../../app/actions';
import { FormattedMessage } from 'react-intl';

interface IOppsummeringStegProps {
    stegIndeks?: number;
    children: React.ReactNode;
}

interface IMapDispatchToProps {
    gaaTilSteg: () => void;
}

type OppsummeringStegProps = IOppsummeringStegProps & IMapDispatchToProps;

const OppsummeringSteg: React.StatelessComponent<OppsummeringStegProps> = ({
    children,
    stegIndeks,
    gaaTilSteg,
}) => {
    return (
        <article className="panel panel--border oppsummering-steg">
            {children}
            {!!stegIndeks && (
                <Knapp onClick={gaaTilSteg} className={'oppsummering-steg__endre-knapp'}>
                    <FormattedMessage id={'oppsummering.endre.svar.knapp'} />
                </Knapp>
            )}
        </article>
    );
};

const mapDispatchToProps = (
    dispatch: Dispatch,
    ownProps: IOppsummeringStegProps
): IMapDispatchToProps => {
    return {
        gaaTilSteg: () => {
            if (!!ownProps.stegIndeks) {
                dispatch(appGaaTilSteg(ownProps.stegIndeks));
            }
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(OppsummeringSteg);
