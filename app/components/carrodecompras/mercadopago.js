import React from 'react';
import { Modal } from "react-bootstrap"
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import axios from 'axios';

initMercadoPago('TEST-18b0a61c-21b5-421e-9331-287468a68ea5');

export default function MercadoPago(props) {
    const { showMercadoPagoModal, changeMPModalVisibility, handleOrderPost, cartImport, showMPError } = props
    
    const initialization = {
        amount: cartImport,
    };
      
    const onSubmit = async (formData) => {
      try {
        const response = 
          await axios.post(
                          process.env.API_URL + `process-payment`, 
                          formData, 
                          {
                            headers: {
                                'Authorization': 'Bearer '+ localStorage.getItem("token")
                            },
                          }
          );
          
          changeMPModalVisibility();
          if(response.data.status == "approved"){
            handleOrderPost();
          }else{
            showMPError();
          }
      } catch(error) {
        changeMPModalVisibility();
        showMPError();
      }
    };
    
    const onError = async (error) => {
      // Callback llamado para todos los casos de error de Brick
      console.log(error);
    };
    
    const onReady = async () => {
      /*
        Callback llamado cuando Brick está listo.
        Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
      */
    };


    /*
      ATENCION:
      Cada vez que el usuario sale de la pantalla donde se muestra algún Brick, 
      es necesario destruir la instancia actual con el comando window.cardPaymentBrickController.unmount().
        Al ingresar nuevamente se debe generar una nueva instancia.

        Este mensaje estaba en la pag de MP, no funciona poner el comando en el onHide pq el comando no funca
    
    
    */ 
    return (
        <>
            <Modal show={showMercadoPagoModal} onHide={changeMPModalVisibility} >
                <Modal.Header closeButton>
                <Modal.Title>Pagar carrito</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <CardPayment
                        initialization={initialization}
                        onSubmit={onSubmit}
                        onReady={onReady}
                        onError={onError}
                    />
                </Modal.Body>
                
                <Modal.Footer>
                
                </Modal.Footer>
            </Modal>
           
        </>
    );
}