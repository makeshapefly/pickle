import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {useTranslation} from 'react-i18next';

import Text from 'components/Text';
import Container from 'components/Container';

import {Images} from 'assets/images';
import {globalStyle} from 'styles/globalStyle';
import Flex from 'components/Flex';
import {ApplicationDetailsScreenNavigationProp} from 'navigation/types';
import Weekdays from 'components/Weekdays';
import {MY_RECOMMENDED} from 'constants/Data';
import NavigationAction from 'components/NavigationAction';
import Content from 'components/Content';
import IRecommended from 'components/IRecommended';
import dayjs from 'dayjs';

const ApplicationDetails = memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['request', 'common']);

  const route = useRoute<ApplicationDetailsScreenNavigationProp>();
  const StatusRequest = route.params.type;

  const onDelete = () => {
    goBack;
  };
  const onAcceptAgain = () => {};
  const onAccept = () => {};
  const onDecline = () => {};
  const onBooking = () => {};
  const onInterview = () => {};
  const onViewFullJob = () => {};

  const getLeftButton = (
    status: 'Unconfirmed' | 'Accepted' | 'Declined',
  ): string => {
    switch (status) {
      case 'Unconfirmed':
        return t('common:decline');
      case 'Accepted':
        return t('common:booking');
      case 'Declined':
        return t('common:accept-again');
      default:
        return t('common:decline');
    }
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon={'back'} onPress={goBack} />}
        title={
          <Text status={'primary'} center category="h6">
            {t('request:requestDetails')}
          </Text>
        }
      />
      <Text
        center
        category="h8"
        bold
        status={
          StatusRequest === 'Completed'
            ? 'completed'
            : StatusRequest === 'Accepted'
            ? 'info'
            : 'warning'
        }
        mb={8}>
        {StatusRequest}
      </Text>
      <Content padder contentContainerStyle={styles.content}>
        <Text category="h6" bold mb={24}>
          {t('request:request-from')}
        </Text>
        <IRecommended item={MY_RECOMMENDED[0]} />
        <Text category="h2" bold mt={56} mb={16}>
          Regular afterschool child caregiver needed.
        </Text>
        <Text mb={16}>1 Children - John - Dogs</Text>
        <Flex>
          <View style={styles.startTime}>
            <Text category="h8" status={'placeholder'} bold>
              Start
            </Text>
            <Text category="h6" bold status={'basic'}>
              {dayjs(new Date()).format('ddd, MMM DD')}
            </Text>
            <Weekdays data={DAY_IN_WEEK} status="primary" size="large" />
          </View>
          <View>
            <Text category="h8" status={'placeholder'} bold>
              Hours
            </Text>
            <Text category="h6" status={'basic'} bold>
              08:00 - 12:00
            </Text>
          </View>
        </Flex>
        <Text category="para-m" mt={32} mb={8}>
          Rochester, NY
        </Text>
        <Image
          source={Images.map}
          style={{
            width: width,
            marginBottom: 56,
            marginLeft: -24,
          }}
        />
        <Text bold mb={32} category="h3">
          {t('request:description')}
        </Text>
        <Text mb={32}>{t('request:description_1')}</Text>
        <Text mb={32}>{t('request:description_2')}</Text>
        <Button
          children={t('request:view-full-job')}
          size="small"
          status={'primary'}
          style={styles.fullJob}
          onPress={onViewFullJob}
        />
        {StatusRequest === 'Unconfirmed' ? (
          <Text category="h8" status="placeholder">
            Edith has 19 hours left to response
          </Text>
        ) : null}
      </Content>
      <Layout style={[styles.bottom, {paddingBottom: bottom + 8}]} level="2">
        <Button
          children={
            StatusRequest === 'Unconfirmed'
              ? t('common:decline')
              : StatusRequest === 'Accepted'
              ? t('common:booking')
              : t('common:accept-again')
          }
          status="outline"
          style={[globalStyle.flexOne, {marginRight: 16}]}
          onPress={
            StatusRequest === 'Unconfirmed'
              ? onDecline
              : StatusRequest === 'Accepted'
              ? onBooking
              : onAcceptAgain
          }
        />
        <Button
          children={
            StatusRequest === 'Unconfirmed'
              ? t('common:accept')
              : StatusRequest === 'Accepted'
              ? t('common:interview')
              : t('common:delete')
          }
          style={globalStyle.flexOne}
          status={StatusRequest === 'Declined' ? 'danger' : 'basic'}
          onPress={
            StatusRequest === 'Unconfirmed'
              ? onAccept
              : StatusRequest === 'Accepted'
              ? onInterview
              : onDelete
          }
        />
      </Layout>
    </Container>
  );
});

export default ApplicationDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    ...globalStyle.topBorder16,
    paddingHorizontal: 24,
    backgroundColor: 'background-basic-color-1',
    paddingBottom: 80,
  },
  startTime: {
    marginLeft: 8,
    width: 126,
  },
  fullJob: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingTop: 14,
    ...globalStyle.topBorder24,
    ...globalStyle.shadowFade,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
const DAY_IN_WEEK = [
  {
    title: 'Sun',
    isActive: false,
  },
  {
    title: 'Mon',
    isActive: false,
  },
  {
    title: 'Tue',
    isActive: true,
  },
  {
    title: 'Wed',
    isActive: true,
  },
  {
    title: 'Thu',
    isActive: true,
  },
  {
    title: 'Fri',
    isActive: false,
  },
  {
    title: 'Sat',
    isActive: false,
  },
];
const TAG_QUALIFICATIONS = [
  'Has a car',
  'Comfortable with pets',
  'Will provide sick care',
  'None Smoking',
  'College educated',
  'Background Check',
];
const TAG_RESPONSIBILITIES = [
  'Driving the kids',
  'Prepares food',
  'Sleep training',
  'Potty Training',
  'Will provide sick care',
];
