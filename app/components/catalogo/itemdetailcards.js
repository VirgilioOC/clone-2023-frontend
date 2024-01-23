import React from "react"
import { Button, Card, CardGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function CardsDetalleItem(props) {
    const { data, handleAddToCart, dolarValue } = props;

    return(
        <CardGroup>
            {data.map(item => (
                <Card key={item.id}>
                    <Card.Body>
                    <Card.Title>Tamaño {item.tamaño}</Card.Title>
                    <Card.Text>
                        El precio es ${item.coste}
                        <br/><br/>
                         USD ${(item.coste/dolarValue).toFixed(2)}
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={() => handleAddToCart(item.id, item.nombre, item.tamaño, item.coste, 1)}>
                                <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Card.Footer>
                </Card>
            ))}
        </CardGroup>
    );
}