import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//Componentes
import { GameContainer, ButtonText, GameButton, TextGameButton, GameTextInput, GameTitle, ResetButton } from 'components/minigames/components';
//Estilos
import { styles } from 'assets/styles/minigames/styles';

const GunSelection = ({ onSelectGun }) => {
  const [numShots, setNumShots] = useState(1);
  const guns = [
    { name: 'Revólver 1', damage: 25, multiplier: 1 },
    { name: 'Revólver 2', damage: 50, multiplier: 10 },
    { name: 'Revólver 3', damage: 100, multiplier: 100 },
  ];

  return (
    <GameContainer>
      <Text style={styles.betLabel}>Cantidad de Balas:</Text>
      <GameTextInput
        keyboardType="numeric"
        value={numShots.toString()}
        onChangeText={(value) => setNumShots(Number(value))}
      />
      {guns.map((gun, index) => (
        <View key={index} >
          <GameButton onPress={() => onSelectGun(gun, numShots)}>
            <TextGameButton>{gun.name}</TextGameButton>
          </GameButton>
        </View>
      ))}
    </GameContainer>
  );
};

export default GunSelection;
