import Link from "next/link";
import { Icons } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div className="wash" />
      <div className="dots" />

      <div className="container-page relative text-center">
        <span className="text-primary text-[clamp(4rem,14vw,9rem)] font-extrabold leading-none tracking-tighter">
          404
        </span>

        <h1 className="balance mt-4 text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold tracking-[-0.02em]">
          This page went off-script · این صفحه از سناریو خارج شد
        </h1>

        <p className="pretty mx-auto mt-4 max-w-md text-[0.9375rem] leading-[1.95] text-ink-muted">
          The link is broken or the page moved. لینک خراب است یا صفحه جابه‌جا شده.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/fa"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--brand-600),var(--brand-400))] px-7 text-[0.9375rem] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            بازگشت به خانه
            <Icons.arrowRight size={16} className="flip-rtl" />
          </Link>
          <Link
            href="/en"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-7 text-[0.9375rem] font-semibold transition-colors hover:border-brand-400 hover:text-brand-700"
          >
            Back home
            <Icons.arrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
