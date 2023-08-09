import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Touchable,
  TouchableWithoutFeedbackComponent,
  TouchableNativeFeedbackComponent,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Color1 from '../assets/colors/Color1';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router/Router';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-element-textinput';
import Dropdowncomponent from '../components/registerLogin/DropdownItems';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import {dataKota} from '../components/registerLogin/dataKota';
import {dataProvinsi} from '../components/registerLogin/dataProvinsi';
import {ActivityIndicator, Modal} from 'react-native-paper';
import X from '../assets/svg/xicon.svg';
import Logo from '../assets/svg/bplogo2.svg';
import LinearGradient from 'react-native-linear-gradient';
import {err} from 'react-native-svg/lib/typescript/xml';

const Register = () => {
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [noHp, setNoHp] = useState('');
  const [tempatLahir, setTempatlahir] = useState('');
  const [tanggal, setTanggal] = useState<any | undefined>();
  const [bulan, setBulan] = useState<any | undefined>();
  const [tahun, setTahun] = useState('');
  const [alamatLengkap, setAlamatLengkap] = useState('');
  const [kota, setKota] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [isKotaFocus, setIsKotaFocus] = useState(false);
  const [isProvinsiFocus, setIsProvinsiFocus] = useState(false);
  const [dataGender, setDataGender] = useState('');
  const [inputSelected, setInputSelected] = useState(false);
  const [inputSelected1, setInputSelected1] = useState(false);
  const [inputSelected2, setInputSelected2] = useState(false);
  const [inputSelected3, setInputSelected3] = useState(false);
  const [inputSelected4, setInputSelected4] = useState(false);
  const [inputSelected5, setInputSelected5] = useState(false);
  const [inputSelected6, setInputSelected6] = useState(false);
  const [inputSelected7, setInputSelected7] = useState(false);
  const [buttonColor, setButtonColor] = useState(false);
  const [propsButton, setPropsButton] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [userDataRg, setUserDataRg] = useState({
    nama: '',
    gender: '',
    no_Telepon: '',
    tempat_Tanggal_Lahir: '',
    Alamat_Tinggal: '',
  });
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'Pria',
        label: '                ',

        borderColor: Color1.myGreenLight,
        color: Color1.myBankGreen,
        size: 25,
      },
      {
        id: 'Wanita',
        label: '                    ',
        borderColor: Color1.myGreenLight,
        color: Color1.myBankGreen,
        size: 25,
      },
    ],
    [],
  );

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const activityButton = () => {
    setPropsButton(true);
    const timer = setTimeout(() => {
      setPropsButton(false);
    }, 1000);
  };

  // const handleOnChangeText = (text: any, valueFor: any) => {
  //   if (valueFor === 'kota') setKota(text);
  //   if (valueFor === 'provinsi') setProvinsi(text);
  //   if (valueFor === 'alamat lengkap') setAlamatLengkap(text);
  // };

  const validate = () => {
    Keyboard.dismiss();
    activityButton();

    if (
      !namaDepan &&
      !namaBelakang &&
      !dataGender &&
      !noHp &&
      !tempatLahir &&
      !tanggal &&
      !bulan &&
      !tahun &&
      !kota &&
      !provinsi &&
      !alamatLengkap
    )
      return Alert.alert('Opps !', 'Anda belum mengisi form registrasi');

    if (!namaDepan) {
      return Alert.alert('Opps !', 'Nama depan anda belum di isi !');
    } else if (namaDepan.length < 2) {
      return Alert.alert('Opps !', 'Isi nama minimal 2 karakter');
    } else if (!namaBelakang) {
      return Alert.alert('Opps !', 'Nama belakang anda belum di isi !');
    } else if (namaBelakang.length < 2) {
      return Alert.alert('Opps !', 'Isi nama minimal 2 karakter');
    } else if (!dataGender) {
      return Alert.alert('Opps !', 'Gender anda belum di pilih !');
    } else if (!noHp) {
      return Alert.alert('Opps !', 'No telepon anda belum di isi !');
    } else if (noHp.length < 10) {
      return Alert.alert('Opps !', 'Pastikan no telepon anda sesuai');
    } else if (!tempatLahir) {
      return Alert.alert('Opps !', 'Tempat lahir anda belum di isi !');
    } else if (!tahun || !bulan || !tanggal) {
      return Alert.alert('Opps !', 'Tanggal lahir anda belum di isi !');
    } else if (
      tanggal.length > 2 ||
      bulan.length > 2 ||
      tanggal > 31 ||
      bulan > 12
    ) {
      return Alert.alert('Opps !', 'Tanggal tidak valid');
    } else {
      const birthdateString = `${tahun}-${bulan}-${tanggal}`;
      const userBirthdate = new Date(birthdateString);
      const waktuTerkini = new Date();

      if (
        userBirthdate.getFullYear() > waktuTerkini.getFullYear() ||
        userBirthdate.getFullYear() < waktuTerkini.getFullYear() - 100 ||
        userBirthdate.getFullYear() >= waktuTerkini.getFullYear() - 15
      ) {
        return Alert.alert(
          'Opps !',
          'Pastikan anda mengisi dengan benar dan tidak melanggar syarat dan ketentuan kami',
        );
      }
    }

    if (!kota) {
      return Alert.alert('Opps !', 'Kota belum di pilih !');
    } else if (!provinsi) {
      return Alert.alert('Opps !', 'provinsi belum di pilih !');
    } else if (!alamatLengkap) {
      return Alert.alert('Opps !', 'Alamat lengkap anda belum di isi !');
    } else if (alamatLengkap.length < 20) {
      return Alert.alert('Opps !', 'Isi alamat dengan lengkap dan sesuai !');
    } else {
      return register();
    }
  };

  // const handleError = (error: any, input: string) => {
  //   setErrors(prevState => ({...prevState, [input]: error}));
  // };

  // const handleOnchange = (text: any, input: any) => {
  //   if (input === 'Nama Depan') setNamaDepan(text);
  //   if (input === 'Nama Belakang') setNamaBelakang(text);
  //   if (input === 'Nomor Telepon') setNoHp(text);
  //   if (input === 'Tempat Lahir') setTempatlahir(text);
  //   if (input === 'Tanggal') setTanggal(text);
  //   if (input === 'Bulan') setBulan(text);
  //   if (input === 'Tahun') setTahun(text);
  //   if (input === 'Alamat Lengkap') setAlamatLengkap(text);
  //   if (input === 'Kota') setKota(text);
  //   console.log(`${input} : ${text}`);
  // };

  const register = () => {
    // setLoading(true);
    handleModalClose();

    const dataUser: any = [
      ` Nama Depan : ${namaDepan} `,
      ` Nama Belakang : ${namaBelakang} `,
      ` Jenis Kelamin : ${dataGender} `,
      ` Nomor Telepon : ${noHp} `,
      ` Tempat Lahir : ${tempatLahir} `,
      ` Tanggal : ${tanggal} `,
      ` Bulan : ${bulan} `,
      ` Tahun: ${tahun} `,
      ` Kota: ${kota} `,
      ` Provinsi: ${provinsi} `,
      ` Alamat Lengkap: ${alamatLengkap} `,
    ];

    setUserDataRg({
      nama: `${namaDepan} ${namaBelakang}`,
      gender: dataGender,
      no_Telepon: noHp,
      tempat_Tanggal_Lahir: `${tempatLahir} - ${tanggal} - ${bulan} - ${tahun}`,
      Alamat_Tinggal: `${kota} - ${provinsi} - ( ${alamatLengkap} )`,
    });

    setObjectValue(userDataRg);

    console.log(dataUser);

    activityButton();

    setNamaDepan('');
    setNamaBelakang('');
    setDataGender('');
    setNoHp('');
    setTempatlahir('');
    setTanggal('');
    setBulan('');
    setTahun('');
    setKota('');
    setProvinsi('');
    setAlamatLengkap('');
  };

  const setObjectValue = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userData1', jsonValue);
      console.log(jsonValue);
    } catch (e) {
      Alert.alert('Error');
    }

    Alert.alert('Registrasi berhasil');
    console.log('Done.');
    // navigation.navigate('DaftarAkun');
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />
      <LinearGradient
        colors={['#70D066', '#119EA8']}
        style={{
          borderBottomRightRadius: 70,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
            borderRadius: 20,
            marginLeft: 30,
            marginTop: 70,
            marginBottom: 20,
          }}>
          <Logo height={40} width={100} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
              marginLeft: 30,
              marginTop: 10,
            }}>
            REGISTER
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <X width={15} height={15} style={{marginLeft: 90, marginTop: 16}} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />

          <Text
            style={{
              color: Color1.myGreenLight,
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: '-48%',
            }}>
            Informasi Pribadi
          </Text>
          {/* ////////////////////////////////////////////////////////////////////////////// */}

          <TextInput
            clearButtonMode="while-editing"
            autoCapitalize="none"
            showIcon={false}
            focusColor={Color1.myBankGreen}
            onChangeText={setNamaDepan}
            value={namaDepan}
            onFocus={() => setInputSelected(true)}
            onBlur={() => setInputSelected(false)}
            autoFocus
            //
            inputStyle={{
              fontSize: 16,
              color: 'black',
            }}
            labelStyle={{
              fontSize: 12,
              color: 'black',
            }}
            label="Nama Depan" //////////////////////////////////////////////////////////////////////                         NAMA DEPAN
            placeholderStyle={{
              fontSize: 16,
              color: Color1.myAbuLight,
            }}
            style={[
              styles.inputStyle,
              {
                borderColor: inputSelected ? Color1.myBankGreen : Color1.myAbu,
                borderWidth: inputSelected ? 1 : 0.4,
              },
            ]}
          />
          {/* /////////////////////////////////////////////////////////////////////// */}

          <TextInput
            onFocus={() => setInputSelected1(true)}
            onBlur={() => setInputSelected1(false)}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            showIcon={false}
            focusColor={Color1.myBankGreen}
            onChangeText={setNamaBelakang}
            value={namaBelakang}
            inputStyle={{
              fontSize: 16,
              color: 'black',
            }}
            labelStyle={{
              fontSize: 12,
              color: 'black',
            }}
            label="Nama Belakang" //////////////////////////////////////////////////////        NAMA Belakang
            placeholderStyle={{
              fontSize: 16,
              color: Color1.myAbuLight,
            }}
            style={[
              styles.inputStyle,
              {
                borderColor: inputSelected1 ? Color1.myBankGreen : Color1.myAbu,
                borderWidth: inputSelected1 ? 1 : 0.4,
              },
            ]}
          />
          {/* //////////////////////////////////////////////////////////////////////               RADIO BUTTON  */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <RadioGroup
              containerStyle={{
                marginTop: 12,
                marginLeft: 20,
                position: 'relative',
              }}
              radioButtons={radioButtons}
              onPress={setDataGender}
              key={dataGender}
              selectedId={dataGender}
              layout="row"
            />

            <Text
              style={{
                fontSize: 15,
                position: 'absolute',
                top: 22,
                left: 65,
                color: 'black',
                fontWeight: '300',
              }}>
              {' '}
              PRIA{' '}
            </Text>
            <Text
              style={{
                fontSize: 15,
                position: 'absolute',
                top: 12,
                left: 185,
                color: 'black',
                marginTop: 10,
                fontWeight: '300',
              }}>
              WANITA
            </Text>
          </View>
          {/* ///////////////////////////////////////////////////////////////////////// */}

          <TextInput
            onFocus={() => setInputSelected2(true)}
            onBlur={() => setInputSelected2(false)}
            clearButtonMode="while-editing"
            showIcon={false}
            focusColor={Color1.myBankGreen}
            inputStyle={{
              fontSize: 16,
              color: 'black',
            }}
            labelStyle={{
              fontSize: 12,
              color: 'black',
            }}
            label="Nomor Telepon" ////////////////////////////////////////////////////////////////////         NOMOR TELEPHONE
            onChangeText={setNoHp}
            value={noHp}
            placeholderStyle={{
              fontSize: 16,
              color: Color1.myAbuLight,
            }}
            keyboardType="numeric"
            placeholderTextColor={Color1.myGreen}
            style={[
              styles.inputStyle,
              {
                borderColor: inputSelected2 ? Color1.myBankGreen : Color1.myAbu,
                borderWidth: inputSelected2 ? 1 : 0.4,
              },
            ]}
          />

          {/* ------------------------------------------------------------------------- */}

          <Text
            style={{
              color: Color1.myGreenLight,
              fontSize: 24,
              fontWeight: 'bold',

              marginTop: '5%',
            }}>
            Tempat Tanggal Lahir
          </Text>

          {/*/////////////////////////////////////////////////////////////////////////  */}

          <TextInput
            onFocus={() => setInputSelected3(true)}
            onBlur={() => setInputSelected3(false)}
            clearButtonMode="while-editing"
            showIcon={false}
            focusColor={Color1.myBankGreen}
            inputStyle={{
              fontSize: 16,
              color: 'black',
            }}
            labelStyle={{
              fontSize: 12,
              color: 'black',
            }}
            label="Tempat Lahir" ///////////////////////////////////////////////////////////////////////           TEMPAT LAHIR
            onChangeText={setTempatlahir}
            value={tempatLahir}
            placeholderStyle={{
              fontSize: 16,
              color: Color1.myAbuLight,
            }}
            placeholderTextColor={'black'}
            style={[
              styles.inputStyle,
              {
                borderColor: inputSelected3 ? Color1.myBankGreen : Color1.myAbu,
                borderWidth: inputSelected3 ? 1 : 0.4,
              },
            ]}
          />

          {/* /////////////////////////////////////////////////////////////////////////// */}

          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            {/* //////////////////////////////////////////////////////////////////////////// */}

            <TextInput
              onFocus={() => setInputSelected4(true)}
              onBlur={() => setInputSelected4(false)}
              clearButtonMode="while-editing"
              showIcon={false}
              focusColor={Color1.myBankGreen}
              inputStyle={{
                fontSize: 16,
                color: 'black',
              }}
              labelStyle={{
                fontSize: 12,
                color: 'black',
              }}
              label="Tanggal" ////////////////////////////////////////////    TANGGAL
              onChangeText={setTanggal}
              value={tanggal}
              placeholderStyle={{
                fontSize: 16,
                color: Color1.myAbuLight,
              }}
              keyboardType="numeric"
              placeholderTextColor={'black'}
              style={[
                styles.inputTanggal,
                {
                  borderColor: inputSelected4
                    ? Color1.myBankGreen
                    : Color1.myAbu,
                  borderWidth: inputSelected4 ? 1 : 0.4,
                },
              ]}
            />

            {/* ///////////////////////////////////////////////////////////////////////// */}

            <TextInput
              onFocus={() => setInputSelected5(true)}
              onBlur={() => setInputSelected5(false)}
              clearButtonMode="while-editing"
              showIcon={false}
              focusColor={Color1.myBankGreen}
              inputStyle={{
                fontSize: 16,
                color: 'black',
              }}
              labelStyle={{
                fontSize: 12,
                color: 'black',
              }}
              label="Bulan" /////////////////////////////////////////////////////                   BULAN
              onChangeText={setBulan}
              value={bulan}
              placeholderStyle={{
                fontSize: 16,
                color: Color1.myAbuLight,
              }}
              keyboardType="numeric"
              placeholderTextColor={'black'}
              style={[
                styles.inputTanggal,
                {
                  borderColor: inputSelected5
                    ? Color1.myBankGreen
                    : Color1.myAbu,
                  borderWidth: inputSelected5 ? 1 : 0.4,
                },
              ]}
            />

            {/* /////////////////////////////////////////////////////////////////////////// */}
          </View>

          {/* ///////////////////////////////////////////////////////////////////////////// */}

          <TextInput
            onFocus={() => setInputSelected6(true)}
            onBlur={() => setInputSelected6(false)}
            clearButtonMode="while-editing"
            showIcon={false}
            focusColor={Color1.myBankGreen}
            inputStyle={{
              fontSize: 16,
              color: 'black',
            }}
            labelStyle={{
              fontSize: 12,
              color: 'black',
            }}
            label="Tahun" ///////////////////////////////////////////////////////                           TAHUN
            onChangeText={setTahun}
            value={tahun}
            placeholderStyle={{
              fontSize: 16,
              color: Color1.myAbuLight,
            }}
            keyboardType="numeric"
            placeholderTextColor={'black'}
            style={[
              styles.inputStyle,
              {
                borderColor: inputSelected6 ? Color1.myBankGreen : Color1.myAbu,
                borderWidth: inputSelected6 ? 1 : 0.4,
              },
            ]}
          />

          {/* /////////////////////////////////////////////////////////////////////// */}

          <View style={{flex: 1}}>
            <Text
              style={{
                color: Color1.myGreenLight,
                fontSize: 24,
                fontWeight: 'bold',
                top: '9%',
                alignSelf: 'center',
              }}>
              Alamat Tinggal
            </Text>

            {/* ////////////////////////////////////////////////////////////////////////////////////////////*/}

            <View style={{top: '6%'}}>
              {/* //////////////////////////////////////////////////// */}

              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '400',
                  marginTop: 15,

                  alignSelf: 'center',
                }}>
                Masukkan sesuai dengan kartu identitas anda
              </Text>

              {/* //////////////////////////////////////////////////// */}

              <TextInput
                onFocus={() => setIsKotaFocus(true)}
                onBlur={() => setIsKotaFocus(false)}
                clearButtonMode="while-editing"
                showIcon={false}
                focusColor={Color1.myBankGreen}
                inputStyle={{
                  fontSize: 16,
                  color: 'black',
                }}
                labelStyle={{
                  fontSize: 12,
                  color: 'black',
                }}
                label="Kota" ///////////////////////////////////////////////////////                    Kota
                onChangeText={setKota}
                value={kota}
                placeholderStyle={{
                  fontSize: 16,
                  color: Color1.myAbuLight,
                }}
                keyboardType="numeric"
                placeholderTextColor={'black'}
                style={[
                  styles.boxStyleSelectList,
                  {
                    borderColor: isKotaFocus
                      ? Color1.myBankGreen
                      : Color1.myAbu,
                    borderWidth: isKotaFocus ? 1 : 0.4,
                  },
                ]}
              />
              {/* ////////////////////////////////////////////////////////////////////////////////// */}

              <TextInput
                onFocus={() => setIsProvinsiFocus(true)}
                onBlur={() => setIsProvinsiFocus(false)}
                clearButtonMode="while-editing"
                showIcon={false}
                focusColor={Color1.myBankGreen}
                inputStyle={{
                  fontSize: 16,
                  color: 'black',
                }}
                labelStyle={{
                  fontSize: 12,
                  color: 'black',
                }}
                label="Provinsi" ///////////////////////////////////////////////////////                         PROVINSI
                onChangeText={setProvinsi}
                value={provinsi}
                placeholderStyle={{
                  fontSize: 16,
                  color: Color1.myAbuLight,
                }}
                keyboardType="numeric"
                placeholderTextColor={'black'}
                style={[
                  styles.boxStyleSelectList,
                  {
                    borderColor: isProvinsiFocus
                      ? Color1.myBankGreen
                      : Color1.myAbu,
                    borderWidth: isProvinsiFocus ? 1 : 0.4,
                  },
                ]}
              />
              {/* ///////////////////////////////////////////////////////////////////////////////// */}
            </View>

            {/* -//////////////////////////////////////////////////////////////////////////////////////////// */}

            <TextInput
              onFocus={() => setInputSelected7(true)}
              onBlur={() => setInputSelected7(false)}
              clearButtonMode="while-editing"
              showIcon={false}
              focusColor={Color1.myBankGreen}
              inputStyle={{
                fontSize: 16,
                color: 'black',
              }}
              labelStyle={{
                fontSize: 12,
                color: 'black',
              }}
              label="Alamat Lengkap" ///////////////////////////////////////////////////////////////////////           ALAMAT LENGKAP
              onChangeText={setAlamatLengkap}
              value={alamatLengkap}
              placeholderStyle={{
                fontSize: 16,
                color: Color1.myAbuLight,
              }}
              placeholderTextColor={'black'}
              style={[
                styles.alamatLengkap,
                {
                  borderColor: inputSelected7
                    ? Color1.myBankGreen
                    : Color1.myAbu,
                  borderWidth: inputSelected7 ? 1 : 0.4,
                },
              ]}
            />
          </View>

          {/* ////////////////////////////////////////////////////////////////////// */}

          {/* //////////////////////////////////////////////////////////////////////////// */}
        </View>

        <TouchableOpacity onPress={() => validate()} activeOpacity={0.5}>
          <LinearGradient
            colors={['#70D066', '#119EA8']}
            style={styles.TouchableButton}>
            <Text
              style={{
                color: 'white', ////////////////////////////////////////////////////////////                     TEXT BUTTON
                fontSize: 20,
                fontWeight: '500',
              }}>
              {propsButton ? (
                <ActivityIndicator color="white" size={'small'} />
              ) : (
                'Lanjutkan'
              )}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    marginTop: '55%',
    marginBottom: '20%',
    backgroundColor: 'white',
  },
  inputStyle: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    borderRadius: 5,
    borderWidth: 0.4,
    width: '90%',
    height: 60,
    marginTop: '3%',
  },

  inputTanggal: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    borderRadius: 5,
    borderWidth: 0.4,
    width: '44%',
    height: 60,
    marginTop: '3%',
  },
  boxStyleSelectList: {
    backgroundColor: 'white',
    borderColor: Color1.myAbu,
    paddingHorizontal: '4%',
    borderRadius: 5,
    borderWidth: 0.4,
    height: 60,
    marginTop: '4%',
  },
  alamatLengkap: {
    paddingHorizontal: '4%',
    borderRadius: 5,
    borderWidth: 0.4,
    width: '90%',
    height: 60,
    marginTop: -20,
    top: 50,
    marginLeft: 2,

    backgroundColor: 'white',
  },
  TouchableButton: {
    width: 360,
    height: 55,

    borderRadius: 25,

    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: -10,
  },
});
