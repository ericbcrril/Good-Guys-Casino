import React, { useState } from 'react';
import MainNabvar from "../components/navbars/MainNavbar";
import { Introduction } from './Introduction';
import { Objectives } from './Objectives';
import { Services } from './Services';

export const GgInformation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sections = [
        { id: 'section1', content: <Introduction /> },
        { id: 'section2', content: <Objectives /> },
        { id: 'section3', content: <Services /> }
    ];

    const showSection = (index) => {
        if (index >= sections.length) {
            setCurrentIndex(0);
        } else if (index < 0) {
            setCurrentIndex(sections.length - 1);
        } else {
            setCurrentIndex(index);
        }
    };

    const nextSection = () => {
        showSection(currentIndex + 1);
    };

    const prevSection = () => {
        showSection(currentIndex - 1);
    };

    const offset = -currentIndex * 100;

    return (
        <main className='gginformation-main-container'>
            <MainNabvar />
            <section className='sb-section'>
                <div className='search-bar'>
                    <i class='bx bx-search'></i>
                    <input type='text'></input>
                    <i class='bx bx-x'></i>
                </div>
            </section>
            <section className='title-section'>
                <h1>Referencias</h1>
            </section>
            <section className='videos-section'>
                <div className='video-container'>
                    <video width={"320"} height={"240"} controls >
                        <source src='/videos/anuncioGG.mp4' type='video/mp4'></source>
                    </video>
                </div>
                <div className='video-container'>
                    <video width={"320"} height={"240"} controls >
                        <source src='/videos/anuncioGG.mp4' type='video/mp4'></source>
                    </video>
                </div>
                <div className='video-container'>
                    <video width={"320"} height={"240"} controls >
                        <source src='/videos/anuncioGG.mp4' type='video/mp4'></source>
                    </video>
                </div>
            </section>

            <div className="carousel-container">
                <div className="carousel" style={{ transform: `translateX(${offset}%)` }}>
                    {sections.map((section, index) => (
                        <div key={section.id} className="carousel-item">
                            {section.content}
                        </div>
                    ))}
                </div>
                <div className='next-item' onClick={nextSection}>
                    <i class='bx bx-chevron-right'></i>
                </div>
            </div>
        </main>
    )
}