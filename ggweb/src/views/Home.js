import React from "react";
import { Link } from "react-router-dom";
import 'boxicons';
//Icons By www.freepik.es
function Home(){
    return(
        <main className="main-home">
            <h1 className="gg-letters">GOOD GUYS</h1>

            <div className="home-main-content">
                <div className="home-content0">
                    <img src="/images/logos/logo_min.png" className="gg-logo" alt="logo"/>
                    <h2 className="services-letters">NUESTROS SERVICIOS</h2>
                </div>

                <div className="home-content1">
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#">
                                <img src="/images/icons/online-education.png" alt="logo"/> 
                                <p>Cursos Online</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#">
                                <img src="/images/icons/cyber-security.png" alt="logo" className="home-box-element-img"/> 
                                <p>Encriptacion y Ciberseguridad</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#">
                                <img src="/images/icons/bullhorn.png" alt="logo"/> 
                                <p>Marketing</p>
                            </Link>
                        </div>

                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#">
                                <img src="/images/icons/mobile-development.png" alt="logo"/> 
                                <p>Desarrollo Movil</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="/desarrollo-web"> 
                                <img src="/images/icons/web-coding.png" alt="logo"/> 
                                <p>Desarrollo Web</p>
                            </Link>
                        </div>
                        <div className="home-box-element">
                            <Link className="link-wrapper" to="#"> 
                                <img src="/images/icons/game.png" alt="logo"/> 
                                <p className="home-box-element-casino">GG CASINO</p>
                            </Link>
                        </div>
                </div>

                <div className="home-content2">
                <a href='https://instagram.com/'><i class='bx bxl-instagram bx-burst-hover custom-icon'></i></a>
                    <a href='https://facebook.com/'><i class='bx bxl-facebook bx-burst-hover custom-icon'></i></a>
                    <a href='https://x.com/'><i class='bx bxl-twitter bx-burst-hover custom-icon'></i></a>
                </div>
            </div>
            <div className="credits">
                <a href="http://www.freepik.es/">Icons By www.freepik.es</a>
            </div>
        </main>
    );
}

export default Home;