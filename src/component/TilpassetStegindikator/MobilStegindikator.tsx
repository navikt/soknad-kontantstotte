import * as React from 'react';

interface IMobilStegindikatorProps {
    aktivtSteg: number;
    antallSteg: number;
}

const styles = {
    stegIndikator(antallSteg: number, aktivtSteg: number) {
        return {
            backgroundColor: '#634689',
            borderRadius: '10px',
            height: '6px',
            marginTop: '-6px',
            width: (100 / antallSteg) * aktivtSteg + '%',
        };
    },
    tallIndikator(antallSteg: number, aktivtSteg: number) {
        return {
            paddingLeft: `calc(${(100 / antallSteg) * aktivtSteg + '%'} - .5rem)`,
        };
    },
};

const MobilStegindikator: React.StatelessComponent<IMobilStegindikatorProps> = ({
    aktivtSteg,
    antallSteg,
}) => {
    return (
        <div className={'tilpasset-stegindikator__kompakt'}>
            <span
                style={styles.tallIndikator(antallSteg, aktivtSteg)}
            >{`${aktivtSteg}/${antallSteg}`}</span>
            <div className={'tilpasset-stegindikator__kompakt__full-bredde'} />
            <div style={styles.stegIndikator(antallSteg, aktivtSteg)} />
        </div>
    );
};

export default MobilStegindikator;
