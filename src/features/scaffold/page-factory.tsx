import { PageScaffold } from '@/components/scaffold/page-scaffold';
import { getRouteScaffold } from '@/config/routes';
import type { RouteScaffold } from '@/types/site';

export function createScaffoldPage(routeId: RouteScaffold['id']) {
  const route = getRouteScaffold(routeId);

  return function ScaffoldPage() {
    return <PageScaffold route={route} />;
  };
}
