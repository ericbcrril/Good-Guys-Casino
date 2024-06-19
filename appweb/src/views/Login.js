import React from 'react';
import MainNabvar from "../components/navbars/MainNavbar";
import 'boxicons';

function Login() {
    return (
        <main className='main'>
            <MainNabvar />
            <section className='main-box'>
                <div className='header'>
                    <h1>Login</h1>
                    <img src='/images/logos/logoGG.png' width={100}></img>
                </div>
                <div className='item1'>
                    <h3>email</h3>
                    <input type='email' required placeholder='introduzca su correo electronico'></input>
                    <h3>contraseña</h3>
                    <input type='password' required placeholder='introduzca contraseña'></input>
                </div>
                <div className='item2'>
                    <div>
                        <a href='https://facebook.com/'><box-icon type='logo' name='facebook-circle' color='white'></box-icon></a>
                        <a href='https://google.com/'><box-icon type='logo' name='google' color='white'></box-icon></a>
                        <a href='https://instagram.com/'><box-icon type='logo' name='instagram' color='white'></box-icon></a>
                        <a href='https://x.com/'><box-icon type='logo' name='twitter' color='white'></box-icon></a>
                    </div>
                    <div>
                        <h4>Iniciar sesion con</h4>
                    </div>
                </div>
                <div className='item3'>
                    <button>Iniciar sesion</button>
                    <div>
                    <a href='#'><box-icon type='solid' name='user-plus' color='white'></box-icon></a>
                    <h4>crear nueva cuenta</h4>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Login;