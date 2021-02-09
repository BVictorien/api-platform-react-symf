//Les imports importants
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
// start the Stimulus application
import './bootstrap';
import NavBar from './js/components/Navbar';
import PrivateRoute from './js/components/PrivateRoute';
import AuthContext from './js/contexts/AuthContext';
import CustomerPage from './js/pages/CustomerPage';
import CustomersPage from './js/pages/CustomersPage';
import HomePage from './js/pages/HomePage';
import InvoicePage from './js/pages/InvoicePage';
import InvoicesPage from './js/pages/InvoicesPage';
import LoginPage from './js/pages/LoginPage';
import RegisterPage from './js/pages/RegisterPage';
import AuthAPI from './js/services/authAPI';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/register" component={RegisterPage}/>
            <PrivateRoute path="/invoices/:id" component={InvoicePage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <Route path="/" component={HomePage}/>
          </Switch>
      </main>
    </HashRouter>
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
  </AuthContext.Provider>
  );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);