import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import 'boxicons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// Componentes
import GGLogo from '../../components/misc/GGLogo';
import Footer from '../../components/misc/Footer';
import Carousel from "../../components/misc/carrousel";

function MobileDevelopment(){
    const images = [
        'images/carrousel/carrousel1/image0.png',
        'images/carrousel/carrousel1/image1.png',
        'images/carrousel/carrousel1/image2.png'
    ];
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
        question: '¿Cuál es el tiempo estimado de entrega?',
        answer: 'El tiempo de entrega varía según el proyecto. En promedio, un desarrollo móvil puede tardar entre 4 a 12 semanas, dependiendo de la complejidad y los requisitos específicos.',
        },
        {
        question: '¿Cuánto cuesta el desarrollo de una aplicación móvil?',
        answer: 'El costo depende de múltiples factores, incluyendo la funcionalidad, el diseño, y las plataformas en las que se desea lanzar la aplicación. Ofrecemos cotizaciones personalizadas para cada proyecto.',
        },
        {
        question: '¿Qué tipo de soporte técnico ofrecen?',
        answer: 'Proveemos soporte técnico post-lanzamiento, incluyendo mantenimiento de aplicaciones, actualización de funcionalidades y soporte para cualquier problema técnico que pueda surgir después del lanzamiento.',
        },
  ];
    return(
        <main className="main-serviceView">
            <GGLogo></GGLogo>

            <section className="hero-section">
                <div className="hero-image1">
                    <h1>Desarrollo Móvil</h1>
                </div>
            </section>

            <section className="content-section">
                <div className="content">
                    <h2>Introducción</h2>
                    <p>En Good Guys optamos por el desarrollo de aplicaciones móviles para Android e iOS. 
                        Nuestro equipo se dedica a crear aplicaciones personalizadas que cumplen con las necesidades específicas 
                        de cada cliente, utilizando las tecnologías multiplataforma para asegurar un tiempo de desarrollo mas corto.</p>
                </div>
                <div className="content">
                    <h2>Nuestros Proyectos</h2>
                    <Carousel images={images} autoSlide={true} interval={5000}/>
                </div>
                <div className="content">
                    <h2>Tecnologías</h2>
                    <div className="imgTec-container2">
                        <img src="images/logos/node-logo.png" alt="Node.js"/>
                        <img src="images/logos/react-logo.png" alt="React"/>
                        <img src="images/logos/mongodb-logo.png" alt="MongoDB"/>
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

export default MobileDevelopment;
