/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AdminLayout, DashboardComponent, MenuComponent } from '../admin';
import { Login, Register } from '../auth';
import { AdminGuard, Guard, UnauthenticatedGuard } from '../routing-guard';

const _routes = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: DashboardComponent,
      },
      {
        path: 'auth',
        children: [
          {
            index: true,
            path: 'login',
            element: Login,
          },
          {
            path: 'register',
            element: Register,
          },
        ],
        guard: UnauthenticatedGuard,
      },
      {
        path: 'admin',
        element: AdminLayout,
        children: [
          {
            index: true,
            element: DashboardComponent,
          },
          {
            path: 'menu',
            element: MenuComponent,
          },
        ],
        guard: AdminGuard,
      },
      {
        path: 'user',
        element: DashboardComponent,
        guard: Guard,
      },
    ],
  },
];

/* eslint-disable-next-line */
const transformRoutes = (routes: any) => {
  /* eslint-disable-next-line */
  return routes.map((routeConfig: any) => {
    const {
      path,
      children,
      guard: RouteGuard,
      element: RouteElement,
      index,
      ...props
    } = routeConfig;
  });
};

const routes = transformRoutes(_routes);

console.log(routes);

export default routes;
