/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AdminLayout, DashboardComponent, MenuComponent } from '../admin';
import { Login, Register } from '../auth';
import { AdminGuard, Guard, UnauthenticatedGuard } from '../routing-guard';

interface IRoute {
  path: string;
  element?: any;
  index?: boolean;
  children: IRoute[];
  guard?: any;
}

const routes: Array<any> = [
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

export default routes;
