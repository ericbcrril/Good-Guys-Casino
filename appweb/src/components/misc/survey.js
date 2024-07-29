import { useState } from "react"
import { surveyCollection } from "../../model/collections";
import axios from 'axios';

export const Survey = () => {
    const [surveyAsnwers, setSurveyAnswers] = useState({ surveyCollection})
    const [answer, setAnswer] = useState(null);
    const [minigame, setMinigame] = useState(0);
    const handleRadioChange = (e) => {
        setAnswer(e.target.value);
        setMinigame(0);
        console.log(e.target.value);
    };

    const submitAnswer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/survey/survey', { ...surveyAsnwers});
        } catch (error) {
            alert('no ha sido posible registrar su respuesta');
        }
    }

    return (
        <main className="main-survey">
            <section className="survey-container">
                <h2>Los minijuegos aun no estan disponibles, esperalos pronto!</h2>
                <section className="question">
                    <h1>Apostarias en esto minijuego de casino ?</h1>
                </section>
                <section className="images-survey">
                    <img src="/images/survey/rr1.jpg"></img>
                    <img src="/images/survey/rr2.jpg"></img>
                    <img src="/images/survey/rr3.jpg"></img>
                </section>
                <section className="survey-section">
                    <p>SI</p>
                    <input type="radio" name="answer" value={true} onChange={handleRadioChange}></input>
                    <p>NO</p>
                    <input type="radio" name="answer" value={false} onChange={handleRadioChange}></input>
                    <p>enviar respuesta</p>
                    <button onClick={submitAnswer}></button>
                </section>
            </section>
        </main>
    )

}