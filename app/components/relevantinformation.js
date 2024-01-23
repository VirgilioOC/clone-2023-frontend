import React from 'react'
import { Accordion, Badge } from 'react-bootstrap'

export default function SobreNosotros() {
    return (
        <div className="information">
            <h1>
                <Badge bg="danger">
                    Información Relevante
                </Badge>
            </h1>
            <Accordion className="accordion" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="custom-header">Quiénes somos?</Accordion.Header>
                    <Accordion.Body>
                        Somos una empresa destinada a la venta de artículos online. Iniciada como 
                        proyecto para la materia Ingeniería de Aplicaciones Web del Departamento de 
                        Ciencias e Ingeniería de la Computación, en la Universidad Nacional del Sur
                        ubicada en la Ciudad de Bahía Blanca.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Para qué estamos?</Accordion.Header>
                    <Accordion.Body>
                        Estamos para disponer a tu alcance la lo que necesites para cualquier tipo
                        de reunión social, desde una juntada con amigos hasta una reunión más formal.
                        Ofrecemos una gran variedad de productos, desde cosas simples como snacks hasta 
                        cosas más sofisticadas como pastas, postres, entre otros.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Por qué no puedo ver nada en la sección de pedidos?</Accordion.Header>
                    <Accordion.Body>
                        Para ver la sección de pedidos se requiere un log in previo, ya que
                        sin dicho log in no es posible recueperara sus pedidos. En caso de no
                        estar logueado, se mostrará un mensaje requiriendo que se loguee para 
                        poder visualizar dicha sección. Si no posee una cuenta, deberá crearla
                        y la sección de pedidos se encontrará vacía una vez creada la misma.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Qué métodos de pago son aceptados?</Accordion.Header>
                    <Accordion.Body>
                        Sólo aceptamos los metodos de pago que brinda Mercado Pago para tarjetas de crédito y débito. Se ofrecen una amplia variedad de trarjetas como
                        pueden ser Mastercard, Visa, American Express, entre otras.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
          </div>
    );
}