import * as Bowser from 'bowser';
import NavFrontendSpinner from 'nav-frontend-spinner';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IVedlegg } from '../../vedlegg/types';
import BindersIkon from '../Ikoner/BindersIkon';
import SoppelbotteIkon from '../Ikoner/SoppelbotteIkon';

interface IVedleggListe {
    vedlegg: IVedlegg[];
    onDelete: (filreferanse: string) => void;
}

const VedleggListe: React.FunctionComponent<IVedleggListe> = ({ vedlegg, onDelete }) => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const erSafari = browser.is('safari');
    return (
        <ul className={'vedlegg-liste__liste'}>
            {vedlegg.map(v => {
                const isLoading = v.isLoading;
                return (
                    <li key={v.filreferanse} className={'vedlegg-liste__element'}>
                        {isLoading ? (
                            <NavFrontendSpinner />
                        ) : (
                            <>
                                <BindersIkon className={'vedlegg-liste__binders-ikon'} />
                                <a
                                    className={'nav-frontend-lenker'}
                                    target={'_blank'}
                                    rel={'noopener noreferer'}
                                    href={
                                        erSafari
                                            ? 'javascript:void(0)'
                                            : window.URL.createObjectURL(v.fil)
                                    }
                                    onClick={() => {
                                        if (erSafari) {
                                            const blob = new Blob([v.fil], { type: v.fil.type });
                                            const url = window.URL.createObjectURL(blob);
                                            window.open(url, '_blank');
                                        }
                                    }}
                                >
                                    {v.filnavn}
                                </a>

                                <button
                                    className={'knapp knapp--flat vedlegg-liste__slett-knapp'}
                                    onClick={() => onDelete(v.filreferanse)}
                                >
                                    <SoppelbotteIkon
                                        className={'vedlegg-liste__soppelbotte-ikon'}
                                    />
                                    <FormattedMessage id={'app.vedlegg.slett'} />
                                </button>
                            </>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export { VedleggListe };
