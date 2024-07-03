import { React } from "react";
import { Link } from 'react-router-dom';

function mainNabvar() {
    return(
        <nav>
            <img className='main-logo' src="/images/logos/logo_min.png" draggable='false'/>
            <Link to="/main" >Inicio</Link>
            <Link to="/minigames" >Minijuegos</Link>
            <button>
                <Link to="/login">Iniciar sesion</Link>
            </button>
        </nav>
    );
}

export default mainNabvar;