import React from 'react';
import {useSelector} from 'react-redux';
import Logout from '../../views/login/Logout';
import PrivateRoute from '../../components/private-route/PrivateRoute';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

const NavBar = () => {
    const jwt = useSelector(store => store.auth.auth.data);
    const listarProductos =  <NavItem>
        <NavLink href="home/">Listar Productos</NavLink>
    </NavItem>;

    return (
        <Navbar className="text-center" color="light" light expand="md">
            <NavbarBrand href="/">Crud de Productos Francisco Quijada</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
                <Nav className="ml-auto" navbar>
                    {jwt && listarProductos}
                    <NavItem>
                        <NavLink><PrivateRoute path="/" component={Logout} /></NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default NavBar;