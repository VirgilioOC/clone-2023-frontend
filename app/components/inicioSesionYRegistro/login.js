import React, { useState } from 'react'
import { Button, Modal, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

export default function LogInModal(props) {
    const { setIsLoggedIn, setRegisterModal, showLogInModal, setShowLogInModal, handleShowLogInModal } = props

    const [successMsg, setSuccessMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const [registerErrorAlert, setRegisterErrorAlert] = useState(false);
    const [registerErrorMessages, setRegisterErrorMessages] = useState([]);

    const handleCloseModal = () => {
        setShowLogInModal(false);
    };

    const handleShowRegisterModal = () => {
        handleCloseModal();
        setRegisterModal(true);
    };

    const [formData, setFormData] = useState({
        DNI: '',
        password: ''
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogIn = async () => {
        try {
            const response = await axios.post(
                process.env.API_URL + `clientes/login`,
              formData
            );
            setSuccessMsg(response.data.message);
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("nombre", response.data.data.client.nombre)
            handleAlert("success");
            handleCloseModal();
            setIsLoggedIn(true);
          } catch (error) {
            if(error.response.status == 401) {
                setRegisterErrorMessages([error.response.data.message]);
            }
            else {
                setRegisterErrorMessages(error.response.data.message.errors);
            }

            handleAlert("danger");
          }
    };

    const handleAlert = (tipo) => {
        setAlertType(tipo);
        
        if(tipo === "success"){
            setSuccessAlert(true);
        }
        else{
          setRegisterErrorAlert(true);
        } 
        setTimeout(() => {
          if(tipo === "success"){
            setSuccessAlert(false);
          }
          else {
            setRegisterErrorAlert(false);
          }
        }, 2000);
    };

    return (
        <>
            <div className="navbar-item">
                <Button size="lg" variant="light" onClick={handleShowLogInModal}>
                    Iniciar Sesión
                </Button>
            </div>
            <Modal show={showLogInModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicDNI">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control 
                            type="number"
                            name="DNI"
                            placeholder="Ingrese su DNI"
                            value={formData.DNI}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                            type="password" 
                            name="password"
                            placeholder="Ingrese su contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Alert variant={alertType} show={successAlert}>
                    {successMsg}
                </Alert>
                {registerErrorMessages.map(err =>(
                <Alert variant={alertType} show={registerErrorAlert} key={registerErrorMessages.indexOf(err)}>
                    {err}
                </Alert>
                ))}
                <Modal.Footer>
                    <div className="navbar-item">
                        <Button variant="link" onClick={handleShowRegisterModal}>
                            Crear una cuenta
                        </Button>
                    </div>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleLogIn}> 
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}