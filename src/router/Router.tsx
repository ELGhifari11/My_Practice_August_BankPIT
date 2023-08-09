import {Animated, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Onboarding from '../screens/Onboarding';
import Splash from '../screens/Splash';
import Register from '../screens/Register';
import Color1 from '../assets/colors/Color1';
import DaftarAkun from '../components/registerLogin/DaftarAkun';

export type RootStackParams = {
  Splash: undefined;
  Home: undefined;
  Onboarding: undefined;
  Register: undefined;
  DaftarAkun: undefined;
};

const stack = createNativeStackNavigator();

const Router = () => {
  // const [loading, setLoading] = useState(true);
  // const [viewOnboarding, setViewOnboarding] = useState(false);

  // const checkOnboarding = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@viewOnboarding');

  //     if (value !== null) {
  //       setViewOnboarding(true);
  //     }
  //   } catch (error) {
  //     console.log('Error @checkOnboarding :', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   checkOnboarding();
  // }, []);

  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen
          name="Splash"
          component={Splash}
          options={{freezeOnBlur: true, animation: 'fade'}}
        />
        <stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            freezeOnBlur: false,
            animationTypeForReplace: 'pop',
            animation: 'fade',
          }}
        />
        <stack.Screen
          name="Register"
          component={Register}
          options={{
            freezeOnBlur: false,
            animationTypeForReplace: 'pop',
            animation: 'fade_from_bottom',
            // headerShown: true,
          }}
        />
        <stack.Screen
          name="DaftarAkun"
          component={DaftarAkun}
          options={{
            freezeOnBlur: false,
            animationTypeForReplace: 'pop',
            animation: 'slide_from_left',
            // headerShown: true,
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
