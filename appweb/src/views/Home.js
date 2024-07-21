import React from 'react';
import MainNabvar from "../components/navbars/MainNavbar";
import Footer from "../components/misc/Footer";
import { Link } from 'react-router-dom';

function home() {
    return(
        <main>
            <MainNabvar />
            <div className='home-content'>
                <div className='home-content-box'>
                    <div className='purple-box'>
                    <Link to="/minigames" className='purple-box-img-link'>
                        <img src='/images/icons/playing_cards_24dp.svg' alt='icon'/>
                    </Link>
                        <Link to="/minigames">Minijuegos</Link>
                    </div>
                </div>

                <div className='home-content-box'>
                    <img src='/images/logos/logoGgAnimated.gif' className='home-logo' alt='logo'/>
                    <Link to={"/GoodGuys"}><div className='purple-box'>
                    <Link to="/GoodGuys" className='purple-box-img-link'>
                        <img src='/images/icons/groups_24dp.svg' alt='icon'/>
                    </Link>
                        <Link to="/GoodGuys">¿Quienes somos?</Link>
                    </div> </Link>
                </div>

                <div className='home-content-box'>
                    <div className='purple-box'>
                    <Link to="/login" className='purple-box-img-link'>
                        <img src='/images/icons/login_24dp.svg' alt='icon'/>
                    </Link>
                        <Link to="/login">Iniciar Sesion</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default home;
