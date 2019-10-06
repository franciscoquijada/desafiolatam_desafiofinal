import React from 'react';
import { Form, FormGroup, Input, Button, Label, Spinner } from 'reactstrap';
import useGenericInput from '../../hooks/useGenericInput';
import { productAsyncEdit } from '../../store/modules/product/product.action';
import { useDispatch } from 'react-redux';

const FormEdit = (props) => {
    const dispatch = useDispatch();
    const data = props.location.state;
    const id = data.data.id;
    const name = useGenericInput(data.data.name, 'text');
    const quantity = useGenericInput(data.data.quantity, 'number');
    const price = useGenericInput(data.data.price, 'number');
    const buttonIsDisabled = () => name.value === '' || quantity.value === '' || price.value === '';

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            "id": id,
            "name": name.value,
            "quantity": quantity.value,
            "price": price.value
        };
        console.log(' Edit ', data);
        dispatch(productAsyncEdit(data));

        setTimeout(() => {
            props.history.push("/home");

        }, 2000);



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
            <Button type='submit' color='info' disabled={buttonIsDisabled()}>Editar Producto</Button>
        </Form>
    )
}

export default FormEdit;