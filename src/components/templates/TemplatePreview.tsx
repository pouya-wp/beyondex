import { Badge } from "@/components/ui/Primitives";
import type { LandingTemplate } from "@/lib/data/templates";

/**
 * A wireframe of the page each template builds, drawn in white on the
 * template's own gradient — readable at card size without a screenshot.
 */
export function TemplatePreview({ template, height = "h-44" }: { template: LandingTemplate; height?: string }) {
  return (
    <div
      className={`relative ${height} overflow-hidden`}
      style={{ background: `linear-gradient(135deg, ${template.gradient[0]}, ${template.gradient[1]})` }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-0 flex flex-col gap-2 p-6 transition-transform duration-500 group-hover:scale-[1.04]">
        <div className="h-2 w-12 rounded-full bg-white/70" />
        <div className="h-3.5 w-3/4 rounded-full bg-white/85" />
        <div className="h-3.5 w-1/2 rounded-full bg-white/55" />
        <div className="mt-2 flex gap-2">
          <div className="h-6 w-20 rounded-lg bg-white" />
          <div className="h-6 w-16 rounded-lg border border-white/70" />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2">
          {[0, 1, 2].map((k) => (
            <div key={k} className="h-9 rounded-lg bg-white/30" />
          ))}
        </div>
      </div>

      <div className="absolute top-3 end-3 flex gap-1.5">
        {template.rtlReady ? (
          <span className="rounded-lg bg-white/95 px-2 py-1 text-[0.625rem] font-bold text-ink">RTL</span>
        ) : null}
        <span className="rounded-lg bg-white/95 px-2 py-1 text-[0.625rem] font-bold text-c-green">
          {template.lift}
        </span>
      </div>
    </div>
  );
}

export { Badge };
