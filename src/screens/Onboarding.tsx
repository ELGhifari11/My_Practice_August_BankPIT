import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Animated,
  StatusBar,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import {ViewToken} from 'react-native';
import React from 'react';
import Slide from '../components/onboarding/Slide';
import OnboardingItems from '../components/onboarding/OnboardingItems';
import Paginator from '../components/onboarding/Paginator';
import NextButton from '../components/onboarding/NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color1 from '../assets/colors/Color1';

const Onboarding = () => {
  const {height} = Dimensions.get('screen');

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef<FlatList<any>>(null);

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const index = viewableItems[0]?.index ?? 0; // Gunakan operator ?? untuk menangani kemungkinan nilai null
      setCurrentIndex(index);
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = async () => {
    if (currentIndex < Slide.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      console.log('Last Item');

      // try {
      //   await AsyncStorage.setItem('@viewOnboarding :', 'true');
      // } catch (error) {
      //   console.log('Error @setItem: ', error);
      // }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollTo();
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />

      <View style={{flex: 1}}>
        <FlatList
          data={Slide}
          renderItem={({item}) => <OnboardingItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
          bounces={false}
          style={{marginBottom: 20}}
        />
      </View>

      <View style={{position: 'relative'}}>
        <Paginator data={Slide} scrollX={scrollX} />
      </View>

      <NextButton scrollTo={scrollTo} />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
