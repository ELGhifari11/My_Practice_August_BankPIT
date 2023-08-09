import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../router/Router';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color1 from '../assets/colors/Color1';
import Loading from './../assets/svg/loadingio.svg';

const Splash = () => {
  const {width} = useWindowDimensions();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Image
        source={require('../assets/images/white.gif')}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <Image
        source={require('../assets/images/loadgif.gif')}
        style={{position: 'absolute', height: 40, width: 70, bottom: 130}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    flex: 0.15,
    top: -20,
    justifyContent: 'center',
  },
});
