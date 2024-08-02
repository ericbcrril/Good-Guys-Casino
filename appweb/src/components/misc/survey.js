import { useState } from "react";
import { surveyCollection } from "../../model/collections";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Survey = () => {
    const [surveyAnswers, setSurveyAnswers] = useState({ ...surveyCollection });
    const [minigame, setMinigame] = useState(1);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    const images = {
        1: ["/images/survey/rr1.jpg", "/images/survey/rr2.jpg", "/images/survey/rr3.jpg"],
        2: ["/images/survey/bj1.jpg", "/images/survey/bj2.jpg", "/images/survey/bj3.jpg"],
    };

    const handleRadioChange = (e) => {
        const value = e.target.value;
        setSurveyAnswers(prevState => ({
            ...prevState,
            answer: value,
            minigame: minigame
        }));
    };

    const submitAnswer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/survey/survey', surveyAnswers, { withCredentials: true });
            alert('respuesta registrada correctamente');
            if (minigame === 2) {
                setIsVisible(false);
                setTimeout(() => { navigate('/profile'); }, 5000);
            }
            setMinigame(2);
        } catch (error) {
            alert('no ha sido posible registrar su respuesta');
        }
    };

    return (
        <main className="main-survey">
            <section className="survey-container">
                {isVisible ? (
                    <>
                        <h2>Los minijuegos aún no están disponibles, ¡espéralos pronto!</h2>
                        <section className="question">
                            <h1>¿Apostarías en este minijuego de casino?</h1>
                        </section>
                        <section className="images-survey">
                            {images[minigame].map((src, index) => (
                                <img key={index} src={src} alt={`Juego ${index + 1}`} />
                            ))}
                        </section>
                        <section className="survey-section">
                            <p>SI</p>
                            <input type="radio" name="answer" value={true} onChange={handleRadioChange}></input>
                            <p>NO</p>
                            <input type="radio" name="answer" value={false} onChange={handleRadioChange}></input>
                            <button onClick={submitAnswer}>Enviar respuesta</button>
                        </section>
                    </>
                ) : (
                    <h1>¡Gracias por sus respuestas!</h1>
                )}
            </section>
        </main>
    );
};
