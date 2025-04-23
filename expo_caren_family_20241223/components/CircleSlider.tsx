import React from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
} from 'react-native-reanimated';
import {useDerivedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';
import Flex from './Flex';
import Text from './Text';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
interface CircleProps {
  value: number;
  stokeColor: string | ColorValue;
  progressStokeColor: string | ColorValue;
  d: number;
  strokeWidth: number;
}
export default function CircleProgressBar({
  value,
  progressStokeColor,
  stokeColor,
  d,
  strokeWidth = 4,
}: CircleProps) {
  const progress = useSharedValue(0);
  const CIRCLE_LENGTH = d * Math.PI - 12; // 2PI*R
  const R = CIRCLE_LENGTH / (2 * Math.PI);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  React.useEffect(() => {
    progress.value = withTiming(value / 100 > 0 ? value / 100 : 0, {
      duration: 3000,
      easing: Easing.bezier(0.1, 0.3, 0.5, 1),
    });
  }, [progress.value, value]);

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  }, [value, progress.value]);
  return (
    <View style={[styles.container, {width: d, height: d}]}>
      <Svg
        style={{
          position: 'absolute',
          width: d,
          height: d,
        }}>
        <Circle
          cx={d / 2}
          cy={d / 2}
          r={R}
          stroke={stokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={CIRCLE_LENGTH}
        />
        <AnimatedCircle
          cx={d / 2}
          cy={d / 2}
          r={R}
          stroke={progressStokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <Flex itemsCenter ml={4} mt={4} style={{transform: [{rotateZ: '88deg'}]}}>
        <ReText style={styles.progressText} text={progressText} />
        <Text category="h8" mt={2} ml={1}>
          %
        </Text>
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotateZ: '-88deg'}],
  },
  progressText: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'GothamPro-Medium',
    color: '#272755',
  },
});
