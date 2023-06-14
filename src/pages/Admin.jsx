import React, { useEffect, useState } from 'react'
import NewProducts from '../components/NewProducts'
import ShowProducts from '../components/ShowProducts'
import { API_URL } from '../utils/constants';
import Swal from 'sweetalert2';

const Admin = () => {
  const [productos,setProductos] = useState([]);
  const [productoSeleccionado,setProductoSeleccionado] = useState();

  const actualizar = async()=>{
    try {
      const datosRaw = await fetch(`${API_URL}/producto`);
      const datos = await datosRaw.json();
      setProductos(datos);
    } catch (error) {
      Swal.fire('Ocurrio un error al obtener los datos', error.message, 'success');      
    }
    console.log(productos)
  }
  

  useEffect(() => {
    actualizar()
  }, [])
  



  
  return (
    <div className='container-fluid'>
      <h1 className='col-12 text-center'>
        Agregar productos
      </h1>
      <div className="row d-flex flex-column justify-content-center align-items-center col-12 mt-5  ">

        <NewProducts actualizar={actualizar} productoSeleccionado = {productoSeleccionado} setProductoSeleccionado={setProductoSeleccionado} />
        <button className="btn btn-secondary mt-5" onClick={actualizar}>Actualizar</button>
        <ShowProducts products = {productos} actualizar={actualizar} productoSeleccionado = {setProductoSeleccionado}/>
      </div>
    </div>
  )
}

export default Admin