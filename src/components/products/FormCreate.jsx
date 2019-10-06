import React from 'react';
import { Form, FormGroup, Input, Button, Label, Spinner } from 'reactstrap';
import useGenericInput from './../../hooks/useGenericInput';
import { productAsyncCreate } from './../../store/modules/product/product.action';
import { useDispatch } from 'react-redux';

const FormCreate = (props) => {
    const dispatch = useDispatch();
    const name = useGenericInput('', 'text');
    const quantity = useGenericInput('', 'number');
    const price = useGenericInput('', 'number');
    const buttonIsDisabled = () => name.value === '' || quantity.value === '' || price.value === '';

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let data = {
            "name": name.value,
            "quantity": quantity.value,
            "price": price.value
        };
        dispatch(productAsyncCreate(data));
        props.history.push("/home");

    }
    return (
        <Form onSubmit={handleSubmitForm}>
            <FormGroup>
                <Label>Nombre</Label>
                <Input {...name} />
            </FormGroup>
            <FormGroup>
                <Label>Cantidad</Label>
                <Input {...quantity} />
            </FormGroup>
            <FormGroup>
                <Label>Precio</Label>
                <Input {...price} />
            </FormGroup>
            <Button type='submit' color='info' disabled={buttonIsDisabled()}>Crear Producto</Button>
        </Form>
    )
}

export default FormCreate;