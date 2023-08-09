import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useState} from 'react';
import Color1 from '../../assets/colors/Color1';
import {dataKota, dataProvinsi} from './dataKota';

const Dropdowncomponent = () => {
  const [value, setValue] = useState('');
  const [isKotaFocus, setIsKotaFocus] = useState(false);
  const [isProvinsiFocus, setIsProvinsiFocus] = useState(false);

  // const handleOnchange = (text: any, input: any) => {
  //   if (input === 'Kota') setValue(text);
  //   console.log(`${input} : ${text}`);
  // };

  return (
    <View style={styles.container1}>
      <Text
        style={{
          color: 'black',
          fontSize: 15,
          fontWeight: '400',
          top: '-2%',
          alignSelf: 'center',
        }}>
        Masukkan sesuai dengan kartu identitas anda
      </Text>
      <Dropdown
        style={[styles.dropdown, isKotaFocus && {borderColor: Color1.myGreen}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={dataKota}
        itemTextStyle={styles.text}
        activeColor={Color1.myGreen}
        itemContainerStyle={styles.texts}
        containerStyle={styles.containerstyle}
        iconColor="black"
        labelField="value"
        valueField="key"
        placeholder={'Kota'}
        onFocus={() => setIsKotaFocus(true)}
        onBlur={() => setIsKotaFocus(false)}
        onChange={_item => {
          setIsKotaFocus(false);
          setValue;
        }}
      />
      <Dropdown
        style={[
          styles.dropdown,
          isProvinsiFocus && {borderColor: Color1.myGreen},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={dataProvinsi}
        itemTextStyle={styles.text}
        activeColor={Color1.myGreen}
        itemContainerStyle={styles.texts}
        containerStyle={styles.containerstyle}
        iconColor="black"
        labelField="value"
        valueField="key"
        placeholder={'Provinsi'}
        value={value}
        onFocus={() => setIsProvinsiFocus(true)}
        onBlur={() => setIsProvinsiFocus(false)}
        onChange={item => {
          setIsProvinsiFocus(false);
        }}
      />
    </View>
  );
};

export default Dropdowncomponent;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    padding: '4%',
  },
  dropdown: {
    height: 60,
    width: '108%',
    borderColor: Color1.myYellow,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'transparent',

    elevation: 5,
  },
  placeholderStyle: {
    fontSize: 17,
    color: Color1.myAbu,
    left: '20%',
  },
  selectedTextStyle: {
    fontSize: 17,
    color: 'black',
    left: '20%',
  },

  text: {
    color: 'black',
    fontSize: 17,
  },
  texts: {
    backgroundColor: 'white',
    width: '90%',
    left: '2%',
  },
  containerstyle: {
    backgroundColor: 'white',
    marginEnd: 25,
    marginBottom: 25,

    borderRadius: 10,
  },
});
