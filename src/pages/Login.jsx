import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { API_URL } from '../utils/constants';

const Login = ({ setUsuario }) => {

    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');


    const iniciarSesion = async () => {
        if (nombre != '' && password != '') {
            try {
                const datosUsuarioRaw = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        correo: nombre,
                        pass: password
                    })
                })
                const datosUsuario = await datosUsuarioRaw.json();
                console.log(datosUsuario.length)
                if (datosUsuario.length > 0) {
                    setUsuario(datosUsuario[0]);
                } else {
                    Swal.fire('Error', 'Usuario y contraseña invalidos', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'No se puede realizar esta operacion por el momento', 'error');

            }
        } else {
            Swal.fire('Error', 'Usuario y contraseña deben tener datos validos', 'error');
        }
    }




    const crearUsuario = async (e) => {
        e.preventDefault()
        if (nombre !== '' && password !== '') {
            try {
                const datos = await fetch(`${API_URL}/usuarios`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: nombre,
                        password: password
                    })
                });
                const respuesta = await datos.json();
                Swal.fire('Usuario Agregado', 'Por favor presiona en iniciar sesion para comenzar', 'success')
            } catch (error) {
                Swal.fire('Error', error.message || 'No se pudo agregar el usuario, intentalo de nuevo', 'error');
            }
        } else {
            Swal.fire('Error', 'Usuario y contraseña deben tener datos validos', 'error');
        }
    }





    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ 'minHeight': '88VH' }}>

            <div className='col-12 col-md-10 col-lg-5 d-flex flex-column justify-content-center align-items-center shadow-lg p-3'>
                <h2 className='mb-3'>Inicio de sesión</h2>
                <label className='form-label'>correo</label>
                <input type="email" placeholder='Usuario' className='form-control text-center'
                    onChange={(e) => setNombre(e.target.value)}
                />
                <label className='form-label'>Contraseña</label>
                <input type="password" placeholder='contraseña' className='form-control text-center'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='btn btn-primary col-12 mt-3'
                    onClick={() => {
                        iniciarSesion();
                    }}>Ingresar</button>
                <small>o</small>
                <button className='btn btn-secondary col-12'
                    onClick={(e) => crearUsuario(e)}>Registrarse</button>
            </div>
        </div>
    )
}

export default Login