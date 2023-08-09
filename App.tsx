import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useState, useEffect} from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';
import Router from './src/router/Router';

const App = () => {
  return (
    <View style={styles.container}>
      <Router />
      <StatusBar backgroundColor={'transparent'} translucent />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
