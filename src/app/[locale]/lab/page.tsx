import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {isLocale} from '@/lib/i18n/config';
import {InteractionLab} from '@/components/experiments/InteractionLab';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:locale==='fa'?'آزمایشگاه تعامل':'Interaction lab',description:locale==='fa'?'۶۰ تجربهٔ تعاملی در حرکت، فرم و طراحی.':'60 interactive studies in motion, form and design.'};}
export default async function LabPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <InteractionLab locale={locale}/>;}
