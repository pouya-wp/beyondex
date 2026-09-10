# Beyondex automated publishing

The production endpoint is `POST https://beyondex.one/api/blog/publish`. Its public, machine-readable contract is available at `https://beyondex.one/blog-publishing-guide.txt` and a compact description is returned by `GET /api/blog/publish`.

## Production secrets

Configure these encrypted environment variables for Production in Vercel, then redeploy:

- `BLOG_PUBLISH_SECRET`: the bearer secret shared only with the publishing agent.
- `GITHUB_CONTENT_TOKEN`: a fine-grained GitHub token limited to the `pouya-wp/beyondex` repository with **Contents: Read and write** permission.
- `GITHUB_REPOSITORY_OWNER=pouya-wp`
- `GITHUB_REPOSITORY_NAME=beyondex`
- `GITHUB_PUBLISH_BRANCH=main`

Do not place either secret in source code, prompts that will be published, query strings, or article JSON.

## Scheduler / Cowork instruction

Store the bearer secret in the automation's secret store as `BEYONDEX_BLOG_SECRET`, then schedule this instruction once per day:

> Create and publish exactly two distinct, high-value bilingual articles for the Beyondex Journal today. First read https://beyondex.one/blog-publishing-guide.txt and https://beyondex.one/content.json. Use the existing article list to avoid duplicate subjects, keyword cannibalization, and repeated slugs.
>
> Research each topic before writing. Prefer original documentation, standards bodies, peer-reviewed research, and other primary sources. Do not invent quotations, statistics, case studies, customer experience, or product capabilities. Choose topics that help a business reader make or implement a concrete decision about AI agents, workflow automation, evaluation, safety, or governance. Each article must contribute a practical framework, checklist, worked example, comparison, or decision method—not generic search-engine filler.
>
> Write the Persian and English versions for the same article. They should be natural editorial adaptations with the same factual meaning, not awkward literal translations. Follow every field and length rule in the publishing guide. Use 4–8 substantial sections, at least three relevant keywords per language, useful FAQs only when they answer real follow-up questions, and 2–8 directly relevant authoritative HTTPS sources. Titles and descriptions must accurately represent the article; never use clickbait or keyword stuffing.
>
> For each article, POST one JSON payload to https://beyondex.one/api/blog/publish with `Content-Type: application/json` and `Authorization: Bearer ${BEYONDEX_BLOG_SECRET}`. Publish the two articles sequentially with different topics and slugs. A 201 response is success. On 409, inspect the current content list and produce a genuinely different topic and slug. On 422, correct the returned validation details and retry once. Do not retry 401. For 429, 502, or 503, stop and report the status without claiming publication. At the end, report only confirmed Persian and English URLs returned by successful 201 responses, plus the source list used for each article.

The API adds a transparent AI-assistance disclosure when one is not supplied. Editorial validation rejects incomplete or thin submissions before they reach the repository.

## Request example

```bash
curl -X POST https://beyondex.one/api/blog/publish \
  -H "Authorization: Bearer $BEYONDEX_BLOG_SECRET" \
  -H "Content-Type: application/json" \
  --data @article.json
```

The endpoint writes a new JSON document under `content/blog/`. The unique slug makes publication idempotent: an existing slug returns HTTP 409 and is never overwritten.
