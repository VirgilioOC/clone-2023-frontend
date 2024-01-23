import React, { useState } from 'react'
import axios from 'axios'
import { Button, Modal, Alert } from 'react-bootstrap'
import CardsDetalleItem from './itemdetailcards'
import { API_URL } from '/app/page'

export default function DetalleItem(props){
    const { itemID, nombreItem, cart, modifyCart, quantity, setQuantity, cartImport, setCartImport, dolarValue } = props;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [retrieveError, setErrorAlert] = useState(false);

    const fetchData = () => {
    axios
        .get(process.env.API_URL + `items/${itemID}`)
        .then(response => {
            setData(response.data);
        })
        .catch(() => {
            showRetrieveErrorAlert();
        });
    };

    const handleAddToCart = (id, nombre, tamaño, costo, cantidad) => {
        if(cantidad > 0) {
            const updatedCart = cart.map(item => ({ ...item }));
            const itemToUpdate = updatedCart.find(item => item.id === id);
            
            if(itemToUpdate) {
                itemToUpdate.cantidad = itemToUpdate.cantidad + cantidad

                modifyCart(updatedCart)
                setQuantity(quantity + cantidad)
            }
            else{
                const cartItem = {
                    id,
                    nombre,
                    tamaño,
                    costo,
                    cantidad,
                }
        
                if(quantity > 0){
                    setQuantity(quantity + cantidad)
                }
                else {
                    setQuantity(cantidad)
                }

                modifyCart([...cart, cartItem]);
            }

            setCartImport(cartImport + parseInt(costo))
            showSuccessAlert();
        }
    };

    const showSuccessAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
    };
      
    const showRetrieveErrorAlert = () => {
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 2000);
    };

    return(
        <>
            <Button variant="danger" className="dropdown-basic-button" onClick={() => {
                handleShow();
                fetchData();
            }}>
                Comprar
            </Button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{ nombreItem } </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CardsDetalleItem data={data} handleAddToCart={handleAddToCart} dolarValue={dolarValue}/>
                </Modal.Body>
                <Modal.Footer>
                    <Alert variant="success" show={showAlert}>
                        Item agregado al carrito exitosamente.
                    </Alert>
                    <Alert variant="danger" show={retrieveError}>
                        Error al tratar de recuperar el detalle del item.
                    </Alert>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}