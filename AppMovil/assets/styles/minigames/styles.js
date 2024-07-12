import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D0130', // Fondo de color similar al contenedor del juego
  },
  balanceBox: {
    fontSize: 16,
    fontFamily: 'PressStart2P',
    color: '#FFFFFF',
    position: 'absolute',
    top: '5%',
    left: '5%',
  },
  noVisible: {
    display: 'none',
  },
  screenShake: {
    animation: 'shake 0.3s linear',
  },
  fadeIn: {
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out',
  },
  fadeOut: {
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
  },
  gameTitle: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P',
    textShadow: '2px 2px #000000',
    margin: '5%',
  },
  gameMessages: {
    whiteSpace: 'break-spaces',
  },
  gameOverMessage: {
    fontSize: 24,
    fontFamily: 'PressStart2P',
    color: '#FF33CC',
    textShadow: '2px 2px #000000',
    margin: 20,
  },
  betLabel: {
    marginBottom: 5,
    color: '#FFFF',
    fontFamily: 'PressStart2P',
  },
  betFormButton: {
    width: 'auto',
  },
  shakeAnimation: {
    // Define shake animation usando keyframes
    '@keyframes shake': {
      '0%': { transform: 'translate(0, 0)' },
      '25%': { transform: 'translate(-5px, 0)' },
      '50%': { transform: 'translate(5px, 0)' },
      '75%': { transform: 'translate(-5px, 0)' },
      '100%': { transform: 'translate(0, 0)' },
    },
  },
});

export { styles };
