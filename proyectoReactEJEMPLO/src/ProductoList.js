import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function ProductoList() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categorias/')
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1>Lista de Categorías</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Categoría</th>
                        <th>Descripción</th>
                        <th>Fecha de Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria, index) => (
                        <tr key={index}>
                            <td>{categoria.id_categoria}</td>
                            <td>{categoria.nombre_categoria}</td>
                            <td>{categoria.descripcion}</td>
                            <td>{categoria.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductoList;