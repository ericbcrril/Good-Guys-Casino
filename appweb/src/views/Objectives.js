import React from "react";

export const Objectives = () => {
    return (
        <section className="Objectives-main">
            <section className="Objectives-tittle">
                <h1>Objetivos</h1>
            </section>
            <section className="boxes">
                <section className="objective-box">
                    <div className="objective-icon">
                        <i class='bx bxs-medal'></i>                    </div>
                    <div className="subtext">
                        <h2>Calidad</h2>
                    </div>
                </section>
                <section className="objective-box">
                    <div className="objective-icon">
                        <i class='bx bx-bar-chart'></i>
                    </div>
                    <div className="subtext">
                        <h2>Crecimiento</h2>
                    </div>
                </section>
                <section className="objective-box">
                    <div className="objective-icon">
                        <span class="material-symbols-outlined">
                            handshake
                        </span>
                    </div>
                    <div className="subtext">
                        <h2>Ganancias</h2>
                    </div>
                </section>
            </section>
        </section>
    )
}