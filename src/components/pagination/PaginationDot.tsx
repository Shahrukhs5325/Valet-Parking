import {StyleSheet, Animated, View, Dimensions} from 'react-native';
import React from 'react';

interface props {
  data: any[];
  scrollX: any;
}
const PaginationDot: React.FC<props> = ({data, scrollX}) => {
  const {width} = Dimensions.get('screen');

  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 8, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['rgba(255, 255, 255, 0.2)', 'rgba(217, 217, 217, 1)', 'rgba(255, 255, 255, 0.2)'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                backgroundColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default PaginationDot;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: 'red',
  },
});
