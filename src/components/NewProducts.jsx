import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../utils/constants'

const NewProducts = ({ productoSeleccionado,setProductoSeleccionado, actualizar }) => {
    const [codigo, setCodigo] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [descripcion, setDescripcion] = useState(null)
    const [precio, setPrecio] = useState(null)
    const [cantidadMinima, setCantidadMinima] = useState(null)
    const [cantidadMaxima, setCantidadMaxima] = useState(null)
    const [cantidadActual, setCantidadActual] = useState()


    useEffect(() => {
        if (productoSeleccionado) {
            setCodigo(productoSeleccionado.codigoDeBarras)
            setNombre(productoSeleccionado.nombre)
            setDescripcion(productoSeleccionado.descripcion)
            setPrecio(productoSeleccionado.precio)
            setCantidadMaxima(productoSeleccionado.cantidadMaxima)
            setCantidadMinima(productoSeleccionado.cantidadMinima)
            setCantidadActual(productoSeleccionado.cantidadActual)
        }
    }, [productoSeleccionado])


    const agregar = async () => {
        try {
            const datosRaw = await fetch(`${API_URL}/producto`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    codigoDeBarras: codigo,
                    nombre,
                    descripcion,
                    precio,
                    cantidadMinima,
                    cantidadMaxima,
                    cantidadActual
                })
            })

            const datos = await datosRaw.json();

            actualizar()
            setCodigo('')
            setNombre('')
            setDescripcion('')
            setPrecio('')
            setCantidadMaxima('')
            setCantidadMinima('')
            setCantidadActual('')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se guardo el producto correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }

    }
    const editar = async () => {
        try {
            const datosRaw = await fetch(`${API_URL}/producto`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    codigoDeBarras: codigo,
                    nombre,
                    descripcion,
                    precio,
                    cantidadMinima,
                    cantidadMaxima,
                    cantidadActual
                })
            })

            const datos = await datosRaw.json();

            actualizar()
            setCodigo('')
            setNombre('')
            setDescripcion('')
            setPrecio('')
            setCantidadMaxima('')
            setCantidadMinima('')
            setCantidadActual('')

        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(productoSeleccionado){
            editar()
        }else{
            agregar()

        }
        setProductoSeleccionado(null)
    }




    // sirve para agregar productos nUEVOS
    return (
        <form className='col-12 col-md-9 col-lg-7 d-flex flex-column justify-content-center align-items-center'
            onSubmit={handleSubmit}>
            <div className="input-group col-10">
                <span className='input-group-text'>
                    <i className="bi bi-upc"></i>
                </span>
                <input value={codigo}
                    required
                    onChange={(e) => setCodigo(e.target.value)}
                    type="number" placeholder='Codigo de barras' className='form-control' />
            </div>
            <div className="input-group col-10 mt-2">
                <span className='input-group-text'>
                    <i className="bi bi-basket"></i>
                </span>
                <input value={nombre}
                    required
                    onChange={(e) => setNombre(e.target.value)}
                    type="text" placeholder='Nombre' className='form-control' />
            </div>
            <div className="input-group col-10 mt-2">
                <span className='input-group-text'>
                    <i className="bi bi-list-task"></i>
                </span>
                <input
                    value={descripcion}
                    required
                    onChange={(e) => setDescripcion(e.target.value)}
                    type="text" placeholder='descripcion' maxLength={200} className='form-control' />
            </div>
            <div className="input-group col-10 mt-2">
                <span className='input-group-text'>
                    <i className="bi bi-currency-dollar"></i>
                </span>

                <input value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    type="number" placeholder='Precio' maxLength={200} className='form-control' />
            </div>
            <div className="input-group col-10 mt-2">
                <span className='input-group-text'>
                    <i class="bi bi-plus-slash-minus"></i>
                </span>
                <input
                    value={cantidadMinima}
                    required
                    onChange={(e) => setCantidadMinima(e.target.value)}
                    type="number" placeholder='Producto Minimo' maxLength={200} className='form-control' />
            </div>
            <div className="input-group col-10 mt-2">
                <span className='input-group-text'>
                    <i class="bi bi-plus-slash-minus "></i>
                </span>
                <input
                    value={cantidadMaxima}
                    required
                    onChange={(e) => setCantidadMaxima(e.target.value)}
                    type="number" placeholder='ProductoMaximo' maxLength={200} className='form-control' />

            </div>
            <div className="input-group col-10 mt-2">
                <span className='input-group-text'>
                    <i class="bi bi-plus-slash-minus "></i>
                </span>
                <input type="number"
                    required
                    onChange={e => setCantidadActual(e.target.value)} value={cantidadActual}
                    placeholder='ProductoActual' maxLength={200} className='form-control' />
            </div>
            <button className='btn btn-primary col-12 mt-2' >Agregar</button>
        </form>
    )
}

export default NewProducts
