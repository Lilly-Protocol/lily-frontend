# Contributing to Lily Protocol Frontend

## Adding a New Route

Use the route scaffolding generator to create new pages consistently:

```bash
node scripts/add-route.mjs
```

The script will:
1. Prompt for route ID, title, path, section, and purpose
2. Generate the page file content using `createScaffoldPage` and `createScaffoldMetadata`
3. Print the registry entry to add to `src/config/routes.ts`
4. Print the type union update needed for `src/types/site.ts`
5. Optionally write the page file to the correct directory

### Manual Steps After Generation

1. Add the printed registry entry to `routeScaffolds` in `src/config/routes.ts`
2. Update `StaticSiteRoute` in `src/types/site.ts` if adding a static route
3. Update the route count assertion in `src/config/routes.test.ts` if applicable
4. Implement the real UI from Figma in the generated page file

## Development Setup

```bash
npm install
npm run dev
```

## Testing

```bash
npx vitest run
```
