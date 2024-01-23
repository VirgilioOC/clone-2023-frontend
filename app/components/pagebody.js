"use client"
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import CarouselComponent from './carousel'
import SobreNosotros from './relevantinformation'
import Catalogo from './catalogo/catalogue'
import Pedidos from './pedidos/myorders'

export default function PageBody(props) {
  const {cart, modifyCart, quantity, setQuantity, cartImport, setCartImport, dolarValue, isLoggedIn, clientOrders } = props

  return (
    <>
      <CarouselComponent/>
      <div className="bgcomponent">
        <Catalogo carrito={cart} modificarCarro={modifyCart} cantidad={quantity} setCantidad={setQuantity} importeCarrito={cartImport} setImporteCarrito={setCartImport} dolarValue={dolarValue}/>
        <Pedidos isLoggedIn={isLoggedIn} clientOrders={clientOrders}/>
        <SobreNosotros/>
      </div>
    </>
  )
}