import { Howl } from 'howler';

//Ruleta Rusa
const gunshotSound = new Howl({
    src: ['/sounds/minigames/roulette/single-gunshot.mp3'],
  });

const emptyGunshotSound = new Howl({
    src: ['/sounds/minigames/roulette/empty-gunshot.mp3'],
  });

const revolverSpinSound = new Howl({
    src: ['/sounds/minigames/roulette/revolver-spin.mp3'],
  });

export {gunshotSound, emptyGunshotSound, revolverSpinSound};

//BlackJack
const cardDealSound = new Howl({
    src: ['/sounds/minigames/blackjack/card-mixing.mp3'],
});

const cardSound = new Howl({
  src: ['/sounds/minigames/blackjack/card-sound.mp3'],
});

const flipCard = new Howl({
  src: ['/sounds/minigames/blackjack/flipcard.mp3'],
});

export { cardDealSound, cardSound, flipCard };