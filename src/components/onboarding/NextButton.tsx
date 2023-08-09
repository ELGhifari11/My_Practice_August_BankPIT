import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../router/Router';
import Color1 from '../../assets/colors/Color1';
import LinearGradient from 'react-native-linear-gradient';

interface NextButtonProps {
  scrollTo: any;
}

const NextButton: React.FC<NextButtonProps> = ({scrollTo}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.ButtonBox}>
      <TouchableOpacity
        style={{position: 'absolute', left: 110, bottom: 100}}
        activeOpacity={0.5}
        onPress={scrollTo}>
        <Image
          source={require('../../assets/images/next.png')}
          style={{height: 105, width: 105}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Register')}>
        <LinearGradient
          colors={['#70D066', '#119EA8']}
          style={styles.ButtonDaftar}>
          <Text style={styles.TextButtonDaftar}>Daftar Sekarang</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButtonLogin} activeOpacity={0.5}>
        <Text style={styles.TextButtonLogin}>Sudah Punya Akun</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  ButtonBox: {
    top: -45,
  },

  ButtonDaftar: {
    backgroundColor: Color1.myGreenLight,
    height: 50,
    width: 327,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  TextButtonDaftar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  ButtonLogin: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Color1.myBankGreen,
    height: 50,
    width: 327,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  TextButtonLogin: {
    color: Color1.myBankGreen,
    fontSize: 16,
    fontWeight: '600',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
