import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';

interface IMapStateToProps {
    mottarYtelserFraUtlandet: boolean;
    mottarYtelserFraUtlandetForklaring?: string | undefined;
    arbeiderIUtlandetEllerKontinentalsokkel: boolean;
    arbeiderIUtlandetEllerKontinentalsokkelForklaring?: string;
    mottarKontantstotteFraAnnetEOS: boolean;
    mottarKontantstotteFraAnnetEOSForklaring?: string;
}

type ArbeidsforholdSideProps = IMapStateToProps & InjectedIntlProps;

const ArbeidsforholdSide: React.StatelessComponent<ArbeidsforholdSideProps> = (
    {
        mottarYtelserFraUtlandet,
        mottarYtelserFraUtlandetForklaring,
        arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        mottarKontantstotteFraAnnetEOS,
        mottarKontantstotteFraAnnetEOSForklaring,
        intl

    }) => {
    return (
        <SideContainer>
            <JaNeiSporsmal
                nokkel='mottarYtelserFraUtlandet'
                sporsmal={
                    intl.formatMessage({
                        id: 'arbeidsforhold.mottarYtelserFraUtlandet.sporsmal'
                    })
                }
                verdi={ mottarYtelserFraUtlandet }
                forklaring={ mottarYtelserFraUtlandetForklaring }
            />

            <JaNeiSporsmal
                nokkel='arbeiderIUtlandetEllerKontinentalsokkel'
                sporsmal={
                    intl.formatMessage({
                        id: 'arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal'
                    })
                }
                verdi={ arbeiderIUtlandetEllerKontinentalsokkel }
                forklaring={ arbeiderIUtlandetEllerKontinentalsokkelForklaring }
            />

            <JaNeiSporsmal
                nokkel='mottarKontantstotteFraAnnetEOS'
                sporsmal={
                    intl.formatMessage({
                        id: 'arbeidsforhold.mottarKontantstotteFraAnnetEOS.sporsmal'
                    })
                }
                verdi={ mottarKontantstotteFraAnnetEOS }
                forklaring={ mottarKontantstotteFraAnnetEOSForklaring }
            />

            <NavigasjonKnapp to='/oppsummering'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        arbeiderIUtlandetEllerKontinentalsokkel: state.soknad.arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: state.soknad.arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        mottarKontantstotteFraAnnetEOS: state.soknad.mottarKontantstotteFraAnnetEOS,
        mottarKontantstotteFraAnnetEOSForklaring: state.soknad.mottarKontantstotteFraAnnetEOSForklaring,
        mottarYtelserFraUtlandet: state.soknad.mottarYtelserFraUtlandet,
        mottarYtelserFraUtlandetForklaring: state.soknad.mottarYtelserFraUtlandetForklaring
    };
};

export default injectIntl(connect(mapStateToProps)(ArbeidsforholdSide));
