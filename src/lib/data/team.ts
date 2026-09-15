import type {Locale} from '@/lib/i18n/config';
type Localized = Record<Locale,string>;
export interface TeamMember {id:string;name:Localized;role:Localized;initials:string;image:string|null;links:{label:string;href:string}[]}
export const team:TeamMember[]=[
 {id:'amirhossein',name:{fa:'امیرحسین قطبی',en:'Amirhossein Ghotbi'},role:{fa:'مدیرعامل · CEO',en:'Chief Executive Officer · CEO'},initials:'AG',image:null,links:[]},
 {id:'pouya',name:{fa:'پویا صادق‌پور',en:'Pouya Sadeghpour'},role:{fa:'مدیر ارشد فناوری و محصول · CTO & CPO',en:'Chief Technology & Product Officer · CTO & CPO'},initials:'PS',image:null,links:[]},
 {id:'matin',name:{fa:'متین ایزدی',en:'Matin Izadi'},role:{fa:'مدیر ارشد بازاریابی · CMO',en:'Chief Marketing Officer · CMO'},initials:'MI',image:null,links:[]},
];
