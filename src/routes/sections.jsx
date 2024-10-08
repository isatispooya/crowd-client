/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const RequestPage = lazy(() => import('src/pages/request'));
export const ProfilePage = lazy(() => import('src/module/profile/page/profile'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProcessProjectPage = lazy(() => import('src/pages/processProject'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Success = lazy(() => import('src/pages/resultpayment/Success'));
export const Failed = lazy(() => import('src/pages/resultpayment/Failed'));
export const Card = lazy(() => import('src/components/stepper'));
export const PaymentPage = lazy(() => import('src/module/plan/payment/page/pymentpage'));
export const Plans = lazy(() => import('src/module/plan/page/plans'));
export const Plan = lazy(() => import('src/module/plan/page/plan'));
export const Certificate = lazy(() => import('src/components/certificate'));
export const Sterpercrowd = lazy(() => import('src/components/stepper'));
export const PaymentConfirmation = lazy(() => import('src/pages/resultpayment/Success'));
export const PaymentFailed = lazy(() => import('src/pages/resultpayment/Failed'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'plans', element: <Plans /> },
        { path: 'plan/:traceCode', element: <Plan /> },
        { path: 'process', element: <ProcessProjectPage /> },
        { path: 'ProfilePage', element: <ProfilePage /> },

        { path: 'card', element: <Sterpercrowd /> },
        { path: 'certificate', element: <Certificate /> },
        { path: 'PaymentPage', element: <PaymentPage /> },
        { path: 'Success', element: <PaymentConfirmation /> },
        { path: 'Failed', element: <PaymentFailed /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
