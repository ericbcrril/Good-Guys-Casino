import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import 'boxicons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// Componentes
import GGLogo from '../../components/misc/GGLogo';
import Footer from '../../components/misc/Footer';
import Carousel from "../../components/misc/carrousel";

function Marketing(){
    const images = [
        'images/carrousel/carrousel0/image0.png',
        'images/carrousel/carrousel0/image1.png',
        'images/carrousel/carrousel0/image2.png'
    ];
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
        question: '¿Pregunta?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        },
        {
        question: '¿Pregunta?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        },
        {
        question: '¿Pregunta?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        },
  ];
    return(
        <main className="main-serviceView">
            <GGLogo />

            <section className="hero-section">
                <div className="hero-image2">
                    <h1>Marketing Digital</h1>
                </div>
            </section>

            <section className="content-section">
            <div className="content">
                    <h2>Introduccion</h2>
                    <p>En Good Guys, ayudamos a impulsar tu negocio a través de estrategias de marketing digital personalizadas. 
                        Colaboramos con nuestros clientes para alcanzar su audiencia objetivo y aumentar su visibilidad online 
                        mediante técnicas y herramientas innovadoras.
                    </p>
                </div>

                <div className="content">
                    <h2>Estrategias de Mercado</h2>
                    <p>Planeamos y visualizamos el público objetivo y los medios más efectivos para alcanzarlo. Utilizamos 
                        nuevas herramientas de programación y marketing para crear innovaciones que destacan por encima de las 
                        tendencias habituales.</p>
                </div>

                <div className="content">
                    <h2>Compromiso con el Cliente</h2>
                    <p>Nos enfocamos en encontrar la mejor manera de crecer juntos y alcanzar nuestros objetivos. Por ello, el costo 
                        de nuestros servicios se acordará según el progreso del trabajo.</p>
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

            <Footer />
        </main>
    );
}

export default Marketing;
