import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { Dashboard } from "@/components/dashboard/Dashboard";
export const metadata:Metadata={title:"پنل کاربری | Dashboard",robots:{index:false,follow:false}};
export default async function DashboardPage({params}: {params:Promise<{locale:string}>}) {
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <Dashboard locale={locale}/>;
}
