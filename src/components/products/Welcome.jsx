import React, { useEffect } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
} from 'reactstrap';

const Home = () => {
    return (
        <div>
            <Card>
                <CardBody className="App-body">
                    <b><h3>Bienvenido a crud de Productos Francisco Quijada</h3></b>
                </CardBody>
                <CardFooter>
                    Francisco Quijada. Todos los derechos reservados 2019
            </CardFooter>
            </Card>
        </div>
    )
};

export default Home;