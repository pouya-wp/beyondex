"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { FloatingNote } from "./FloatingNote";
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
export function SiteChrome({children,locale,dict}: {children:ReactNode;locale:Locale;dict:Dictionary}) {
 const pathname=usePathname();
 if(pathname===`/${locale}/dashboard` || pathname?.startsWith(`/${locale}/dashboard/`)) return <main id="main">{children}</main>;
 return <><Header locale={locale} dict={dict}/><main id="main">{children}</main><Footer locale={locale} dict={dict}/><FloatingNote locale={locale}/></>;
}
