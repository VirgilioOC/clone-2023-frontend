import React, { useState } from 'react'
import { Button, Form, Modal, Alert, Badge } from 'react-bootstrap'
import axios from 'axios'

export default function Registrarse(props) {
  const { setIsLoggedIn, showRegisterModal, setRegisterModal } = props;
  const [alertMsg, setAlertMsg] = useState('');
  const [alert, setAlert] = useState(false);
  const [registerErrorAlert, setRegisterErrorAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [registerErrorMessages, setRegisterErrorMessages] = useState([]);

  const handleCloseModal = () =>{
    setTimeout(() => {
      setRegisterModal(false);
    }, 2000);
  };

  const [formData, setFormData] = useState({
    DNI: '',
    nombre: '',
    apellido: '',
    password: '',
    passwordConfirmation: '',
    telefono: ''
  });

  const passwordMatchConfirmation = () => {
    return (formData.passwordConfirmation === '' || (formData.password.substring(0,formData.passwordConfirmation.length ) === formData.passwordConfirmation.substring(0,formData.passwordConfirmation.length )    ))  
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAlert = (tipo) => {
    setAlertType(tipo);
    
    if(tipo === "success"){
      setAlert(true);
    }
    else{
      setRegisterErrorAlert(true);
    } 
    setTimeout(() => {
      if(tipo === "success"){
        setAlert(false);
      }
      else {
        setRegisterErrorAlert(false);
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        process.env.API_URL + `clientes/register`,
        formData
      );
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("nombre", response.data.data.client.nombre)
      setAlertMsg(response.data.message);
      handleAlert("success");
      handleCloseModal();
      setFormData({
        DNI: '',
        nombre: '',
        apellido: '',
        password: '',
        passwordConfirmation: '',
        telefono: ''
      });
      setIsLoggedIn(true);
    } catch (error) {
      setRegisterErrorMessages(error.response.data.message.errors);
      handleAlert("danger");
    }
  };

  return (
    <>
      <Modal show={showRegisterModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="DNI">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="number"
                name="DNI"
                placeholder="Ingrese su DNI"
                value={formData.DNI}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese su nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Ingrese su apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirmation">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                placeholder="Ingrese su contraseña"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
              />
              { !passwordMatchConfirmation() && <Badge bg="danger">La contraseña no coincide</Badge> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="number"
                name="telefono"
                placeholder="Ingrese su teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Alert variant={alertType} show={alert} >
          {alertMsg}
        </Alert>
        {registerErrorMessages.map(err =>(
          <Alert variant={alertType} show={registerErrorAlert} key={registerErrorMessages.indexOf(err)}>
            {err}
          </Alert>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={()=> handleSubmit()}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}