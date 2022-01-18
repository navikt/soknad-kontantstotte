import { Innholdstittel } from 'nav-frontend-typografi';
import * as React from 'react';
import ModalHjelpetekst from '../ModalHjelpetekst/ModalHjelpetekst';

interface IHjelpetekstContainerProps {
    tittel: React.ReactNode;
    hjelpetekstNokkel: string;
}

const HjelpetekstContainer: React.StatelessComponent<IHjelpetekstContainerProps> = ({
    tittel,
    hjelpetekstNokkel,
}) => {
    return (
        <div className={'hjelpetekst-container'}>
            <Innholdstittel tag="h2" className={'side-container__sidetittel'}>
                {tittel}
            </Innholdstittel>
            <ModalHjelpetekst
                ariaContentLabel={hjelpetekstNokkel + '.label'}
                className={'hjelpetekst-container__hjelpetekst'}
                modalClassName={'hjelpetekst-container__modal'}
                hjelpetekstNokkel={hjelpetekstNokkel}
            />
        </div>
    );
};

export default HjelpetekstContainer;
