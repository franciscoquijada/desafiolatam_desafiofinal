import React from 'react';
import { Form, FormGroup, Input, Button, Label, Spinner } from 'reactstrap';
import { productAsyncDelete } from './../../store/modules/product/product.action';
import { useDispatch } from 'react-redux';

const FormCreate = (props) => {
    const dispatch = useDispatch();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let data = {
            "id": name.value
        };
        dispatch(productAsyncDelete(data));
        props.history.push("/");
    }
    return (
        <Form onSubmit={handleSubmitForm}>
            <h1>¿Seguro que deseas eliminar este registro?</h1>
            <Button type='submit' color='info'>Eliminar</Button>
        </Form>
    )
}

export default FormCreate;