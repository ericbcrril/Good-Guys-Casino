import { Audio } from 'expo-av';
const VOLUME = 1.0;

const soundsEffects = {
  gunshotSound: new Audio.Sound(),
  emptyGunshotSound: new Audio.Sound(),
  revolverSpinSound: new Audio.Sound(),
  cardSound: new Audio.Sound(),
  flipCardSound: new Audio.Sound(),

  async loadSounds() {
    try {
      //Ruleta Rusa
      await this.gunshotSound.loadAsync(require('assets/sounds/minigames/roulette/single-gunshot.mp3'));
      await this.emptyGunshotSound.loadAsync(require('assets/sounds/minigames/roulette/empty-gunshot.mp3'));
      await this.revolverSpinSound.loadAsync(require('assets/sounds/minigames/roulette/revolver-spin.mp3'));
      //BlackJack
      await this.cardSound.loadAsync(require('assets/sounds/minigames/blackjack/card-sound.mp3'));
      await this.flipCardSound.loadAsync(require('assets/sounds/minigames/blackjack/flipcard.mp3'));
    } catch (error) {
      console.log('Error loading sounds:', error);
    }
  },

  async playSound(soundName, duration = null) {
    try {
      const sound = this[soundName];
      if (!sound) {
        console.log(`Sound ${soundName} not found`);
        return;
      }

      await sound.setVolumeAsync(VOLUME);

      if (duration !== null) {
        await sound.setPositionAsync(0); // Reset sound position to start
        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isPlaying && status.positionMillis >= duration) {
            await sound.stopAsync();
          }
        });
        await sound.playAsync();
      } else {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.replayAsync();
        } else {
          console.log(`Sound ${soundName} is not loaded properly`);
        }
      }
    } catch (error) {
      console.log(`Error playing sound ${soundName}:`, error);
    }
  },

  async unloadSounds() {
    try {
      await this.gunshotSound.unloadAsync();
      await this.emptyGunshotSound.unloadAsync();
      await this.revolverSpinSound.unloadAsync();
    } catch (error) {
      console.log('Error unloading sounds:', error);
    }
  },
};

export default soundsEffects;
