import * as Bowser from 'bowser';
import Lukknapp from 'nav-frontend-lukknapp';
import NavFrontendSpinner from 'nav-frontend-spinner';
import * as React from 'react';
import { Document, Page } from 'react-pdf';
import { IVedlegg } from '../../vedlegg/types';

interface IVedleggForhandsvisning {
    vedlegg: IVedlegg[];
    onDelete: (filreferanse: string) => void;
}

const VedleggForhandsvisning: React.FunctionComponent<IVedleggForhandsvisning> = ({
    vedlegg,
    onDelete,
}) => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const erSafari = browser.is('safari');
    return (
        <ul className={'vedlegg-forhandsvisning__liste'}>
            {vedlegg.map(v => {
                const isLoading = v.isLoading;
                const erPdf = v.filnavn.indexOf('.pdf') !== -1;
                return (
                    <li key={v.filreferanse} className={'vedlegg-forhandsvisning__element'}>
                        {isLoading ? (
                            <div className={'vedlegg-forhandsvisning__bilde-container'}>
                                <NavFrontendSpinner />
                            </div>
                        ) : (
                            <>
                                <Lukknapp
                                    type={'button'}
                                    className={'vedlegg-forhandsvisning__slett-knapp'}
                                    onClick={() => onDelete(v.filreferanse)}
                                >
                                    {'Slett vedlegg: ' + v.filnavn}
                                </Lukknapp>
                                <a
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
                                    <div className={'vedlegg-forhandsvisning__bilde-container'}>
                                        {erPdf ? (
                                            <Document
                                                className={'vedlegg-forhandsvisning__pdf'}
                                                file={v.fil}
                                            >
                                                <Page pageNumber={1} width={222} />
                                            </Document>
                                        ) : (
                                            <img
                                                className={'vedlegg-forhandsvisning__bilde'}
                                                alt={v.filnavn}
                                                src={window.URL.createObjectURL(v.fil)}
                                            />
                                        )}
                                    </div>
                                </a>
                            </>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export { VedleggForhandsvisning };
