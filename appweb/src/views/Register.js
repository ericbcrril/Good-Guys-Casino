import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { accountCollection } from '../model/collections';
import MainNabvar from "../components/navbars/MainNavbar";
import 'boxicons';

const  Register = () => {
    const [account, setAccount] = useState({...accountCollection});
    const handleChangeAccount = (e) => {
        const { name, value } = e.target;
        setAccount(prevState => ({ ...prevState, [name]: value }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/api/accounts/register', { ...account });
          alert('cuenta agregada exitosamente');
          setAccount({ ...account });
        } catch (error) {
          alert('Error al agregar usuario');
        }
      };
    return (
        <main className='main-register'>
            <MainNabvar />
            <section className='box-form'>
                <div className='header-register'>
                    <h1>Registrate!</h1>
                    <img src='/images/logos/logoGG.png' width={100}></img>
                </div>
                <div className='inputs-item'>
                    <h3>nombre</h3>
                    <input type='text' required name='name' value={account.name} onChange={handleChangeAccount}
                    placeholder='introduzca su nombre'></input>
                    <h3>apellido</h3>
                    <input type='text' required name='lastName' value={account.lastName} onChange={handleChangeAccount}
                    placeholder='introduzca su apellido'></input>
                    <h3>email</h3>
                    <input type='email' required name='email' value={account.email} onChange={handleChangeAccount}
                    placeholder='introduzca su correo electronico'></input>
                    <h3>nombre de usuario</h3>
                    <input type='text' required name='user' value={account.user} onChange={handleChangeAccount}
                    placeholder='introduzca su nombre de usuario'></input>
                    <h3>crear contraseña</h3>
                    <input type='password' required name='password'
                     placeholder='introduzca contraseña'></input>
                    <h3>confirmar contraseña</h3>
                    <input type='password' required name='password' value={account.password} onChange={handleChangeAccount} 
                    placeholder='introduzca contraseña'></input>
                </div>
                <div className='options-item'>
                    <div>
                        <a href='https://facebook.com/'><i class='bx bxl-facebook-circle bx-burst-hover'></i></a>
                        <a href='https://google.com/'><i class='bx bxl-google bx-burst-hover'></i></a>
                        <a href='https://instagram.com/'><i class='bx bxl-instagram bx-burst-hover'></i></a>
                        <a href='https://x.com/'><i class='bx bxl-twitter bx-burst-hover'></i></a>
                    </div>
                    <div>
                        <h4>Registrate tambien con</h4>
                    </div>
                </div>
                <div className='login-item'>
                    <div>
                    <a href='/login'><i class='bx bxs-user-plus'></i></a>
                    <h4>iniciar sesion</h4>
                    </div>
                    <button onClick={handleSubmit}>crear cuenta</button>
                    <a href='#'>info</a>
                </div>
            </section>
        </main>
    );
}

export default Register;