import React, { useState } from 'react';
import Bet from './bet';

const Game = ({ coins, setCoins }) => {
    const [gameState, setGameState] = useState('betting'); // 'betting', 'playing', 'gameOver', 'goodEnding'
    const [coinsEarned, setCoinsEarned] = useState(0); //Monedas ganadas
    const [bet, setBet] = useState(20); //Apuesta
    const [playerCards, setPlayerCards] = useState([]); //Cartas del jugador
    const [dealerCards, setDealerCards] = useState([]); //Rival
    const [deck, setDeck] = useState([]);// Baraja
    const [message, setMessage] = useState(''); //Mensaje de conclusión del juego

    const getCardValue = (card) => {
        if (['J', 'Q', 'K'].includes(card.value)) return 10;
        if (card.value === 'A') return 11;
        return parseInt(card.value);
    };

    const calculateTotal = (cards) => {
        let total = cards.reduce((sum, card) => sum + getCardValue(card), 0);
        let aces = cards.filter(card => card.value === 'A').length;
        while (total > 21 && aces) {
            total -= 10;
            aces -= 1;
        }
        return total;
    };

    const generateDeck = () => {
        const suits = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value });
            }
        }
        return deck.sort(() => Math.random() - 0.5);
    };

    const handleBet = (amount) => {
        setBet(amount);
        setCoins(coins - amount);
        setGameState('playing');
        startGame();
    };

    const startGame = () => {
        const newDeck = generateDeck();
        const initialPlayerCards = [newDeck.pop(), newDeck.pop()];
        const initialDealerCards = [newDeck.pop(), newDeck.pop()];
        setPlayerCards(initialPlayerCards);
        setDealerCards(initialDealerCards);
        setDeck(newDeck);

        const playerTotal = calculateTotal(initialPlayerCards);
        const dealerTotal = calculateTotal(initialDealerCards);

        if (playerTotal === 21 && dealerTotal === 21) {
            setMessage('¡Empate! Ambos tienen Blackjack.');
            setCoins(coins);
            setGameState('gameOver');
        } else if (playerTotal === 21) {
            setMessage('¡Blackjack! ¡Ganas!');
            setCoinsEarned(coinsEarned + (bet * 2.5));
            setCoins(coins + (bet * 2.5));
            setGameState('goodEnding');
        } else if (dealerTotal === 21) {
            setMessage('¡Blackjack del rival! ¡Pierdes!');
            setCoinsEarned(coinsEarned - (bet * 2.5));
            setCoins(coins - (bet * 2.5));
            setGameState('gameOver');
        }
    };

    const playerHit = () => {
        const newDeck = [...deck];
        const newCard = newDeck.pop();
        const newPlayerCards = [...playerCards, newCard];
        setPlayerCards(newPlayerCards);
        setDeck(newDeck);

        const playerTotal = calculateTotal(newPlayerCards);
        if (playerTotal > 21) {
            setCoinsEarned(coinsEarned - bet);
            setCoins(coins - bet);
            setMessage('¡Te pasaste! Pierdes.');
            setGameState('gameOver');
        }
    };

    const playerStand = () => {
        let newDeck = [...deck];
        let newDealerCards = [...dealerCards];

        while (calculateTotal(newDealerCards) < 17) {
            const newCard = newDeck.pop();
            newDealerCards = [...newDealerCards, newCard];
        }

        setDealerCards(newDealerCards);
        setDeck(newDeck);

        const dealerTotal = calculateTotal(newDealerCards);
        const playerTotal = calculateTotal(playerCards);

        if (dealerTotal > 21 || playerTotal > dealerTotal) {
            setMessage('¡Ganaste!');
            setCoinsEarned(coinsEarned + bet * 2);
            setCoins(coins + bet * 2);
            setGameState('goodEnding');
        } else if (playerTotal === dealerTotal) {
            setMessage('¡Empate!');
            setCoins(coins + bet);
            setGameState('gameOver');
        } else {
            setMessage('¡Perdiste!');
            setCoinsEarned(coinsEarned - bet);
            setCoins(coins - bet);
            setGameState('gameOver');
        }
    };

    const withdraw = () => {
        setCoinsEarned(coinsEarned);
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
        setMessage('');
    };

    return (
        <div>
            {gameState === 'betting' && <Bet onBet={handleBet} coins={coins} />}
            {gameState === 'playing' && (
                <div>
                    <div>
                        <h2>Crupier</h2>
                        <div>{dealerCards.map(card => `${card.value} de ${card.suit}`).join(', ')}</div>
                        <div>Total: {calculateTotal(dealerCards)}</div>
                    </div>
                    <div>
                        <h2>Jugador</h2>
                        <div>{playerCards.map(card => `${card.value} de ${card.suit}`).join(', ')}</div>
                        <div>Total: {calculateTotal(playerCards)}</div>
                    </div>
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
