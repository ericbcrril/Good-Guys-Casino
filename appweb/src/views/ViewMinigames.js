// viewMinigames.js
import React from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from "../components/navbars/MainNavbar";
import Footer from '../components/misc/Footer';
import openWindow from '../scripts/misc/redirectWindow'; // Asumiendo que openWindow está definido en redirectWindow.js
import HelloWorld from './helloWorld'; // Asegúrate de importar correctamente HelloWorld
//Minijuegos
import Roulette from './minigames/roulette';
import BlackJack from './minigames/blackjack';

function ViewMinigames() {
    const handleOpenWindow = (component) => {
        openWindow(component, 'Ruleta', ''); // Llama a openWindow con el componente que deseas renderizar
    };

    return (
        <main>
            <MainNavbar />
            <div className='container-welcome-message'>
                <h1>Bienvenido a Good Guys Casino</h1>
                <h1>Prueba gratis cualquiera de nuestros minijuegos!</h1>
            </div>
            <div className='minigames-boxes-container'>
                <div className='minigame-box'>
                    <img src='/images/test.png'/>
                    <Link onClick={() => handleOpenWindow(Roulette)}>Ruleta Rusa</Link>
                </div>
                <div className='minigame-box'>
                    <img src='/images/test.png'/>
                    <Link onClick={() => handleOpenWindow(BlackJack)}>Blackjack</Link>
                </div>
                <div className='minigame-box'>
                    <img src='/images/test.png'/>
                    <Link onClick={() => handleOpenWindow(HelloWorld)}>Bingo</Link>
                </div>
                <div className='minigame-box'>
                    <img src='/images/test.png'/>
                    <Link onClick={() => handleOpenWindow(HelloWorld)}>Minijuego 4</Link>
                </div>
            </div>
        </main>
    );
}

export default ViewMinigames;
