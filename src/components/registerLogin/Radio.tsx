import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import Color1 from '../../assets/colors/Color1';

const Radio = () => {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1',
        kelamin: 'Pria',
        borderColor: Color1.myGreen,
        color: Color1.myGreen,
      },
      {
        id: '2',
        kelamin: 'Wanita',
        borderColor: Color1.myGreen,
        color: Color1.myGreen,
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();
  return (
    <View style={styles.container}>
      <RadioGroup
        containerStyle={styles.containerstyle}
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
        layout="row"
      />
      <Text style={{color: 'black', fontSize: 17, right: '510%'}}>Pria</Text>
      <Text style={{color: 'black', fontSize: 17, right: '95%'}}>Wanita</Text>
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: '3%',
    left: '-4%',
  },
  containerstyle: {
    gap: 130,
  },
});
