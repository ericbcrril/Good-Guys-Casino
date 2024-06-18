import { React } from "react";
import { Link } from 'react-router-dom';

function mainNabvar() {
    return(
        <nav>
            <img src="/images/logo/logo.png" />
            <Link to="/main" >Inicio</Link>
            <Link to="/minigames" >Minijuegos</Link>
            <button>
                <Link to="/login">Iniciar sesion</Link>
            </button>
        </nav>
    );
}

export default mainNabvar;