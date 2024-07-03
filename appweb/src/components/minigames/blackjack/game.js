import React, { useState } from 'react';
import Bet from './bet';
import { cardDealSound, cardSound, flipCard } from '../../../constants/sounds/sounds';

const Game = ({ coins, setCoins }) => {
    const [gameState, setGameState] = useState('betting'); // 'betting', 'playing', 'gameOver', 'goodEnding'
    const [coinsEarned, setCoinsEarned] = useState(0); // Monedas ganadas
    const [bet, setBet] = useState(20); // Apuesta
    const [playerCards, setPlayerCards] = useState([]); // Cartas del jugador
    const [dealerCards, setDealerCards] = useState([]); // Cartas del crupier
    const [deck, setDeck] = useState([]); // Baraja
    const [message, setMessage] = useState('¡Ah jugar!'); // Mensaje de conclusión del juego
    const [dealerSecondCardVisible, setDealerSecondCardVisible] = useState(false); // Estado de visibilidad de la segunda carta del crupier

    const getCardValue = (card) => {
        if (['J', 'Q', 'K'].includes(card.value)) return 10;
        if (card.value === 'A') return 11; // Se maneja la lógica del As como 11 o 1 más adelante
        return parseInt(card.value);
    };

    const calculateTotal = (cards) => {
        let total = cards.reduce((sum, card) => sum + getCardValue(card), 0);
        let aces = cards.filter(card => card.value === 'A').length;
        while (total > 21 && aces > 0) {
            total -= 10;
            aces -= 1;
        }
        return total;
    };

    const generateDeck = () => {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];
        
        // Crear seis barajas
        for (let i = 0; i < 6; i++) {
            for (const suit of suits) {
                for (const value of values) {
                    deck.push({ suit, value });
                }
            }
        }
        
        // Barajar el mazo
        deck = deck.sort(() => Math.random() - 0.5);
        
        return deck;
    };

    const handleBet = (amount) => {
        setBet(amount);
        setCoins(coins - amount);
        setGameState('playing');
        startGame();
    };

    const startGame = () => {
        //cardDealSound.play(); // Reproducir sonido al repartir las cartas
        const newDeck = generateDeck();
        const initialPlayerCards = [newDeck.pop(), newDeck.pop()];
        const initialDealerCards = [newDeck.pop(), newDeck.pop()];
        setPlayerCards(initialPlayerCards);
        setDealerCards(initialDealerCards);
        setDeck(newDeck);
    };

    const playerHit = () => {
        cardSound.play();
        const newDeck = [...deck];
        const newCard = newDeck.pop();
        const newPlayerCards = [...playerCards, newCard];
        setPlayerCards(newPlayerCards);
        setDeck(newDeck);

        const playerTotal = calculateTotal(newPlayerCards);
        if (playerTotal === 11 && playerTotal <= 21) {
            setMessage('¡Has alcanzado 11 cartas sin pasarte! Automáticamente te plantas.');
            playerStand();
        }
    };

    const playerStand = () => {
        let newDeck = [...deck];
        let newDealerCards = [...dealerCards];
    
        // Mostrar la segunda carta del crupier
        setDealerSecondCardVisible(true);
        flipCard.play();
        
        const dealerDrawInterval = setInterval(() => {
            if (calculateTotal(newDealerCards) < 17) {
                cardSound.play();
                const newCard = newDeck.pop();
                newDealerCards = [...newDealerCards, newCard];
                setDealerCards(newDealerCards);
                setDeck(newDeck);
            } else {
                clearInterval(dealerDrawInterval);
    
                const dealerTotal = calculateTotal(newDealerCards);
                const playerTotal = calculateTotal(playerCards);
    
                setTimeout(() => {
                    if (playerTotal > 21) {
                        setMessage('¡Te pasaste! Pierdes.');
                        setCoinsEarned(coinsEarned - bet);
                        setCoins(coins - bet);
                        setGameState('gameOver');
                    } else if (playerTotal === 21 && dealerTotal === 21) {
                        setMessage('¡Empate! Ambos tienen Blackjack.');
                        setCoins(coins + bet);
                        setGameState('gameOver');
                    } else if (playerTotal === 21) {
                        setMessage('¡Blackjack! ¡Ganas!');
                        setCoinsEarned(coinsEarned + (bet * 2.5));
                        setCoins(coins + (bet * 2.5));
                        setGameState('goodEnding');
                    } else if (dealerTotal === 21) {
                        setMessage('¡Blackjack del crupier! ¡Pierdes!');
                        setCoinsEarned(coinsEarned - bet);
                        setCoins(coins - bet);
                        setGameState('gameOver');
                    } else if (dealerTotal > 21) {
                        setMessage('¡Ganaste!, Crupier se paso');
                        setCoinsEarned(coinsEarned + bet * 2);
                        setCoins(coins + bet * 2);
                        setGameState('goodEnding');
                    } else if (playerTotal === dealerTotal) {
                        setMessage('¡Empate!');
                        setCoins(coins + bet);
                        setGameState('gameOver');
                    } else if (playerTotal > dealerTotal){
                        setMessage('¡Ganaste!');
                        setCoinsEarned(coinsEarned + bet * 2);
                        setCoins(coins + bet * 2);
                        setGameState('goodEnding');
                    }else if (dealerTotal > playerTotal){
                        setMessage('¡Perdiste!');
                        setCoinsEarned(coinsEarned - bet * 2);
                        setCoins(coins - bet * 2);
                        setGameState('gameOver');
                    }else {
                        setMessage('¡Perdiste!');
                        setCoinsEarned(coinsEarned - bet);
                        setCoins(coins - bet);
                        setGameState('gameOver');
                    }
                }, 2000);
            }
        }, 1000); // Intervalo de 1 segundo entre cada carta del crupier
    };
    

    const withdraw = () => {
        setMessage('Te retiras');
        setGameState('gameOver');
    };

    const resetGame = () => {
        setCoinsEarned(0);
        setBet(20);
        setPlayerCards([]);
        setDealerCards([]);
        setDeck([]);
        setGameState('betting');
        setMessage('¡Ah jugar!');
        setDealerSecondCardVisible(false); // Reiniciar el estado de visibilidad de la segunda carta del crupier
    };

    const getCardImage = (card) => {
        const value = card.value;
        const suit = card.suit.toLowerCase();
        return `/images/minigames/blackjack/cards/${suit}/${value}.png`;
    };

    return (
        <div>
            {gameState === 'betting' && <Bet onBet={handleBet} coins={coins} />}
            {gameState === 'playing' && (
                <div>
                    <div>
                        <h2>Crupier</h2>
                        <div>
                            {dealerCards.map((card, index) => (
                                <div key={index} className="card-container">
                                    <img
                                        src={dealerSecondCardVisible || index === 0 ? getCardImage(card) : '/images/minigames/blackjack/cards/reverse_card.png'}
                                        alt={`${card.value} de ${card.suit}`}
                                        className={`card ${index === 1 && !dealerSecondCardVisible ? 'reverse_card.png' : ''}`}
                                    />
                                </div>
                            ))}

                        </div>
                        <div className={`${!dealerSecondCardVisible ? 'noVisible' : ''}`}>Total: {calculateTotal(dealerCards)}</div>
                    </div>
                    <div>
                        <h2>Jugador</h2>
                        <div>
                            {playerCards.map((card, index) => (
                                <div key={index} className="card-container">
                                    <img
                                        src={getCardImage(card)}
                                        alt={`${card.value} de ${card.suit}`}
                                        className='card'
                                    />
                                </div>
                            ))}
                        </div>
                        <div>Total: {calculateTotal(playerCards)}</div>
                    </div>
                    <p>{message}</p>
                    <div>
                        <button className="game-button" onClick={playerHit} disabled={gameState !== 'playing'}>
                            Pedir
                        </button>
                        <button className="game-button" onClick={playerStand} disabled={gameState !== 'playing'}>
                            Plantarse
                        </button>
                        <button className="game-button" onClick={withdraw} disabled={gameState !== 'playing'}>
                            Retirarse
                        </button>
                    </div>
                </div>
            )}
            {gameState === 'gameOver' && (
                <div className="game-container">
                    <h2 className="game-over-message">Fin del juego</h2>
                    <p>{message}</p>
                    <p className="game-over-text">Balance: {coinsEarned > 0 ? `+${coinsEarned}` : coinsEarned}</p>
                    <button className="reset-button" onClick={resetGame}>Reiniciar</button>
                </div>
            )}
            {gameState === 'goodEnding' && (
                <div className="game-container">
                    <h2 className="game-over-message">¡Felicidades!</h2>
                    <p>{message}</p>
                    <p className="game-over-text">Balance: {coinsEarned > 0 ? `+${coinsEarned}` : coinsEarned}</p>
                    <button className="reset-button" onClick={resetGame}>Reiniciar</button>
                </div>
            )}
        </div>
    );
};

export default Game;
