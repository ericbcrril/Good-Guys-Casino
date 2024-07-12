import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, PanResponder, Easing, ImageBackground, Image } from 'react-native';
import RouletteItem from './RouletteItem';
//import styles from "../assets/styles/casinoRoulette";
import Spinner from '../../packages/components/src/native-base-theme/components/Spinner';



export default function Roulette() {
    return(
      <View style={styles.container}>
        <Text>This is gon' be the roulette</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});