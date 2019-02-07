import * as Bowser from 'bowser';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IVedlegg } from '../../vedlegg/types';

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
                return (
                    <li key={v.filreferanse} className={'vedlegg-liste__element'}>
                        {erSafari ? (
                            <a
                                className={'nav-frontend-lenker'}
                                target={'_blank'}
                                rel={'noopener noreferer'}
                                href={'javascript:void(0)'}
                                onClick={() => {
                                    const blob = new Blob([v.fil], { type: v.fil.type });
                                    const url = window.URL.createObjectURL(blob);
                                    window.open(url, '_blank');
                                }}
                            >
                                {v.filnavn}
                            </a>
                        ) : (
                            <a
                                target={'_blank'}
                                rel={'noopener noreferer'}
                                href={window.URL.createObjectURL(v.fil)}
                            >
                                {v.filnavn}
                            </a>
                        )}
                        <button
                            className={'knapp knapp--flat vedlegg-liste__slett-knapp'}
                            onClick={() => onDelete(v.filreferanse)}
                        >
                            <FormattedMessage id={'app.vedlegg.slett'} />
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export { VedleggListe };
