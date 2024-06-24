import { Howl } from 'howler';

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