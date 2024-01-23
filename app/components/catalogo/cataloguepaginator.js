import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function CataloguePagination(props) {
    const { currentPage, totalPages, setCurrentPage, fetchData, fetchDataPerType, currentType, autoScroll } = props;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);

        if(currentType === 0){
            fetchData(pageNumber)
        }
        else{
            fetchDataPerType(currentType, pageNumber)
        }

        autoScroll.current?.scrollIntoView({behavior: 'smooth'});
    };

    return(
        <Pagination>
            <Pagination.First onClick={() => handleClick(1)} />
            <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled = {(currentPage === 1) } /> 

            {pages.map((pageNumber) => (
                <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handleClick(pageNumber)}
                >
                {pageNumber}
                </Pagination.Item>
            ))}

            <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled = {(currentPage === totalPages)} />
            <Pagination.Last onClick={() => handleClick(totalPages)} />
        </Pagination>
    );
}