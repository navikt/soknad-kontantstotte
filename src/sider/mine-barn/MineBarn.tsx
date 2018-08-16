import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appNesteSteg } from '../../app/actions';
import { ValidForm, ValidRadioPanelGruppe } from '../../common/lib/validation';
import SideContainer from '../../component/SideContainer/SideContainer';
import SubmitKnapp from '../../component/SubmitKnapp/SubmitKnapp';
import { selectBarn } from '../../person/selectors';
import { IBarn } from '../../person/types';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectValgtBarn } from '../../soknad/selectors';

interface IMapStateToProps {
    barn: IBarn[];
    valgtBarn: IBarn;
}

interface IMapDispatchToProps {
    velgBarn: (barn: IBarn) => void;
    nesteSteg: () => void;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps;

const MineBarn: React.StatelessComponent<MineBarnSideProps> = ({
    barn,
    valgtBarn,
    velgBarn,
    nesteSteg,
}) => {
    return (
        <SideContainer className={'mine-barn'}>
            <ValidForm summaryTitle={'mine-barn'} onSubmit={nesteSteg}>
                <ValidRadioPanelGruppe
                    radios={barn.map(b => {
                        return { label: b.navn, value: b.fodselsdato };
                    })}
                    name={'barn'}
                    legend={'Velg barn du søker kontantstøtte for:'}
                    checked={valgtBarn.fodselsdato}
                    validators={[
                        {
                            failText: 'Du må velge barn',
                            test: () => !!valgtBarn.fodselsdato && !!valgtBarn.navn,
                        },
                    ]}
                    onChange={(evt: {}, value: string) => {
                        const bb = barn.find(b => b.fodselsdato === value);
                        if (bb) {
                            velgBarn(bb);
                        }
                    }}
                />
                <SubmitKnapp label={'app.neste'} />
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        valgtBarn: selectValgtBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
        velgBarn: barn => dispatch(soknadSettVerdi('mineBarn', 'valgtBarn', barn)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MineBarn);
