import { IBarn } from '../barn/types';
import { IArbeidsforhold } from '../sider/arbeidsforhold/ArbeidsforholdSide';
import { IBarnehageplass } from '../sider/barnehageplass/BarnehageplassSide';
import { IAnnenForelder } from '../sider/familieforhold/AnnenForelderInfo';
import { IFamilieforhold } from '../sider/familieforhold/FamilieforholdSide';
import { ISokerKrav } from '../sider/start/StartSide';

export interface ISoknad {
    annenForelder?: IAnnenForelder;
    arbeidsforhold: IArbeidsforhold;
    barn: IBarn;
    barnehageplass: IBarnehageplass;
    familieforhold: IFamilieforhold;
    sokerKrav: ISokerKrav;
}
