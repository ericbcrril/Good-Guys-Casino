import Sound from 'react-native-sound';

// Ruleta Rusa
const gunshotSound = new Sound('single-gunshot.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Error al cargar el sonido', error);
  }
});

const emptyGunshotSound = new Sound('empty-gunshot.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Error al cargar el sonido', error);
  }
});

const revolverSpinSound = new Sound('revolver-spin.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Error al cargar el sonido', error);
  }
});

export { gunshotSound, emptyGunshotSound, revolverSpinSound };

// BlackJack
const cardDealSound = new Sound('card-mixing.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Error al cargar el sonido', error);
  }
});

const cardSound = new Sound('card-sound.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Error al cargar el sonido', error);
  }
});

const flipCard = new Sound('flipcard.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Error al cargar el sonido', error);
  }
});

export { cardDealSound, cardSound, flipCard };
