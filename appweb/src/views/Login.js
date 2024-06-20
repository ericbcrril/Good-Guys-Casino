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
                        <a href='https://facebook.com/'><i class='bx bxl-facebook-circle bx-burst-hover'></i></a>
                        <a href='https://google.com/'><i class='bx bxl-google bx-burst-hover'></i></a>
                        <a href='https://instagram.com/'><i class='bx bxl-instagram bx-burst-hover'></i></a>
                        <a href='https://x.com/'><i class='bx bxl-twitter bx-burst-hover'></i></a>
                    </div>
                    <div>
                        <h4>Iniciar sesion con</h4>
                    </div>
                </div>
                <div className='item3'>
                    <button>Iniciar sesion</button>
                    <div>
                    <a href='#'><i class='bx bxs-user-plus'></i></a>
                    <h4>crear nueva cuenta</h4>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Login;