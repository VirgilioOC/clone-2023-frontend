import React from 'react'
import { Form, FormControl, Button } from "react-bootstrap"
import MercadoPago from './mercadopago'

export default function DetallesDeCliente(props) {
    const { direccion, setDireccion, altura, setAltura, handleOrderConfirmation, showMercadoPagoModal, changeMPModalVisibility, handleOrderPost, cartImport, showMPError } = props;

    const handleDireccionChange = (event) => {
        setDireccion(event.target.value);
    };

    const handleAlturaChange = (event) => {
        setAltura(event.target.value);
    };

    return(
        <>
            <Form.Group className="mb-3">
                <Form.Label>Direccion:</Form.Label>
                <FormControl
                    type="string"
                    value={direccion}
                    onChange={(event) => handleDireccionChange(event)}
                />
                <Form.Label>Altura:</Form.Label>
                <FormControl
                    type="number"
                    value={altura}
                    onChange={(event) => handleAlturaChange(event)}
                />
            </Form.Group>
            <MercadoPago showMercadoPagoModal={showMercadoPagoModal} changeMPModalVisibility={changeMPModalVisibility} handleOrderPost={handleOrderPost} cartImport={cartImport} showMPError={showMPError}/>
            <Button className="mb-2" variant="primary" size="lg" onClick={handleOrderConfirmation}>
                Confirmar Pedido 
            </Button>
        </>
    );
}