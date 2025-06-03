import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const RequestPage = lazy(() => import('src/pages/request'));
export const ProfilePage = lazy(() => import('src/module/profile/page/profile'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Success = lazy(() => import('src/pages/resultpayment/paymentResualt'));
export const PaymentPage = lazy(() => import('src/module/plan/payment/page/pymentpage'));
export const Plans = lazy(() => import('src/module/plan/page/plans'));
export const Plan = lazy(() => import('src/module/plan/page/plan'));
export const CertificateSideBar = lazy(() => import('src/module/certificateSideBar/cerSideBar')); //
export const PaymentResualt = lazy(() => import('src/pages/resultpayment/paymentResualt'));
export const PaymentCallBack = lazy(() => import('src/pages/pyment/paymentCallBack'));
export const OnetimeLogin = lazy(() => import('src/pages/onetimeLogin'));
export const DashTabs = lazy(() => import('src/module/calender/features/dashtabs'));
export const CreatePlan = lazy(() => import('src/module/createPlan/pages/cards.page'));
export const CardsDetail = lazy(() => import('src/module/createPlan/pages/cardsDetail.page'));
export const BankLetter = lazy(() => import('src/module/createPlan/pages/bankLetter.page'));
export const AgencyContract = lazy(() => import('src/module/createPlan/pages/agencycontract.page'));
export const BankLetterDraft = lazy(() => import('src/module/createPlan/pages/bankLetterdraft'));
export const AgencyContractDraft = lazy(() =>
  import(
    'src/module/createPlan/feature/agancyContract/feature/agancyContract/agancyContractDraft.feat'
  )
);
export const AssetsPage = lazy(() => import('src/module/dashboard/pages/Assets.page'));
export const ProfitsPage = lazy(() => import('src/module/dashboard/pages/profits.page'));
export const InvestmentWeightPage = lazy(() =>
  import('src/module/dashboard/pages/investmentWeight.page')
);

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'plans', element: <Plans /> },
        { path: 'plan/:traceCode', element: <Plan /> },
        { path: 'ProfilePage', element: <ProfilePage /> },
        { path: 'calender', element: <DashTabs /> },
        { path: 'createPlan', element: <CreatePlan /> },
        { path: 'certificate', element: <CertificateSideBar /> },
        { path: 'PaymentPage', element: <PaymentPage /> },
        { path: 'cardsDetail/:id', element: <CardsDetail /> },
        { path: 'agencyContract', element: <AgencyContract /> },
        { path: 'assets', element: <AssetsPage /> },
        { path: 'profits', element: <ProfitsPage /> },
        { path: 'investmentWeight', element: <InvestmentWeightPage /> },
      ],
    },
    {
      path: 'paymentresult',
      element: <PaymentResualt />,
    },
    {
      path: 'paymentCallBack',
      element: <PaymentCallBack />,
    },
    { path: 'bankLetter', element: <BankLetter /> },
    { path: 'bankLetterDraft', element: <BankLetterDraft /> },
    { path: 'agencyContractDraft', element: <AgencyContractDraft /> },

    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'onetimelogin/:uuid',
      element: <OnetimeLogin />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/admin',
      element: <adminAccess />,
    },
  ]);

  return routes;
}
