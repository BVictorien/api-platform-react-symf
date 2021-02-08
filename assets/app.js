//Les imports importants
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
// start the Stimulus application
import './bootstrap';
import NavBar from './js/components/Navbar';
import PrivateRoute from './js/components/PrivateRoute';
import AuthContext from './js/contexts/AuthContext';
import CustomersPage from './js/pages/CustomersPage';
import HomePage from './js/pages/HomePage';
import InvoicesPage from './js/pages/InvoicesPage';
import LoginPage from './js/pages/LoginPage';
import AuthAPI from './js/services/authAPI';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

//Javascript
AuthAPI.setup();

const App = () => {
  //TODO: Il faudrait par défaut qu'on demande à notre authAPI si on est connecté ou pas
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  const NavbarWithRouter = withRouter(NavBar); 

  return (
  <AuthContext.Provider value={{
    isAuthenticated,
    setIsAuthenticated
  }}>
    <HashRouter>
      <NavbarWithRouter />

      <main className="container pt-5">
          <Switch>
            <Route path="/login" component={LoginPage}/>
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <Route path="/" component={HomePage}/>
          </Switch>
      </main>
    </HashRouter>
  </AuthContext.Provider>
  );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);