import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Category } from './pages/category';
import { Checkout } from './pages/checkout';
import { Login } from './pages/login/Login';
import { Main } from './pages/main';
import { Product } from './pages/product';
import { useAppSelector } from './store/store';

interface RouteProps {}

export const AppRoute: React.FC<RouteProps> = ({}) => {
  const user = useAppSelector((state) => state.userSlice.userInfo);
  const isLogged = user.name !== '';

  return (
    <Switch>
      {isLogged ? (
        <>
          <Navbar />
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
        </>
      ) : (
        <Route path="/">
          <Login />
        </Route>
      )}
    </Switch>
  );
};
