import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export default function CatalogueDropdown(props) {
    const { typesData, fetchData, fetchDataPerType, setCurrentType, setCurrentPage } = props;

    const handleAllSelected = () => {
        fetchData(1); 
        setCurrentType(0); 
        setCurrentPage(1);
    };

    const handleSpecificTypeSelected = (typeID) => {
        fetchDataPerType(typeID, 1); 
        setCurrentType(typeID);
        setCurrentPage(1);
    };
    
    return(
        <div className='dropdownContainer'>
            <DropdownButton variant="danger" className="dropdown-basic-button" id="dropdown-basic-button" title="Filtrar">
                <Dropdown.Item onClick={() => handleAllSelected()}>Todos</Dropdown.Item>
                {typesData.map((type) => (
                    <Dropdown.Item
                        key={type.id}
                        onClick={() => handleSpecificTypeSelected(type.id)}
                        >
                        {type.etiqueta}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
}