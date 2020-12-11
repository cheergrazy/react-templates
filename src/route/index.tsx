import * as React from 'react'
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import Loading from './../components/loading'
import NotFound from './../components/notFound'
const { lazy, Suspense } = React
const FaceSignData = lazy(() => import( /* webpackChunkName:"脸签到系统-签到数据" */ '../pages/FaceSignSystems/FaceSignData'))
const FaceDatabase = lazy(() => import( /* webpackChunkName:"人脸签到系统-人脸数据库" */ '../pages/FaceSignSystems/FaceDatabase'))
const CardDatabase = lazy(() => import( /* webpackChunkName:"人脸签到系统-人脸数据库" */ '../pages/CardSignSystems/CardDatabase'))
const CardSignData = lazy(() => import( /* webpackChunkName:"人脸签到系统-人脸数据库" */ '../pages/CardSignSystems/CardSignData'))
export const routes: RouteProps[]= [
  {
    path: '/',
    exact: true,
    component: FaceSignData
  },
  {
    path: '/FaceSignData',
    exact: true,
    component: FaceSignData
  },
  {
    path: '/FaceDatabase',
    exact: true,
    component: FaceDatabase
  },  
  {
    path: '/CardDatabase',
    exact: true,
    component: CardDatabase
  },   
  {
    path: '/CardSignData',
    exact: true,
    component: CardSignData
  },   
  {
    path: '*',
    exact: true,
    component: NotFound
  }
]
const Router = (authorized: boolean) => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Switch>
        {
          routes.map(r => {
            const { path, exact, component } = r
            const LazyCom: keyof JSX.IntrinsicElements | any = component
            return <Route key={path + ''} exact={!!exact} path={path} render={(props: any) => (authorized ? <LazyCom {...props} /> : <Redirect to="/login" />)} />
          })
        }
      </Switch>      
    </Suspense>
  )
}

export default Router
