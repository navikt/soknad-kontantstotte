import * as React from 'react';
import { Document, Page } from 'react-pdf';
import { IVedlegg } from '../../vedlegg/types';

interface IVedleggForhandsvisning {
    vedlegg: IVedlegg[];
}

const VedleggForhandsvisning: React.FunctionComponent<IVedleggForhandsvisning> = ({ vedlegg }) => {
    return (
        <ul className={'vedlegg-forhandsvisning__liste'}>
            {vedlegg.map(v => {
                const erPdf = v.filnavn.indexOf('.pdf') !== -1;
                return (
                    <li key={v.filreferanse} className={'vedlegg-forhandsvisning__element'}>
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
                    </li>
                );
            })}
        </ul>
    );
};

export { VedleggForhandsvisning };
