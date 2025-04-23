import React, {memo} from 'react';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';

import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Flex from 'components/Flex';
import NavigationAction from 'components/NavigationAction';
import BasicTabBar from 'components/BasicTabBar';
import ButtonFill from 'components/ButtonFill';
import {globalStyle} from 'styles/globalStyle';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UserProps} from 'constants/Types';
import Text from 'components/Text';

interface AnimationHeaderProps {
  animationValue: SharedValue<number>;
  selectedTab: number;
  setSelectedTab(index: number): void;
  _onOption?(): void;
  tabs: string[];
  user: UserProps;
}

const AnimationHeader = memo(
  ({
    animationValue,
    selectedTab,
    setSelectedTab,
    _onOption,
    user,
    tabs,
  }: AnimationHeaderProps) => {
    const {height, top} = useLayout();
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();
    const styleHeader = useAnimatedStyle(() => {
      const input = [0, height * 0.55, height * 0.65, height * 0.75];
      const heightHeader = interpolate(
        animationValue.value,
        input,
        [0, 0, 60, 60 + 52],
        Extrapolate.CLAMP,
      );
      const opacity = interpolate(
        animationValue.value,
        input,
        [0, 0, 0, 1],
        Extrapolate.CLAMP,
      );
      const marginTop = interpolate(
        animationValue.value,
        input,
        [0, 0, 0, top],
        Extrapolate.CLAMP,
      );
      return {
        height: heightHeader,
        opacity: opacity,
        marginTop: marginTop,
      };
    });
    const style = useAnimatedStyle(() => {
      const input = [0, height * 0.3, height * 0.35, height * 0.45];
      const topHeader = interpolate(
        animationValue.value,
        input,
        [top + 8, top - 8, -top, -top * 2],
        Extrapolate.CLAMP,
      );
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        top: topHeader,
        zIndex: 100,
      };
    });

    const [liked, setLiked] = React.useState(false);
    const _onLike = () => setLiked(!liked);
    const {goBack} = useNavigation();
    return (
      <>
        <Animated.View style={[styleHeader, styles.topNav]}>
          <TopNavigation
            appearance={'control'}
            accessoryLeft={<NavigationAction icon="back" />}
            accessoryRight={
              <Flex justify="flex-end" itemsCenter>
                <Text
                  category="h6"
                  bold
                  maxWidth={160}
                  numberOfLines={1}
                  mr={24}>
                  {user.name}
                </Text>
                <TouchableOpacity activeOpacity={0.54} onPress={_onLike}>
                  <Icon
                    pack="assets"
                    name={!liked ? 'like_comment' : 'like_comment_active'}
                  />
                </TouchableOpacity>
                <NavigationAction
                  icon={'option'}
                  onPress={_onOption}
                  marginLeft={16}
                />
              </Flex>
            }
          />
          <BasicTabBar
            style={styles.tabBar}
            onChange={setSelectedTab}
            activeIndex={selectedTab}
            tabs={tabs}
          />
        </Animated.View>
        <Animated.View style={style}>
          <Flex mh={24} mt={8}>
            <ButtonFill icon="back" status="transparent" onPress={goBack} />
            <Flex>
              <ButtonFill
                status="transparent"
                icon={liked ? 'like_comment_active' : 'like_comment'}
                style={styles.buttonLike}
                onPress={_onLike}
                iconColor={liked ? theme['text-danger-color'] : undefined}
              />
              <ButtonFill
                status="transparent"
                icon="option"
                onPress={_onOption}
              />
            </Flex>
          </Flex>
        </Animated.View>
      </>
    );
  },
);

export default AnimationHeader;

const themedStyles = StyleService.create({
  tabBar: {
    marginTop: 16,
    paddingHorizontal: 12,
    ...globalStyle.shadow,
  },
  buttonLike: {
    marginRight: 24,
  },
  topNav: {
    backgroundColor: 'background-basic-color-2',
    ...globalStyle.shadow,
  },
});
