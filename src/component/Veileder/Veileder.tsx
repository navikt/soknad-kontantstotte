import Veilederpanel from 'nav-frontend-veilederpanel';
import * as React from 'react';
import Veilederikon from '../../component/Ikoner/Veilederikon';

interface IVeilederProps {
    content: React.ReactNode;
}

type VeilederProps = IVeilederProps;

const Veileder: React.StatelessComponent<VeilederProps> = ({ content }) => {
    return (
        <div className="veileder">
            <Veilederpanel svg={<Veilederikon morkBakgrunn={true} />} type="normal" kompakt={true}>
                {content}
            </Veilederpanel>
        </div>
    );
};

export default Veileder;
