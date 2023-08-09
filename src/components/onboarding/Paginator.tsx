import {
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
  processColor,
  Dimensions,
} from 'react-native';
import React from 'react';
import Color1 from '../../assets/colors/Color1';

interface PaginatorProps {
  data: {
    map: any;
  };
  scrollX: {
    interpolate: any;
  };
}

const Paginator: React.FC<PaginatorProps> = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  const {height} = Dimensions.get('screen');

  return (
    <View style={{flexDirection: 'row', height: 64, backgroundColor: 'white'}}>
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const lineWidth = scrollX.interpolate({
          inputRange,
          outputRange: [30, 190, 30],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 2, 1],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.Line,
              {width: lineWidth, opacity, bottom: height - 265},
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  Line: {
    height: 10,
    borderRadius: 20,
    backgroundColor: Color1.myGreenLight,
    marginHorizontal: 8,
  },
});
