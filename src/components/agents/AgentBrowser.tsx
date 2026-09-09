"use client";

import { useMemo, useState, useEffect } from "react";
import { AgentCard } from "./AgentCard";
import { Icons } from "@/components/ui/Icon";
import { agents, agentCategories, type AgentCategory } from "@/lib/data/agents";
import type { Dictionary } from "@/lib/i18n";
import { t, type Locale } from "@/lib/i18n/config";
import { cn, formatNumber } from "@/lib/utils";

type Sort = "popular" | "priceAsc" | "priceDesc" | "rating";

export function AgentBrowser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [category, setCategory] = useState<AgentCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

  useEffect(()=>{const select=(event:Event)=>{const id=(event as CustomEvent).detail;if(agentCategories.some(c=>c.id===id)){setCategory(id);setQuery('');}};window.addEventListener('beyondex-category',select);return()=>window.removeEventListener('beyondex-category',select);},[]);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = agents.filter((agent) => {
      if (category !== "all" && agent.category !== category) return false;
      if (!needle) return true;

      const haystack = [
        agent.name.en,
        agent.name.fa,
        agent.tagline.en,
        agent.tagline.fa,
        agent.description.en,
        agent.description.fa,
        ...agent.integrations,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });

    const sorted = [...filtered];
    const priceOf = (a: (typeof agents)[number]) => (locale === "fa" ? a.price.irt : a.price.usd);

    switch (sort) {
      case "priceAsc":
        sorted.sort((a, b) => priceOf(a) - priceOf(b));
        break;
      case "priceDesc":
        sorted.sort((a, b) => priceOf(b) - priceOf(a));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => b.installs - a.installs);
    }

    return sorted;
  }, [category, query, sort, locale]);

  const sortOptions: { id: Sort; label: string }[] = [
    { id: "popular", label: locale === "fa" ? "محبوب‌ترین" : "Most popular" },
    { id: "rating", label: locale === "fa" ? "بالاترین امتیاز" : "Top rated" },
    { id: "priceAsc", label: locale === "fa" ? "ارزان‌ترین" : "Price: low to high" },
    { id: "priceDesc", label: locale === "fa" ? "گران‌ترین" : "Price: high to low" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 start-4 grid place-items-center text-ink-subtle">
            <Icons.search size={17} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.common.search}
            aria-label={dict.common.search}
            className="h-12 w-full rounded-full border border-line bg-bg ps-12 pe-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-brand-400"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label={locale === "fa" ? "مرتب‌سازی" : "Sort"}
            className="h-12 w-full cursor-pointer appearance-none rounded-full border border-line bg-bg ps-5 pe-11 text-sm text-ink outline-none transition-colors focus:border-brand-400 lg:w-56"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-surface text-ink">
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 end-4 grid place-items-center text-ink-subtle">
            <Icons.chevronDown size={16} />
          </span>
        </div>
      </div>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        {agentCategories.map((cat) => {
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={active}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-all",
                active
                  ? "border-brand-400/50 bg-primary-soft text-brand-700"
                  : "border-line text-ink-muted hover:border-brand-400 hover:text-ink",
              )}
            >
              {t(cat.label, locale)}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-[0.8125rem] text-ink-subtle tabular">
        {formatNumber(results.length, locale)} {dict.common.results}
      </p>

      {results.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} locale={locale} dict={dict} />
          ))}
        </div>
      ) : (
        <div className="card mt-5 flex flex-col items-center gap-4 px-6 py-20 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-bg text-ink-subtle">
            <Icons.search size={22} />
          </span>
          <p className="text-sm text-ink-muted">{dict.common.noResults}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="rounded-full border border-line-strong px-5 py-2 text-[0.8125rem] font-semibold text-ink transition-colors hover:border-brand-400 hover:text-brand-700"
          >
            {dict.common.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
}
