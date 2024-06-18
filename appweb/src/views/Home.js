import React from 'react';
import MainNabvar from "../components/navbars/MainNavbar";
import Footer from "../components/misc/Footer";

function home() {
    return(
        <main>
            <MainNabvar />
            <div className='home-content'>
                <div className='home-content-box'>
                    <div className='purple-box'>
                        <img src='/images/icons/playing_cards_24dp.svg' alt='icon'/>
                        <a>Minijuegos</a>
                    </div>
                </div>

                <div className='home-content-box'>
                    <img src='/images/logos/logoGG.png' className='home-logo' alt='logo'/>
                    <div className='purple-box'>
                        <img src='/images/icons/groups_24dp.svg' alt='icon'/>
                        <a>¿Quienes somos?</a>
                    </div>
                </div>

                <div className='home-content-box'>
                    <div className='purple-box'>
                        <img src='/images/icons/login_24dp.svg' alt='icon'/>
                        <a>Iniciar Sesion</a>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default home;
