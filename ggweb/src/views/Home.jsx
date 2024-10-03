import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'boxicons';
//Icons By www.freepik.es
function Home(){
    const navigate = useNavigate();

    function handleClick(to){
        if(to === "#"){
            alert("Seccion en desarrollo, ¡Esperala!")
        }else{navigate(to);}
    }
    return(
        <main className="main-home">
            <h1 className="gg-letters" translate="no">GOOD GUYS</h1>

            <div className="home-main-content">
                <div className="home-content0">
                    <img src="/images/logos/logo_min.png" className="gg-logo" alt="logo"/>
                    <h2 className="services-letters">NUESTROS SERVICIOS</h2>
            </div>
                  
                <div className="home-content1">
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#" onClick={() => alert("Cursos en linea de distintas tecnologias, ¡Esperalo!")}>
                                <img src="/images/icons/online-education.png" alt="logo" 
                                onClick={ () => handleClick("#") }/> 
                                <p>Cursos Online</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#" onClick={() => alert("Encriptacion y Proteccion de datos, ¡Esperalo!")}>
                                <img src="/images/icons/cyber-security.png" alt="logo" className="home-box-element-img"
                                onClick={ () => handleClick("#") }/> 
                                <p>Encriptacion y Ciberseguridad</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="/marketing">
                                <img src="/images/icons/bullhorn.png" alt="logo" 
                                onClick={ () => handleClick("/marketing") }/> 
                                <p>Marketing</p>
                            </Link>
                        </div>

                        <div className="home-box-element">
                            <Link className="link-wrapper" to="/desarrollo-movil">
                                <img src="/images/icons/mobile-development.png" alt="logo"
                                onClick={ () => handleClick("/desarrollo-movil") }/> 
                                <p>Desarrollo Movil</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="/desarrollo-web"> 
                                <img src="/images/icons/web-coding.png" alt="logo"
                                onClick={ () => handleClick("/desarrollo-web") }/> 
                                <p>Desarrollo Web</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#" onClick={() => alert("Divertido Casino en linea, ¡Esperalo!")}> 
                                <img src="/images/icons/game.png" alt="logo"
                                onClick={ () => handleClick("#") }/> 
                                <p className="home-box-element-casino">GG CASINO</p>
                            </Link>
                        </div>
                </div>
                
                <div className="home-content2">
                    <a href='https://www.instagram.com/goodguyscomp?igsh=ZHludTA4cmc1aXMw'><i class='bx bxl-instagram bx-burst-hover custom-icon'></i></a>
                    <a href='https://www.facebook.com/profile.php?id=61564172147714&mibextid=ZbWKwL'><i class='bx bxl-facebook bx-burst-hover custom-icon'></i></a>
                </div>
            </div>
            <div className="credits">
                <a href="http://www.freepik.com/">Icons By www.freepik.com</a>
            </div>
            <div className="credits2">
                <a href="https://www.pexels.com/es-es/foto/dunas-de-arena-negra-2387793/">Photo by Adrien Olichon </a>
            </div>    
        </main>
    );
}

export default Home;