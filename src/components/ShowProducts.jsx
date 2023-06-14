import React from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../utils/constants'

const ShowProducts = ({ products, productoSeleccionado, actualizar }) => {



    const eliminar = (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const eliminarDato = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                })
                const response = eliminarDato.json();
                if (response.affectedRows == 1){
                    actualizar();
                    Swal.fire(
                        'Eliminado!',
                        "Se elimino",
                        'success'
                        )
                     
                    }
            }
        })
    }


    return (
        <div className='row'>
            <div className="col-12 mt-2">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>codigo de barras</th>
                            <th>nombre</th>
                            <th>descripcion</th>
                            <th>precio</th>
                            <th>Cantidad Minima</th>
                            <th>Cantidad Maxima</th>
                            <th>Cantidad en stock</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(
                            (producto, index) => {
                                return (<tr key={index}>
                                    <td>{producto.codigoDeBarras}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.cantidadMinima}</td>
                                    <td>{producto.cantidadMaxima}</td>
                                    <td>{producto.cantidadActual}</td>
                                    <td><button className='btn btn-warning' onClick={() => productoSeleccionado(producto)}>Editar</button></td>
                                    <td><button className='btn btn-danger' onClick={() => eliminar(producto.codigoDeBarras)}>Eliminar</button></td>
                                </tr>)
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowProducts