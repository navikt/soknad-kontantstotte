import * as Bowser from 'bowser';
import Lukknapp from 'nav-frontend-lukknapp';
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
                const erPdf = v.filnavn.indexOf('.pdf') !== -1;
                return (
                    <li key={v.filreferanse} className={'vedlegg-forhandsvisning__element'}>
                        <Lukknapp
                            type={'button'}
                            className={'vedlegg-forhandsvisning__slett-knapp'}
                            onClick={() => onDelete(v.filreferanse)}
                        >
                            {'Slett vedlegg: ' + v.filnavn}
                        </Lukknapp>
                        {erSafari ? (
                            <a
                                target={'_blank'}
                                rel={'noopener noreferer'}
                                href={'javascript:void(0)'}
                                onClick={() => {
                                    const blob = new Blob([v.fil], { type: v.fil.type });
                                    const url = window.URL.createObjectURL(blob);
                                    window.open(url, '_blank');
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
                        ) : (
                            <a
                                target={'_blank'}
                                rel={'noopener noreferer'}
                                href={window.URL.createObjectURL(v.fil)}
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
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export { VedleggForhandsvisning };
