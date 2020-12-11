

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import thunk from "redux-thunk";
import Loading from './components/loading'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';
import './App.css';
import Layout from './pages/layout/index'
import Login from './pages/login'
moment.locale('zh-cn');
const { lazy, Suspense } = React
let middleware = [thunk];
let store = createStore(reducer, applyMiddleware(...middleware));
function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <Suspense fallback={<Loading size="large" />}>
            <Switch>
              <Route path="/login" exact component={(props: any) => <Login {...props} />} />
              <Route path="/" component={(props: any) => <Layout {...props} />} />
              {/* <Redirect to="/inside" exact/> */}
            </Switch>
          </Suspense>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
