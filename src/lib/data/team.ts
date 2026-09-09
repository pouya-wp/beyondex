import type {Locale} from '@/lib/i18n/config';
type Localized = Record<Locale,string>;
export interface TeamMember {id:string;name:Localized;role:Localized;initials:string;image:string|null;links:{label:string;href:string}[]}
export const team:TeamMember[]=[
 {id:'pouya',name:{fa:'پویا صادق‌پور',en:'Pouya Sadeghpour'},role:{fa:'مدیر مهندسی و برنامه‌نویسی · طراح و لید محصول',en:'Engineering lead · Product designer & lead'},initials:'PS',image:null,links:[]},
 {id:'amirhossein',name:{fa:'امیرحسین قطبی',en:'Amirhossein Ghotbi'},role:{fa:'مدیر پروژه · مدیر تولید محتوا',en:'Project manager · Content lead'},initials:'AG',image:null,links:[]},
 {id:'matin',name:{fa:'متین ایزدی',en:'Matin Izadi'},role:{fa:'مدیر مارکتینگ',en:'Marketing lead'},initials:'MI',image:null,links:[]},
];
