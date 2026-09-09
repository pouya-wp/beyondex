import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
export function LogoMark({size=34,className}: {size?:number;className?:string}) {
 return <img src="/brand/beyondex-mark.svg" width={size} height={size*100/115} alt="" aria-hidden="true" className={className}/>;
}
export function Logo({locale,className}: {locale:Locale;className?:string}) {
 return <Link href={localePath(locale)} className={cn("bx-brand-logo",className)} aria-label="Beyondex"><img src="/brand/beyondex-logo-white.svg" width={164} height={32} alt="beyondex"/></Link>;
}
