import React, { useState } from 'react'
import { Button, Badge, Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import DetallesDeCliente from './clientdetail'
import Alertas from './messagealerts'
import TablaCarritoDeCompras from './shoppingcarttable'

export default function CarritoDeCompras(props){
    const { cart, quantity, cartImport, setQuantity, setCartImport, modifyCart, dolarValue, handleShowLogInModal, fetchClientOrders } = props;

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorAlert, setShowErrorAlert] = useState(false);
    const [emptyCartAlert, setEmptyCartAlert] = useState(false);
    const [succeedAlert, setSucceedAlert] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [direccion, setDireccion] = useState("");
    const [altura, setAltura] = useState(0);
    const [succeedMessage, setSucceedMessage] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);
    const [showMercadoPagoModal, setShowMercadoPagoModal] = useState(false);
    const [showMercadoPagoError, setMercadoPagoError] = useState(false);

    const changeMPModalVisibility = () => setShowMercadoPagoModal(!showMercadoPagoModal);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const prepareOrderDetail = () => {
        return cart.reduce((items, cartItem) => {
            for (let i = 0; i < cartItem.cantidad; i++) {
              items.push({ id: cartItem.id });
            }
            return items;
        }, []);
    }

    const handleOrderConfirmation = async () => {
        const detalleItems = prepareOrderDetail();

        const formData = {
            direccion: direccion,
            direccion_altura: altura,
            detalle_items: detalleItems
        };

        await axios
        .post(
            process.env.API_URL + `pedidos/chequeo`, 
            formData,
            {
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem("token")
                },
            }
        )
        .then(() => {
            changeMPModalVisibility();
        })
        .catch((error) => {
            if(error.response.status == 401) {
                handleShowLogInModal();
            }
            else{
                setErrorMessages(error.response.data.errors);
                showActionAlert("error");
            }
        });
    }

    const handleOrderPost = async () => {
        const detalleItems = prepareOrderDetail();
        
        const postData = {
            importe: cartImport,
            direccion: direccion,
            direccion_altura: altura,
            detalle_items: detalleItems
        };

        try {
            const response = 
                await axios.post(
                    process.env.API_URL + `pedidos`, 
                    postData,
                    {
                        headers: {
                            'Authorization': 'Bearer '+ localStorage.getItem("token")
                        },
                    }
                );
        
            setSucceedMessage(response.data.message);
            modifyCart([]);
            setCartImport(0);
            setQuantity(0);
            showActionAlert("succeed");
            fetchClientOrders();
          } catch (error) {
            setErrorMessages(error.response.data.errors);
            showActionAlert("error");
          }
    };

    const showActionAlert = (tipo) => {
        selectAlertType(tipo, true);
        setTimeout(() => {
            selectAlertType(tipo, false);
        }, 2000);
    };

    const selectAlertType = (tipo, estado) => {
        switch(tipo){
            case "itemdeleted":
                setShowAlert(estado);
                break;
            case "error":
                setShowErrorAlert(estado);
                break;
            case "emptycart":
                setEmptyCartAlert(estado);
                break;
            case "succeed":
                setSucceedAlert(estado);
                break;
            case "add":
                setAddSuccess(estado);
                break;
            case "MPError":
                setMercadoPagoError(estado);
                break;
        }
    };

    return(
        <>
            <Button variant="light" size="lg" onClick={handleShowOffcanvas}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <Badge bg="danger" pill>{quantity}</Badge>
            </Button>

            <Offcanvas placement='end' show={showOffcanvas} onHide={handleCloseOffcanvas}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Items en Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DetallesDeCliente direccion={direccion} setDireccion={setDireccion} altura={altura} setAltura={setAltura} handleOrderConfirmation={handleOrderConfirmation} showMercadoPagoModal={showMercadoPagoModal} changeMPModalVisibility={changeMPModalVisibility} handleOrderPost={handleOrderPost} cartImport={cartImport} showMPError={() => showActionAlert("MPError")}/>
                    <h3>Importe: ${cartImport}
                    <br/>
                    USD ${(cartImport/dolarValue).toFixed(2)}
                    </h3>
                    <TablaCarritoDeCompras cart={cart} quantity={quantity} cartImport={cartImport} modifyCart={modifyCart} setQuantity={setQuantity} setCartImport={setCartImport} showSuccessAlert={() => showActionAlert("itemdeleted")} showAddedItem={() => showActionAlert("add")}/>
                    <Alertas showAlert={showAlert} errorAlert={errorAlert} emptyCartAlert={emptyCartAlert} succeedAlert={succeedAlert} errorMessages={errorMessages} succeedMessage={succeedMessage} addSuccess={addSuccess} showMercadoPagoError={showMercadoPagoError}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}