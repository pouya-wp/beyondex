import { agents } from "./agents";
import { plans } from "./plans";
import type { L10n, Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/config";

export type CatalogKind = "agent" | "template" | "plan";

export interface CatalogItem {
  sku: string;
  kind: CatalogKind;
  name: L10n;
  subtitle: L10n;
  /** Monthly price for agents and plans; one-time price for templates. */
  price: { usd: number; irt: number };
  recurring: boolean;
}

/**
 * One lookup for everything that can be bought, so checkout never has to know
 * which catalog a SKU came from. SKUs are `kind:slug`.
 */
export function resolveItem(params: {
  agent?: string;
  template?: string;
  plan?: string;
  cycle?: string;
}): CatalogItem | undefined {
  if (params.agent) {
    const agent = agents.find((a) => a.slug === params.agent);
    if (!agent) return undefined;
    return {
      sku: `agent:${agent.slug}`,
      kind: "agent",
      name: agent.name,
      subtitle: agent.tagline,
      price: agent.price,
      recurring: true,
    };
  }

  if (params.template) return undefined;

  const planId = params.plan ?? "growth";
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return undefined;

  const yearly = params.cycle === "yearly";
  const rate = yearly ? plan.yearly : plan.monthly;
  if (!rate) return undefined;
  const price = yearly ? { usd: rate.usd * 12, irt: rate.irt * 12 } : rate;

  return {
    sku: `plan:${plan.id}:${yearly ? "yearly" : "monthly"}`,
    kind: "plan",
    name: plan.name,
    subtitle: plan.blurb,
    price,
    recurring: true,
  };
}

export function itemTitle(item: CatalogItem, locale: Locale) {
  return t(item.name, locale);
}
