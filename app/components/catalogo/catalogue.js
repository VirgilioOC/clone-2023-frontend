import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Table, Badge, Alert } from 'react-bootstrap'
import DetalleItem from './itemdetail'
import CatalogueDropdown from './cataloguefilter'
import CataloguePagination from './cataloguepaginator'

export default function Catalogo(props){
    const {carrito, modificarCarro, cantidad, setCantidad, importeCarrito, setImporteCarrito, dolarValue} = props;
    
    const [data, setData] = useState([]);
    const [typesData, setTypesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentType, setCurrentType] = useState(0);
    const [itemRetrieveError, setItemRetrieveErrorAlert] = useState(false);
    const autoScroll = useRef(null);

    useEffect(() => {
        fetchData(currentPage);
        fetchTypes();
    }, []);
    
    const fetchData = (page) => {
        axios
        .get(process.env.API_URL + `items?page=${page}`)
        .then(response => {
            setData(response.data.data);
            setTotalPages(response.data.last_page);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const fetchTypes= () => {
    axios
        .get(process.env.API_URL + `tipos`)
        .then(response => {
            setTypesData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const fetchDataPerType = (id, page) => {
        axios
        .get(process.env.API_URL + `tipos/${id}?page=${page}`)
        .then(response => {
            setData(response.data.data);
            setTotalPages(response.data.last_page);
        })
        .catch(() => {
            showItemsByTypeRetrieveError();
        });
    };

    const showItemsByTypeRetrieveError = () => {
        setItemRetrieveErrorAlert(true);
        setTimeout(() => {
            setItemRetrieveErrorAlert(false);
        }, 2000);
    };

    return(
        <>
            <h1>
                <Badge bg="danger">
                    Catálogo
                </Badge>
            </h1>
            <CatalogueDropdown typesData={typesData} fetchData={fetchData} fetchDataPerType={fetchDataPerType} setCurrentType={setCurrentType} setCurrentPage={setCurrentPage}/>
            <div className="table" ref={autoScroll}>
                <Table borderless responsive>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.path_imagen} onError={(e) => {e.target.src = 'https://res.cloudinary.com/digitaldynamos/image/upload/v1687557556/items/No_Imagen3ozfp.jpg';}} className="catalogueImages" alt=""/>
                            </td>
                            <td>{item.nombre}</td>
                            <td>{item.etiqueta}</td>
                            <td>
                                <DetalleItem itemID={item.id} nombreItem={item.nombre} cart={carrito} modifyCart={modificarCarro} quantity={cantidad} setQuantity={setCantidad} cartImport={importeCarrito} setCartImport={setImporteCarrito} dolarValue={dolarValue}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Alert variant="danger" show={itemRetrieveError}>
                    Error al tratar de recuperar items por tipo especificado.
                </Alert>
            </div>
            <div className="paginatorContainer">
                <CataloguePagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} fetchData={fetchData} fetchDataPerType={fetchDataPerType} currentType={currentType} autoScroll={autoScroll}/>
            </div>
        </>
    );
}