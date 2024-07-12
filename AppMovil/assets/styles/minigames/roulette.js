import { StyleSheet } from 'react-native';

const stylesRoulette = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%', // Utiliza dimensiones absolutas en lugar de vh
    overflow: 'hidden',
    backgroundColor: '#2D0130',
  },
  gameActions: {
    display: 'flex',
    position: 'absolute',
    alignSelf: 'center',
    top: 180,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  statusBarItem: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthBarBackground: {
    width: '100%', // Ajusta según sea necesario
    height: '38%', // Ajusta según sea necesario
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
    position: 'relative',
  },
  healthBar: {
    height: '100%',
    backgroundColor: '#FF3333',
  },
  healthText: {
    position: 'absolute',
    top: 4,
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'PressStart2P',
  },
  containerMessages: {
    borderWidth: 4,
    borderColor: '#000',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  containerMessagesText: {
    fontSize: 12,
    fontFamily: 'PressStart2P',
    color: '#000',
  },
});

export { stylesRoulette };
