import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
// This is my routes start
{
  exact: 'true',
  path: '/dashboard',
  element: lazy(() => import('./views/dashboard'))
},
// User Management
{
  exact: 'true',
  path: '/users/staff',
  element: lazy(() => import('./views/user/StaffList'))
},
{
  exact: 'true',
  path: '/users/guests',
  element: lazy(() => import('./views/user/GuestList'))
},
// Room Management
{
  exact: 'true',
  path: '/rooms',
  element: lazy(() => import('./views/rooms/RoomInventory'))
},
{
  exact: 'true',
  path: '/rooms/status',
  element: lazy(() => import('./views/rooms/RoomStatus'))
},
// Reservations
{
  exact: 'true',
  path: '/reservations',
  element: lazy(() => import('./views/reservations/Reservations'))
},
{
  exact: 'true',
  path: '/checkin-checkout',
  element: lazy(() => import('./views/reservations/CheckInOut'))
},
// Billing
{
  exact: 'true',
  path: '/billing',
  element: lazy(() => import('./views/billing/BillingList'))
},
// Housekeeping & Maintenance
{
  exact: 'true',
  path: '/housekeeping',
  element: lazy(() => import('./views/housekeeping/HousekeepingTasks'))
},
{
  exact: 'true',
  path: '/maintenance',
  element: lazy(() => import('./views/maintenance/MaintenanceRequests'))
},
// Analytics & Reports
{
  exact: 'true',
  path: '/reports',
  element: lazy(() => import('./views/reports/AnalyticsDashboard'))
},
// Feedback & Services
{
  exact: 'true',
  path: '/feedback',
  element: lazy(() => import('./views/feedback/GuestFeedback'))
},
{
  exact: 'true',
  path: '/services',
  element: lazy(() => import('./views/services/GuestServices'))
},

// This is my routes end




      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
