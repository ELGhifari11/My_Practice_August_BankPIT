import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Color1 from '../../assets/colors/Color1';

const OnboardingItems = ({item}: any) => {
  const {width} = useWindowDimensions();
  const {height} = Dimensions.get('screen');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />

      <View style={{flex: 0.4, justifyContent: 'flex-end', bottom: 75}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItems;

const styles = StyleSheet.create({
  image: {
    flex: 0.4,
    top: 50,
    justifyContent: 'center',
  },
  title: {
    color: Color1.myGreenLight,
    fontWeight: '800',
    fontSize: 35,
    textAlign: 'center',
  },
  description: {
    color: 'black',
    fontWeight: '400',
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
  },
});
