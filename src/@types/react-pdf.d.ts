// Kopiert fra https://github.com/wojtekmaj/react-pdf/issues/51#issuecomment-386827508
// Dette er ikke en fullstendig typedeklarasjon.
declare module 'react-pdf' {
    import * as React from 'react';

    interface ICommonPdfProps {
        error?: React.ReactNode;
        inputRef?: (ref: any) => void;
        loading?: React.ReactNode;
        noData?: React.ReactNode;
        onLoadError?: (error: Error) => void;
        onLoadSuccess?: (pdf: IPdf) => void;
        renderMode?: 'canvas' | 'svg' | 'none';
        className?: string | string[];
    }

    interface IPdf {
        numPages: number;
    }

    interface IDocumentProps extends ICommonPdfProps {
        file: string | File;
        onItemClick?: (pageNumber: number) => void;
        onSourceError?: (error: Error) => void;
        rotate?: 0 | 90 | 180 | 270;
    }
    class Document extends React.Component<IDocumentProps> {}

    interface IPageProps extends ICommonPdfProps {
        customTextRenderer?: (args: { str: string; itemIndex: number }) => React.ReactNode;
        onRenderError?: (error: Error) => void;
        onRenderSuccess?: () => void;
        onGetAnnotationsSuccess?: (annotations: any[]) => void;
        onGetAnnotationsError?: (error: Error) => void;
        onGetTextSuccess?: (items: any[]) => void;
        onGetTextError?: (error: Error) => void;
        pageIndex?: number;
        pageNumber?: number;
        renderAnnotations?: boolean;
        renderTextLayer?: boolean;
        rotate?: 0 | 90 | 180 | 270;
        scale?: number;
        width?: number;
    }
    /* tslint:disable max-classes-per-file*/
    class Page extends React.Component<IPageProps> {}
}
