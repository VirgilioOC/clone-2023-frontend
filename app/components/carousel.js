import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
//import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function CarouselComponent(){ 
  return (
    <Carousel>
      <Carousel.Item interval={4000}>
        <img
          className="carouselImages"
          src="https://i0.wp.com/tinformas.com/wp-content/uploads/2022/12/PedidosYa-Alimentemonos-de-Futbol-2.jpg?resize=696%2C439&ssl=1"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Tenemos lo que necesitas para tus reuniones</h3>
          <p>Mira el amplio catálogo de artículos que ofrecemos y arma tu carrito</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="carouselImages"
          src="https://infonegocios.info/content/images/2022/07/21/155879/800x453-pedidosya-envios-courier.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Accede a tus pedidos</h3>
          <p>Ve el historial de pedidos que realizaste</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="carouselImages"
          src="https://i0.wp.com/itusers.today/wp-content/uploads/2021/04/pedidosya-continua-su-plan-de-expansion.jpg?w=1200&ssl=1"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Conocenos y consulte dudas frecuentes</h3>
          <p>Accede a la información sobre nosotros y respuestas a dudas generales</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}