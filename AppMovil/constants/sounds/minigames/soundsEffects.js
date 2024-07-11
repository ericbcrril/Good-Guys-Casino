import { Audio } from 'expo-av';

const useSound = (file) => {
  const [sound, setSound] = useState();

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        file
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Descargar el sonido al desmontar el componente
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  return playSound;
};

// Definir los sonidos
const useGunshotSound = useSound(require('assets/sounds/minigames/roulette/single-gunshot.mp3'));
const useEmptyGunshotSound = useSound(require('assets/sounds/minigames/roulette/empty-gunshot.mp3'));
const useRevolverSpinSound = useSound(require('assets/sounds/minigames/roulette/revolver-spin.mp3'));

const useCardDealSound = useSound(require('assets/sounds/minigames/blackjack/card-mixing.mp3'));
const useCardSound = useSound(require('assets/sounds/minigames/blackjack/card-sound.mp3'));
const useFlipCardSound = useSound(require('assets/sounds/minigames/blackjack/flipcard.mp3'));

export { useGunshotSound, useEmptyGunshotSound, useRevolverSpinSound, useCardDealSound, useCardSound, useFlipCardSound };
