import React, { useEffect } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Table,
    Spinner
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productAsyncCreatorGetAll, productAsyncDelete } from './../../store/modules/product/product.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const Home = (props) => {
    const dispatch = useDispatch();
    const jwt = useSelector(store => store.auth.auth.data);
    const data = useSelector(store => store.products.getAll.data);
    const addIcon = <FontAwesomeIcon icon={faPlus} />;
    const removeIcon = <FontAwesomeIcon icon={faTrash} />;
    const editIcon = <FontAwesomeIcon icon={faEdit} />;


    useEffect(() => {
        dispatch(productAsyncCreatorGetAll());
    }, [])

    const handleDelete = (data) => {
        dispatch(productAsyncDelete(data));
        props.history.push('/home');
    }

    const table = <Table responsive hover borderless striped bordered size="sm">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Editar</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            {data ? data.map((data) => (
                <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.price}</td>
                    <td>{data.quantity}</td>
                    <td><Link to={{
                        pathname: '/editproducts', state: {
                            data: data
                        }
                    }}>
                        <Button style={{ color: 'white' }} color="info" >
                            Editar {editIcon}
                        </Button></Link>
                    </td>
                    <td><Button color="danger" onClick={() => { handleDelete(data) }}>Eliminar {removeIcon}</Button></td>
                </tr>
            )) : null}
        </tbody>
    </Table>;

    const spinner = <div className="mt-5" style={{ align: 'center' }}>
        <Spinner animation="border" role="status">
            Cargando...
        </Spinner>
    </div>;

    const btnAdd = <Link to="/createproducts">
        <Button style={{ color: 'white' }} color="success">
            Agregar {addIcon}
        </Button>
    </Link>;

    return (
        <div>
            <Card>
                <CardBody >
                    {btnAdd}
                    {data ? table : spinner}
                </CardBody>
                <CardFooter>
                    Francisco Quijada. Todos los derechos reservados 2019
            </CardFooter>
            </Card>
        </div>
    )
};

export default Home;