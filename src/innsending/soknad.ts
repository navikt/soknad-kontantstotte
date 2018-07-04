import { IBarn } from '../barn/types';
import { IArbeidsforhold } from '../sider/arbeidsforhold/ArbeidsforholdSide';
import { IBarnehageplass } from '../sider/barnehageplass/BarnehageplassSide';
import { IAnnenForelder } from '../sider/familieforhold/AnnenForelderInfo';
import { IFamilieforhold } from '../sider/familieforhold/FamilieforholdSide';
import { ISokerKrav } from '../sider/start/StartSide';

interface IFamilieforholdOgAnnenForelder extends IFamilieforhold {
    annenForelder?: IAnnenForelder;
}

export interface ISoknad {
    arbeidsforhold: IArbeidsforhold;
    barn: IBarn;
    barnehageplass: IBarnehageplass;
    familieforhold: IFamilieforholdOgAnnenForelder;
    sokerKrav: ISokerKrav;
}
