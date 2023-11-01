import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './scss/app.scss';
import LayoutOne from './layouts/LayoutOne';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart')); // динамически подгружает компонент когда действительно надо
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

export function App() {
  // до оптимизации 100.2 kB kB
  // после 100 kB
  // 0.2% экономии, но по факту скорее больше, в большем проекте эффект будет заметнее
  return (
    <Routes>
      <Route path="/" element={<LayoutOne /*теперь тут находится header и прочее*/ />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
