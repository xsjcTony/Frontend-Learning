/* eslint '@typescript-eslint/promise-function-async': 'off' */
/* eslint 'react/jsx-sort-props': 'off' */
/* eslint 'react/no-multi-comp': 'off' */
/* eslint 'react/display-name': 'off' */
/* eslint-disable react-hooks/exhaustive-deps */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from '@/components/Loading'
import RouteGuard from '@/components/RouteGuard'
import Page404 from '@/pages/Page404'
import type { LazyExoticComponent } from 'react'


/**
 * Lazy Loading Components
 */
const Home = lazyLoading(lazy(() => import('./pages/Home')))

const Admin = lazyLoading(lazy(() => import('./pages/Admin')))
// Intentionally wait for 2s for testing lazy loading
const Welcome = lazyLoading(lazy(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve(import('./pages/Admin/Welcome'))
  }, 2000)
})))
const Users = lazyLoading(lazy(() => import('./pages/Admin/Users')))
const Roles = lazyLoading(lazy(() => import('./pages/Admin/Roles')))
const Privileges = lazyLoading(lazy(() => import('./pages/Admin/Privileges')))
const Menus = lazyLoading(lazy(() => import('./pages/Admin/Menus')))

const Register = lazyLoading(lazy(() => import('./pages/Register')))
const Login = lazyLoading(lazy(() => import('./pages/Login')))
const Github = lazyLoading(lazy(() => import('./pages/OAuth/Github')))

const Verify = lazyLoading(lazy(() => import('./pages/resetPassword/Verify')))
const Reset = lazyLoading(lazy(() => import('./pages/resetPassword/Reset')))


/**
 * HOC
 */
function lazyLoading<P = {}>(LazyComponent: LazyExoticComponent<any>) {
  return (props: P): JSX.Element => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}


/**
 * App Component
 */
const App = (): JSX.Element => (
  <Routes>
    <Route element={<RouteGuard />}>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Welcome />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="privileges" element={<Privileges />} />
        <Route path="menus" element={<Menus />} />
        <Route path="*" element={<Page404 homePath="/admin" />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset_password">
        <Route index element={<Page404 lang />} />
        <Route path="verify" element={<Verify />} />
        <Route path="reset" element={<Reset />} />
        <Route path="*" element={<Page404 lang />} />
      </Route>
      <Route path="/oauth">
        <Route index element={<Page404 lang />} />
        <Route path="github" element={<Github />} />
        <Route path="*" element={<Page404 lang />} />
      </Route>
      <Route path="*" element={<Page404 lang />} />
    </Route>
  </Routes>
)

export default App
