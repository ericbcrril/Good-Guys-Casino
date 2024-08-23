import React from "react";
import { Link } from "react-router-dom";
import 'boxicons';

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
                            <img src="/images/test.png" alt="logo"/> <p>Cursos Online</p>
                        </div>
                        <div className="home-box-element">
                            <img src="/images/test.png" alt="logo" className="home-box-element-img"/> <p>Encriptacion y Ciberseguridad</p>
                        </div>
                        <div className="home-box-element">
                            <img src="/images/test.png" alt="logo"/> <p>Marketing</p>
                        </div>

                        <div className="home-box-element">
                            <img src="/images/test.png" alt="logo"/> <p>Desarrollo Movil</p>
                        </div>
                        <div className="home-box-element">
                            <img src="/images/test.png" alt="logo"/> <p>Desarrollo Web</p>
                        </div>
                        <div className="home-box-element">
                            <img src="/images/test.png" alt="logo"/> <p>GG CASINO</p>
                        </div>
                </div>

                <div className="home-content2">
                <a href='https://instagram.com/'><i class='bx bxl-instagram bx-burst-hover custom-icon'></i></a>
                    <a href='https://facebook.com/'><i class='bx bxl-facebook bx-burst-hover custom-icon'></i></a>
                    <a href='https://x.com/'><i class='bx bxl-twitter bx-burst-hover custom-icon'></i></a>
                </div>
            </div>

        </main>
    );
}

export default Home;