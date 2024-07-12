import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//Componentes
import {  } from 'components/minigames/roulette/components';
//Estilos
import { stylesRoulette } from 'assets/styles/minigames/roulette';
import { styles } from 'assets/styles/minigames/styles';

const StatusBar = ({ health, coins }) => {
  const healthPercentage = (health / 100) * 100; // Asumiendo que la salud es un valor entre 0 y 100

  return (
    <View style={stylesRoulette.statusBar}>
      <View style={stylesRoulette.statusBarItem}>
        <View style={stylesRoulette.healthBarBackground}>
          <View style={[stylesRoulette.healthBar, { width: `${healthPercentage}%` }]} />
          <Text style={stylesRoulette.healthText}>Salud: {health}</Text>
        </View>
      </View>
    </View>
  );
};

export default StatusBar;
