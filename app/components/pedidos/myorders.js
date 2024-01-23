import React, { useState, useRef } from 'react';
import { Table, Button, Badge, Col, Container, Image, Row } from 'react-bootstrap';

export default function Pedidos(props) {
  const { isLoggedIn, clientOrders } = props;
  const [selectedMappingDetails, setSelectedMappingDetails] = useState([]);
  const autoScroll = useRef(null);

  const handleRowClick = (detalle_items) => {
    setSelectedMappingDetails(detalle_items);
    autoScroll.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleBackClick = () => {
    setSelectedMappingDetails([]);
  };

  return (
    <>
      <div className="table">
        <h1>
          <Badge bg="danger">
              Mis Pedidos
          </Badge>
        </h1>
        {isLoggedIn ? (
          <>
            {clientOrders.length > 0 ? (
              <>
                <Table striped borderless hover responsive>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Importe</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientOrders.map((pedido, index) => (
                      <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>${pedido.importe}</td>
                        <td>{pedido.estado}</td>
                        <td>
                            <Button variant="success" onClick={() => handleRowClick(pedido.detalle_items)}>
                                Ver Detalle
                            </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div ref={autoScroll}>
                  {selectedMappingDetails.length > 0 && (
                    <Table striped borderless hover responsive className="detailTable">
                      <thead>
                        <tr>
                          <th>
                            <Button variant="danger" onClick={() => handleBackClick()}>
                                Atras
                            </Button>
                          </th>
                          <th>Id</th>
                          <th>Nombre</th>
                          <th>Tamaño</th>
                          <th>Precio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedMappingDetails.map(detalle => (
                          <tr key={selectedMappingDetails.indexOf(detalle)}>
                            <td></td>
                            <td>{detalle.id}</td>
                            <td>{detalle.item.nombre}</td>
                            <td>{detalle.tamaño}</td>
                            <td>{detalle.item.precio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>
              </>
            ) : 
            ( 
            <div>
            <Container fluid>
              <Row className="justify-content-md-center">
                <Col  xs={12} sm={4} md={4}>
                  <Image src="https://media.discordapp.net/attachments/756140354008514571/1123714447207309444/peticionesInmediatas.png" fluid />
                </Col>
              </Row>
            </Container>
          </div>
            )}
          </>
          ) : 
          (
            <div>
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col  xs={12} sm={4} md={4}>
                    <Image src="https://cdn.discordapp.com/attachments/756140354008514571/1123700818823098378/KONGAMOVIL.png" fluid />
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }
      </div>
    </>
  );
}