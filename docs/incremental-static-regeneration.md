# Marketing page revalidation

Marketing routes use Incremental Static Regeneration (ISR) with a one-hour default interval:

```ts
export const revalidate = 3600;
```

The value is exported from `src/app/(marketing)/layout.tsx`, so it applies to every page in that route group. Next.js still prerenders the pages during `npm run build`. After a cached page is at least one hour old, the next request can trigger background regeneration while visitors continue to receive the cached response.

## Choosing an interval

Keep the one-hour interval for general marketing pages. A page or cached fetch may use a lower static `revalidate` value when its content has a documented freshness requirement, such as time-sensitive announcements. Avoid lowering the shared interval for content that changes only through deployments because doing so creates unnecessary regeneration work.

## CMS-triggered updates

When marketing content moves to a CMS, add an authenticated Route Handler for its webhook and call `revalidatePath` only after validating the provider's signature. Revalidate the affected public path rather than invalidating the entire site:

```ts
import { revalidatePath } from "next/cache";

revalidatePath("/blog");
```

Do not expose an unauthenticated revalidation endpoint. Keep webhook secrets server-side, reject invalid signatures, and return a non-success response without calling `revalidatePath` when validation fails.

The time-based interval remains a fallback for missed webhook events. If a future CMS integration uses cache tags, document the tag ownership and use `revalidateTag` for the smallest affected content set.
