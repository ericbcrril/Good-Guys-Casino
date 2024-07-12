import { StyleSheet } from 'react-native';

const stylesBlackjack = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,74,23)',
    backgroundImage: 'linear-gradient(90deg, rgba(0,74,23,1) 0%, rgba(0,125,39,1) 50%, rgba(0,74,23,1) 100%)',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row', // Necesario para el wrapping de flex
    justifyContent: 'center', 
  },
  card: {
    width: 80,
    height: 118,
  },
  cardContainer: {
    position: 'relative',
    marginLeft: -70,
    margin: 20,
    display: 'inline-block',
  },
  cardImage: {
    display: 'block',
  },
});

export { stylesBlackjack };
