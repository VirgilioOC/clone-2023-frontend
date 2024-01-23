import React from "react"
import { Alert } from "react-bootstrap"

export default function Alertas(props) {
    const { showAlert, errorAlert, emptyCartAlert, succeedAlert, errorMessages, succeedMessage, addSuccess, showMercadoPagoError } = props;

    return(
        <>
            <Alert variant="success" show={addSuccess}>
                Item agregado al carrito exitosamente.
            </Alert>
            <Alert variant="info" show={showAlert}>
                Item eliminado del carrito exitosamente.
            </Alert>
            {errorMessages.map( err => (
                <Alert variant="danger" show={errorAlert} key={errorMessages.indexOf(err)}>
                    {err}
                </Alert>
            ))}
            <Alert variant="info" show={emptyCartAlert}>
                El carrito está vacío.
            </Alert>
            <Alert variant="success" show={succeedAlert}>
                {succeedMessage}
            </Alert>
            <Alert variant="danger" show={showMercadoPagoError}>
                Hubo un error al procesar tu pedido.
            </Alert>
        </>
    );
}