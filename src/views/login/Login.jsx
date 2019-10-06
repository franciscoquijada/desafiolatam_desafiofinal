import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Alert, Button, Form, FormGroup, Label, Card, Container, Col, Row, CardHeader, CardBody } from 'reactstrap';
import useInput from '../../hooks/useGenericInput';

import { loginActionsAsyncCreator as loginAction } from '../../store/modules/auth/login.action';


const Login = (props) => {
    const dispatch = useDispatch();
    const error = useSelector(store => store.auth.auth.error);
    const errorMessage = useSelector(store => store.auth.auth.errorMessage);

    const jwt = useSelector(store => store.auth.auth.data);
    console.log('jwt: ', jwt);
    const email = useInput('', 'text');
    const password = useInput('', 'password');

    const buttonIsDisabled = () => password.value === '' || email.value === '';

    useEffect(() => {
        if (jwt !== null) {
            props.history.push('/welcome')
        }
    }, [jwt, error, props])

    return (
        <Container className="mt-4">
            <Row>
                <Col sm={{ size: 4, offset: 4 }}>
                    <Card>
                        <CardHeader>Iniciar sesión</CardHeader>
                        <CardBody>
                            <Form>
                                <pre className="text-left">
                                </pre>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input {...email} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Contraseña</Label>
                                    <Input {...password} />
                                </FormGroup>
                                <Button
                                    disabled={buttonIsDisabled()}
                                    onClick={() => dispatch(loginAction(email.value, password.value))}
                                >Iniciar Sesión</Button>
                            </Form></CardBody>
                        {error && <Alert color="danger">
                            {errorMessage}
                        </Alert>}
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

export default Login;