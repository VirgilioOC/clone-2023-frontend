import React from "react"
import { Table, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default function TablaCarritoDeCompras(props) {
    const { cart, quantity, cartImport, modifyCart, setQuantity, setCartImport, showSuccessAlert, showAddedItem } = props;

    const handleQuantityOfSpecificItemNotZero = (id, cantidad) => {
        const updatedCart = cart.map(item => ({ ...item }));
        const itemToUpdate = updatedCart.find(item => item.id === id);

        itemToUpdate.cantidad = itemToUpdate.cantidad + cantidad
        modifyCart(updatedCart)
        setQuantity(quantity + cantidad)
        setCartImport(cartImport + parseInt(itemToUpdate.costo))
        showAddedItem()
    }

    const handleSubstractFromCart = (id, costo, cantidad) => {
        const updatedCart = cart.map(item => ({ ...item }));
        const itemToUpdate = updatedCart.find(item => item.id === id);
        
        itemToUpdate.cantidad = itemToUpdate.cantidad - cantidad

        if(itemToUpdate.cantidad === 0 ){
            const updatedCartWithoutItem = updatedCart.filter(item => item !== itemToUpdate);
            modifyCart(updatedCartWithoutItem);
            setQuantity(quantity - cantidad);
        }
        else{
            modifyCart(updatedCart)
            setQuantity(quantity - cantidad)
        }
        
        setCartImport(cartImport - parseInt(costo))
        showSuccessAlert();
    };

    return(
        <Table striped borderless hover>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Tamaño</th>
                <th>Cantidad</th>
                <th>Eliminar</th>
            </tr>
            </thead>
            <tbody>
            {cart.map(item => (
                <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.tamaño}</td>
                    <td>{item.cantidad}</td>
                    <td className="button-container">
                        <Button variant="primary" onClick={() => handleQuantityOfSpecificItemNotZero(item.id, 1)}>
                                <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Button variant="danger" onClick={() => handleSubstractFromCart(item.id, item.costo, 1)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                    </td>

                </tr>
            ))}
            </tbody>
        </Table>
    );
}