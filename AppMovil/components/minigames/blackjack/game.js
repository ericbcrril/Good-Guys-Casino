import React, { useState, useEffect } from 'react';
import { Text, Animated, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
//Componentes
import Bet from './bet';
import { GameContainer, GameButton, TextGameButton, ResetButton, GameText, GameTitle } from 'components/minigames/components';
//Estilos
import { styles } from 'assets/styles/minigames/styles';
import { stylesBlackjack } from 'assets/styles/minigames/blackjack';
//Audio
import soundsEffects from 'constants/sounds/minigames/soundsEffects'; // Importa el gestor de sonidos

const Game = ({ coins, setCoins }) => {
    const [gameState, setGameState] = useState('betting'); // 'betting', 'playing', 'gameOver', 'goodEnding'
    const [coinsEarned, setCoinsEarned] = useState(0); // Monedas ganadas
    const [bet, setBet] = useState(20); // Apuesta
    const [playerCards, setPlayerCards] = useState([]); // Cartas del jugador
    const [dealerCards, setDealerCards] = useState([]); // Cartas del crupier
    const [deck, setDeck] = useState([]); // Baraja
    const [message, setMessage] = useState('¡Ah jugar!'); // Mensaje de conclusión del juego
    const [dealerSecondCardVisible, setDealerSecondCardVisible] = useState(false); // Estado de visibilidad de la segunda carta del crupier
    const [isResetButtonDisabled, setResetButtonDisabled] = useState(false);
    const [isHitButtonDisabled, setHitButtonDisabled] = useState(false);
    const [isStandButtonDisabled, setStandButtonDisabled] = useState(false);

    const cardImages = {
        
        hearts: {
            '2': require('assets/images/minigames/blackjack/cards/hearts/2.png'),
            '3': require('assets/images/minigames/blackjack/cards/hearts/3.png'),
            '4': require('assets/images/minigames/blackjack/cards/hearts/4.png'),
            '5': require('assets/images/minigames/blackjack/cards/hearts/5.png'),
            '6': require('assets/images/minigames/blackjack/cards/hearts/6.png'),
            '7': require('assets/images/minigames/blackjack/cards/hearts/7.png'),
            '8': require('assets/images/minigames/blackjack/cards/hearts/8.png'),
            '9': require('assets/images/minigames/blackjack/cards/hearts/9.png'),
            '10': require('assets/images/minigames/blackjack/cards/hearts/10.png'),
            'J': require('assets/images/minigames/blackjack/cards/hearts/j.png'),
            'Q': require('assets/images/minigames/blackjack/cards/hearts/q.png'),
            'K': require('assets/images/minigames/blackjack/cards/hearts/k.png'),
            'A': require('assets/images/minigames/blackjack/cards/hearts/a.png'),
        },
        diamonds: {
            '2': require('assets/images/minigames/blackjack/cards/diamonds/2.png'),
            '3': require('assets/images/minigames/blackjack/cards/diamonds/3.png'),
            '4': require('assets/images/minigames/blackjack/cards/diamonds/4.png'),
            '5': require('assets/images/minigames/blackjack/cards/diamonds/5.png'),
            '6': require('assets/images/minigames/blackjack/cards/diamonds/6.png'),
            '7': require('assets/images/minigames/blackjack/cards/diamonds/7.png'),
            '8': require('assets/images/minigames/blackjack/cards/diamonds/8.png'),
            '9': require('assets/images/minigames/blackjack/cards/diamonds/9.png'),
            '10': require('assets/images/minigames/blackjack/cards/diamonds/10.png'),
            'J': require('assets/images/minigames/blackjack/cards/diamonds/j.png'),
            'Q': require('assets/images/minigames/blackjack/cards/diamonds/q.png'),
            'K': require('assets/images/minigames/blackjack/cards/diamonds/k.png'),
            'A': require('assets/images/minigames/blackjack/cards/diamonds/a.png'),
        },
        clubs: {
            '2': require('assets/images/minigames/blackjack/cards/clubs/2.png'),
            '3': require('assets/images/minigames/blackjack/cards/clubs/3.png'),
            '4': require('assets/images/minigames/blackjack/cards/clubs/4.png'),
            '5': require('assets/images/minigames/blackjack/cards/clubs/5.png'),
            '6': require('assets/images/minigames/blackjack/cards/clubs/6.png'),
            '7': require('assets/images/minigames/blackjack/cards/clubs/7.png'),
            '8': require('assets/images/minigames/blackjack/cards/clubs/8.png'),
            '9': require('assets/images/minigames/blackjack/cards/clubs/9.png'),
            '10': require('assets/images/minigames/blackjack/cards/clubs/10.png'),
            'J': require('assets/images/minigames/blackjack/cards/clubs/j.png'),
            'Q': require('assets/images/minigames/blackjack/cards/clubs/q.png'),
            'K': require('assets/images/minigames/blackjack/cards/clubs/k.png'),
            'A': require('assets/images/minigames/blackjack/cards/clubs/a.png'),
        },
        spades: {
            '2': require('assets/images/minigames/blackjack/cards/spades/2.png'),
            '3': require('assets/images/minigames/blackjack/cards/spades/3.png'),
            '4': require('assets/images/minigames/blackjack/cards/spades/4.png'),
            '5': require('assets/images/minigames/blackjack/cards/spades/5.png'),
            '6': require('assets/images/minigames/blackjack/cards/spades/6.png'),
            '7': require('assets/images/minigames/blackjack/cards/spades/7.png'),
            '8': require('assets/images/minigames/blackjack/cards/spades/8.png'),
            '9': require('assets/images/minigames/blackjack/cards/spades/9.png'),
            '10': require('assets/images/minigames/blackjack/cards/spades/10.png'),
            'J': require('assets/images/minigames/blackjack/cards/spades/j.png'),
            'Q': require('assets/images/minigames/blackjack/cards/spades/q.png'),
            'K': require('assets/images/minigames/blackjack/cards/spades/k.png'),
            'A': require('assets/images/minigames/blackjack/cards/spades/a.png'),
        },
    };
    
    const reverseCardImage = require('assets/images/minigames/blackjack/cards/reverse_card.png');
    

    useEffect(() => {
        soundsEffects.loadSounds();
    
        return () => {
          soundsEffects.unloadSounds();
        };
      }, []);

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

    const playerHit = async () => {
        await soundsEffects.playSound('cardSound');
        setResetButtonDisabled(true);
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

    const playerStand = async () => {
        setResetButtonDisabled(true);
        setHitButtonDisabled(true);
        setStandButtonDisabled(true);
        let newDeck = [...deck];
        let newDealerCards = [...dealerCards];
    
        // Mostrar la segunda carta del crupier
        setMessage("Crupier voltea su carta");
        setDealerSecondCardVisible(true);
        await soundsEffects.playSound('flipCardSound');
        
        const dealerDrawInterval = setInterval(async() => {
            if (calculateTotal(newDealerCards) < 17) {
                await soundsEffects.playSound('cardSound');
                setMessage("Crupier toma una carta");
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
        setResetButtonDisabled(false);
        setHitButtonDisabled(false);
        setStandButtonDisabled(false);
        setDealerSecondCardVisible(false); // Reiniciar el estado de visibilidad de la segunda carta del crupier
    };

    const getCardImage = (card) => {
        return cardImages[card.suit][card.value];
    };
    

    return (
        <View>
            {gameState === 'betting' && <Bet onBet={handleBet} coins={coins} />}
            {gameState === 'playing' && (
                <View>
                    <View>
                        <GameTitle>Crupier</GameTitle>
                        <View style={stylesBlackjack.cardsContainer}>
                            {dealerCards.map((card, index) => (
                                <View key={index} style={stylesBlackjack.cardContainer}>
                                    <Image
                                        source={dealerSecondCardVisible || index === 0 ? getCardImage(card) : require('assets/images/minigames/blackjack/cards/reverse_card.png')}
                                        style={stylesBlackjack.card}
                                    />
                                </View>
                            ))}
                        </View>
                        <GameText style={!dealerSecondCardVisible ? styles.noVisible : {}}>Total: {calculateTotal(dealerCards)}</GameText>
                    </View>
                    <View>
                        <GameTitle>Jugador</GameTitle>
                        <View style={stylesBlackjack.cardsContainer}>
                            {playerCards.map((card, index) => (
                                <View key={index} style={stylesBlackjack.cardContainer}>
                                    <Image
                                        source={getCardImage(card)}
                                        style={stylesBlackjack.card}
                                    />
                                </View>
                            ))}
                        </View>
                        <GameText>Total: {calculateTotal(playerCards)}</GameText>
                    </View>
                    <View>
                        <GameButton onPress={playerHit} disabled={isHitButtonDisabled}>
                            <TextGameButton>Pedir</TextGameButton>
                        </GameButton>
                        <GameButton onPress={playerStand} disabled={isStandButtonDisabled}>
                            <TextGameButton>Plantarse</TextGameButton>
                        </GameButton>
                        <GameButton onPress={withdraw} disabled={isResetButtonDisabled}>
                            <TextGameButton>Retirarse</TextGameButton>
                        </GameButton>
                    </View>
                </View>
            )}
            {gameState === 'gameOver' && (
                <GameContainer>
                    <Text style={styles.gameOverMessage}>Fin del juego</Text>
                    <GameText>{message}</GameText>
                    <GameText>Balance: {coinsEarned > 0 ? `+${coinsEarned}` : coinsEarned}</GameText>
                    <GameButton onPress={resetGame}><TextGameButton>Reiniciar</TextGameButton></GameButton>
                </GameContainer>
            )}
            {gameState === 'goodEnding' && (
                <GameContainer>
                    <Text style={styles.gameOverMessage}>¡Felicidades!</Text>
                    <GameText>{message}</GameText>
                    <GameText>Balance: {coinsEarned > 0 ? `+${coinsEarned}` : coinsEarned}</GameText>
                    <GameButton onPress={resetGame}><TextGameButton>Reiniciar</TextGameButton></GameButton>
                </GameContainer>
            )}
        </View>
    );    
};

export default Game;
