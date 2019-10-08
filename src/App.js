import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Home from './components/products/Home';
import Welcome from './components/products/Welcome';
import FormCreate from './components/products/FormCreate';
import FormEdit from './components/products/FormEdit';
import Login from './views/login/Login';
import Logout from './views/login/Logout';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import PrivateRoute from './components/private-route/PrivateRoute';



function App() {
  const listarProductos =  <NavItem>
                              <NavLink href="home/">Listar Productos</NavLink>
                           </NavItem>;
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <div>
            <Navbar className="text-center" color="light" light expand="md">
              <NavbarBrand href="/">Crud de Productos Francisco Quijada</NavbarBrand>
              <NavbarToggler />
              <Collapse navbar>
                <Nav className="ml-auto" navbar>
                  {listarProductos}
                  <NavItem>
                    <NavLink><PrivateRoute path="/" component={Logout} /></NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/welcome" component={Welcome} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/createproducts" component={FormCreate} />
              <PrivateRoute exact path="/editproducts" component={FormEdit} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
