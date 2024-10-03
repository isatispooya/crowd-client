/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import Plan from 'src/module/plan/page/plan';
import Plans from 'src/module/plan/page/plans';
import Certificate from 'src/components/certificate';
import Sterpercrowd from 'src/components/stepper';
import PaymentPage from 'src/module/plan/payment/page/pymentpage';
import PaymentConfirmation from 'src/pages/resultpayment/Success';
import PaymentFailed from 'src/pages/resultpayment/Failed';

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
