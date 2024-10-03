import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import 'boxicons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// Componentes
import GGLogo from '../../components/misc/GGLogo';
import Footer from '../../components/misc/Footer';
import Carousel from "../../components/misc/carrousel";

function WebDevelopment(){
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
        question: '¿Cuál es el tiempo estimado de entrega?',
        answer: 'El tiempo estimado para completar un proyecto de desarrollo web depende de la complejidad del sitio y las funcionalidades requeridas. Generalmente, un sitio web básico puede tardar entre 2 a 4 semanas, mientras que proyectos más complejos pueden requerir de 6 a 12 semanas.',
        },
        {
        question: '¿Cuánto cuesta el desarrollo de un sitio web?',
        answer: 'El costo de un sitio web varía según las necesidades específicas del cliente, incluyendo diseño, funcionalidades, y tecnologías utilizadas. Ofrecemos opciones personalizados que se ajustan a diferentes presupuestos.',
        },
        {
        question: '¿Qué tipo de soporte técnico ofrecen?',
        answer: 'Proveemos soporte técnico post-lanzamiento que incluye mantenimiento del sitio, actualizaciones de seguridad, y asistencia para resolver cualquier problema técnico que pueda surgir. Además, ofrecemos paquetes de soporte continuo para asegurar que su sitio web funcione de manera óptima.',
        },
    ];
    return(
        <main className="main-serviceView">
            <GGLogo />

            <section className="hero-section">
                <div className="hero-image0">
                    <h1>Desarrollo Web</h1>
                </div>
            </section>

            <section className="content-section">
                <div className="content">
                    <h2>Introducción</h2>
                    <p>En Good Guys optamos por el desarrollo de sitios web personalizados que se adaptan a las necesidades de nuestros clientes.
                        Desde la creación de sitios web corporativos hasta aplicaciones en línea, nuestro equipo utiliza distintas tecnologías
                        para ofrecer soluciones efectivas, escalables y seguras.</p>
                </div>
                {/*
                <div className="content">
                    <h2>Nuestros Proyectos</h2>
                    <Carousel images={images} autoSlide={true} interval={5000}/>
                </div>
                */}
                <div className="content">
                    <h2>Tecnologías</h2>
                    <div className="imgTec-container">
                        <img src="images/logos/html-logo.png" alt="HTML5"/>
                        <img src="images/logos/js-logo.png" alt="JavaScript"/>
                        <img src="images/logos/css-logo.png" alt="CSS3"/>
                    </div>
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

            <Footer />
        </main>
    );
}

export default WebDevelopment;
