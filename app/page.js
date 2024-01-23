"use client"
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import PageBody from './components/pagebody'
import PageNavbar from './components/navbar'
import axios from 'axios'


export default function Home() {
  const [cart, modifyCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [cartImport, setCartImport] = useState(0);
  const [dolarValue, setDolarValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientOrders, setClientOrders] = useState([]);

  const fetchData = () => {
    axios
    .get(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
    .then(response => {      
        setDolarValue(parseInt(response.data[1].casa.venta));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  };

  const fetchClientOrders = () => {
    axios
      .get(
          process.env.API_URL + `clientes/pedidos`,
          {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            },
          }
        )
      .then(response => {
        setClientOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData()
    setIsLoggedIn(localStorage.getItem("token") != null)
  }, []);

  useEffect(() => {
    if(isLoggedIn){
      fetchClientOrders()
    }
  }, [isLoggedIn]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <PageNavbar cart={cart} quantity={quantity} cartImport={cartImport} setQuantity={setQuantity} setCartImport={setCartImport} modifyCart={modifyCart} dolarValue={dolarValue} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} fetchClientOrders={fetchClientOrders}/>
        <PageBody cart={cart} modifyCart={modifyCart} quantity={quantity} setQuantity={setQuantity} cartImport={cartImport} setCartImport={setCartImport} dolarValue={dolarValue} isLoggedIn={isLoggedIn} clientOrders={clientOrders}/>
      </div>
    </main>
  )
}