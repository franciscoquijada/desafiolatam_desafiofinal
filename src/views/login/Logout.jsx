import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutActionCreator } from '../../store/modules/auth/login.action';
import { Button } from 'reactstrap';

const Logout = (props) => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutActionCreator());
        props.history.push('/');
    }
    return (
        <div>
            <Button onClick={logout} color="warning">
                Cerrar sesión
            </Button>
        </div>
    );
}
export default Logout;