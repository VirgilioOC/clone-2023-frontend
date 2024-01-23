import React, { useState } from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import LogInModal from './inicioSesionYRegistro/login'
import Registrarse from './inicioSesionYRegistro/registermodal'
import LogOutButton from './inicioSesionYRegistro/logout'
import CarritoDeCompras from './carrodecompras/shoppingcart'

export default function PageNavbar(props) {
  const { cart, quantity, cartImport, setQuantity, setCartImport, modifyCart, dolarValue, isLoggedIn, setIsLoggedIn, fetchClientOrders } = props;
  const [showRegisterModal, setRegisterModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  const handleShowLogInModal = () => {
    setShowLogInModal(true);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <img src="https://cdn.worldvectorlogo.com/logos/pedidosya.svg" width="200" height="40" alt="Logo" />
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto" fill>
            {isLoggedIn ? (
              <Nav.Item>
                <h2>
                  <Badge bg="light" text="dark">
                    Saludos {localStorage.getItem("nombre")}!
                  </Badge>
                </h2>
              </Nav.Item>
            ) : 
            (
              null
            )}
            <Nav.Item>
              <CarritoDeCompras cart={cart} quantity={quantity} cartImport={cartImport} setQuantity={setQuantity} setCartImport={setCartImport} modifyCart={modifyCart} dolarValue={dolarValue} handleShowLogInModal={handleShowLogInModal} fetchClientOrders={fetchClientOrders}/>
            </Nav.Item>
            {isLoggedIn ? (
                <Nav.Item>
                  <LogOutButton setIsLoggedIn={setIsLoggedIn}/>
                </Nav.Item>
              ) : 
              (
                <>
                  <Nav.Item>
                    <LogInModal setIsLoggedIn={setIsLoggedIn} setRegisterModal={setRegisterModal} showLogInModal={showLogInModal} setShowLogInModal={setShowLogInModal} handleShowLogInModal={handleShowLogInModal}/>
                  </Nav.Item>
                  <Nav.Item>
                    <Registrarse setIsLoggedIn={setIsLoggedIn} showRegisterModal={showRegisterModal} setRegisterModal={setRegisterModal}/>
                  </Nav.Item>
                </>
              )
            }
            <Nav.Item>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}