import React from 'react';
import MainNabvar from "../components/navbars/MainNavbar";
import 'boxicons';

function Login() {
    return (
        <main className='main'>
            <MainNabvar />
            <section className='main-box'>
                <div>
                    <h1>Login</h1>
                    <img src='/images/logos/logoGG.png' width={50}></img>
                </div>
                <div className='item1'>
                    <h3>email</h3>
                    <input type='email' required placeholder='introduzca su correo electronico'></input>
                    <h3>contraseña</h3>
                    <input type='password' required placeholder='introduzca contraseña'></input>
                </div>
                <div className='item2'>
                    <div>
                        <a href='#'><box-icon type='logo' name='facebook-circle'></box-icon></a>
                        <a href='#'><box-icon type='logo' name='google'></box-icon></a>
                    </div>
                    <div>
                        <h4>Iniciar sesion con</h4>
                    </div>
                </div>
                <div className='item3'>
                    <button>Iniciar sesion</button>
                    <a href='#'><box-icon type='solid' name='user-plus'></box-icon></a>
                </div>
            </section>
        </main>
    );
}

export default Login;