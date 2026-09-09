import { notFound, permanentRedirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
export default async function RemovedPage({params}: {params:Promise<{locale:string}>}) {
 const {locale}=await params;
 if(!isLocale(locale)) notFound();
 permanentRedirect(`/${locale}/agents`);
}
