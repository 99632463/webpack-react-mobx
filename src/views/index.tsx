import React from 'react';
import { withRouter } from 'react-router-dom';

const withWrap = (loader: React.LazyExoticComponent<any>) => (props: IKeyValueMap) => {
  return <React.Suspense fallback={<div>loading......</div>}>
    {React.createElement(withRouter(loader), props)}
  </React.Suspense>;
};

export const Main = withWrap(React.lazy(() => import(
  './main'
)));

export const About = withWrap(React.lazy(() => import(
  './about'
)));