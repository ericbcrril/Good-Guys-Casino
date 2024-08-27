import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import 'boxicons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
//Componentes
import GGLogo from '../../components/misc/GGLogo';
import Footer from '../../components/misc/Footer';
import Carousel from "../../components/misc/carrousel";

function Home(){
    const images = [
        'images/wallpers/wallper-webDevelopment.png',
        'images/wallpers/wallper-webDevelopment.png',
        'images/wallpers/wallper-webDevelopment.png'
    ];
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
        question: '¿Tiempo estimado de entrega?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        },
        {
        question: '¿Cuanto me cuesta?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        },
        {
        question: '¿Otra pregunta?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        },
  ];
    return(
        <main className="main-serviceView">
            <GGLogo></GGLogo>

            <section className="hero-section">
                <div className="hero-image">
                    <h1>Desarrollo Web</h1>
                </div>
            </section>

            <section className="content-section">
                <div className="content">
                    <h2>Introduccion</h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.</p>
                </div>
                <div className="content">
                    <h2>Nuestros Proyectos</h2>
                    <Carousel images={images} autoSlide={true} interval={5000}/>
                </div>
                <div className="content">
                    <h2>Tecnologias</h2>
                    <div className="imgTec-container">
                        <img src="images/logos/html-logo.png" alt=""/>
                        <img src="images/logos/js-logo.png" alt=""/>
                        <img src="images/logos/css-logo.png" alt=""/>
                    </div>
                    <div className="imgTec-container2">
                        <img src="images/logos/node-logo.png" alt=""/>
                        <img src="images/logos/react-logo.png" alt=""/>
                        <img src="images/logos/mongodb-logo.png" alt=""/>
                    </div>
                </div>
                <div className="content">
                    <h2>Preguntas Frecuentes</h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            <h3>{faq.question}</h3>
                            <span>{openIndex === index ? <FaChevronUp /> : <FaChevronDown />}</span>
                        </div>
                        {openIndex === index && (
                            <div className="faq-answer">
                            <p>{faq.answer}</p>
                            </div>
                        )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer></Footer>
        </main>
    );
}

export default Home;