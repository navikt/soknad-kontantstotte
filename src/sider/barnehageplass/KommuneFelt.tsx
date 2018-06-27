import TextareaControlled from "nav-frontend-skjema/lib/textarea-controlled";
import * as React from 'react';

interface IOwnProps {
    nokkel: string;
    settKommune: (verdi: string) => any;
    kommune?: string;
}

type KommuneFeltProps = IOwnProps;

const KommuneFelt: React.StatelessComponent<KommuneFeltProps> = ({nokkel, settKommune, kommune}) => {
    return (
        <TextareaControlled
            label={'Hvilken kommune ligger barnehagen i?'}
            defaultValue={kommune || ''}
            onBlur={
                (evt: React.SyntheticEvent<EventTarget>) => {
                    settKommune((evt.target as HTMLInputElement).value);
                }
            }
            maxLength={200}
        />
    );
};

export default KommuneFelt;
