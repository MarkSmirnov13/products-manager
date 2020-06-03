import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import ProductsPage from './pages/ProductsPage';
import NotFound from './components/NotFound/NotFound';
import AddProductPage from './pages/AddProductPage';
import UpdateProductPage from './pages/UpdateProductPage';

export function getRoutes() {
  return (
    <HashRouter>
      <Main>
        <Switch>
          <Route exact path='/' component={ProductsPage} />,
          <Route path='/add' component={AddProductPage} />
          <Route path='/update/:id' component={UpdateProductPage} />
          <Route path='*' component={NotFound} />,
        </Switch>
      </Main>
    </HashRouter>
  );
}

export default getRoutes;
