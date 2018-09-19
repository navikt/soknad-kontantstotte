import * as React from 'react';
import ModalHjelpetekst from '../ModalHjelpetekst/ModalHjelpetekst';

interface IHjelpetekstContainerProps {
    tittel: string;
    hjelpetekstNokkel: string;
}

const HjelpetekstContainer: React.StatelessComponent<IHjelpetekstContainerProps> = ({
    tittel,
    hjelpetekstNokkel,
}) => {
    return (
        <div className={'side-container__hjelpetekst-container'}>
            <h3 className={'typo-innholdstittel side-container__sidetittel'}>{tittel}</h3>
            <ModalHjelpetekst
                ariaContentLabel={hjelpetekstNokkel + '.label'}
                className={'side-container__hjelpetekst'}
                modalClassName={'side-container__modal'}
                hjelpetekstNokkel={hjelpetekstNokkel}
            />
        </div>
    );
};

export default HjelpetekstContainer;
