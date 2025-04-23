import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import Text from 'components/Text';
import {
  useStyleSheet,
  StyleService,
  Layout,
  Icon,
  Avatar,
} from '@ui-kitten/components';
import {BookingItemProps} from '../Components/BookingItem';
import Flex from 'components/Flex';
import {globalStyle} from 'styles/globalStyle';
import dayjs from 'utils/dayjs';
import useLayout from 'hooks/useLayout';
import {useTranslation} from 'react-i18next';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';
import Weekdays from 'components/Weekdays';
import OnlStatus from 'components/OnlStatus';
export interface ApplicationProps extends BookingItemProps {
  jobDescription: string;
}
export interface ApplicationItemProps {
  item: ApplicationProps;
}

const ApplicationItem = ({item}: ApplicationItemProps) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const {width} = useLayout();
  const {t} = useTranslation(['request', 'common']);
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('RequestStack', {
          screen: 'ApplicationDetails',
          params: {type: item.type},
        });
      }}
      activeOpacity={0.54}>
      <Layout style={styles.container} level="1">
        <Flex
          justify="flex-start"
          itemsCenter
          mv={16}
          mh={16}
          style={globalStyle.shadow}>
          <View style={styles.avatar}>
            <Avatar source={item.user.avatar} size="medium" shape="square" />
            <OnlStatus status={item.onlineState} />
          </View>
          <View>
            <Text category="h7" ml={16} maxWidth={231} bold>
              {item.user.name}
            </Text>
            <Text category="h8" ml={16} status={'warning'} mt={8} bold>
              {item.type}
            </Text>
          </View>
        </Flex>
        <Layout level={'2'} style={styles.bottom}>
          <Text
            category="h7"
            mb={16}
            numberOfLines={1}
            maxWidth={295}
            center
            bold>
            {item.jobDescription}
          </Text>
          <Flex justify="flex-start" itemsCenter mb={8}>
            <Icon pack="assets" name="baby" style={styles.icon} />
            {item.children.map((item, i) => {
              return (
                <Text category="h8" ml={8} key={i} bold>
                  {item}
                </Text>
              );
            })}

            <Layout style={globalStyle.dot} level="5" />
            <Text category="h8-s">{item.ageType}</Text>
          </Flex>
          <Flex justify="flex-start" itemsCenter mb={8}>
            <Icon pack="assets" name="location16" style={styles.icon} />
            <Text category="h8-s" ml={8}>
              {item.location}
            </Text>
          </Flex>
          <Flex justify="flex-start">
            <Icon pack="assets" name="bookmarkActive" style={styles.icon} />
            <Flex>
              <View style={styles.startTime}>
                <Text category="h8" status={'placeholder'} bold>
                  Start
                </Text>
                <Text category="h8-s" status={'basic'}>
                  {dayjs(item.startTime).format('ddd, MMM DD')}
                </Text>
                <Weekdays data={item.dayInWeek} status="primary" />
              </View>
              <View>
                <Text category="h8" status={'placeholder'} bold>
                  Hours
                </Text>
                <Text category="h8-s" status={'basic'}>
                  {item.meetingTime}
                </Text>
              </View>
            </Flex>
          </Flex>
          <Flex mt={12} mr={16}>
            <View
              style={[
                styles.tag,
                {
                  width: 92 * (width / 375),
                },
              ]}>
              <Text category="h9" status={'primary'} bold>
                {t('common:regularly')}
              </Text>
            </View>
            <Text category="h3" bold mt={8}>
              {item.price}
            </Text>
          </Flex>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

export default ApplicationItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 24,
    ...globalStyle.shadowFade,
    borderRadius: 16,
  },
  avatar: {
    paddingRight: 8,
  },
  bottom: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: 'background-basic-color-3',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: 'text-placeholder-color',
    marginTop: 2,
  },
  startTime: {
    marginLeft: 8,
    width: 124,
  },
  onlineIcon: {
    width: 14,
    height: 14,
    position: 'absolute',
    borderRadius: 99,
    borderWidth: 2,
    borderColor: 'background-basic-color-2',
    bottom: 0,
    left: 48,
  },
  tag: {
    paddingVertical: 8,
    marginLeft: 24,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 6,
    height: 30,
    backgroundColor: 'color-primary-300',
  },
});
