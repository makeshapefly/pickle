import React, {memo} from 'react';
import {View} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import BookingItem, {BookingItemProps} from '../Components/BookingItem';
import TitleList from '../Components/TitleList';
import {MainBottomTabStackParamList} from 'navigation/types';
import {useTranslation} from 'react-i18next';
import {Images} from 'assets/images';
import EmptyData from '../Components/EmptyData';
import {Request_Type_Enum} from 'constants/Types';

interface BookingsTabProps {
  available: Session[];
}

type Session = {
  id: string,
  name: string,
  location: string,
  isBookable: boolean,
  price: number,
  date: Date,
  dateString: string,
  sessionDate: string //date, no time, used to search bookings   
  //bookingString: string,
  //people: number,
  numberOfBookings: number,
  //isAlreadyBooked: boolean,
}

const BookingsTab = memo(({available}: BookingsTabProps) => {
  const {navigate} =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const onSeeAllPast = () => {
    navigate('Requests', {
      screen: 'RequestsInPast',
      params: {requestType: Request_Type_Enum.Booking},
    });
  };
  const {t} = useTranslation(['request', 'common']);

  return (
    <View style={styles.container}>
      {available === undefined && available === undefined ? (
        <EmptyData
          image={Images.noBooking}
          title={t('request:noBooking')}
          description={t('request:noBookingTitle')}
        />
      ) : (
        <>
          {available.length > 0 ? (
            <>
              <TitleList current dataLength={available.length} />
              {available.map((item, i) => {
                return <BookingItem item={item} key={i} />;
              })}
            </>
          ) : null}
          {available.length > 0 ? (
            <View style={styles.passContent}>
              <TitleList
                current={false}
                dataLength={available.length}
                onSeeAll={onSeeAllPast}
              />
              {available.map((item, i) => {
                return <BookingItem item={item} key={i} />;
              })}
            </View>
          ) : null}
        </>
      )}
    </View>
  );
});

export default BookingsTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  passContent: {
    marginTop: 12,
  },
  empty: {
    alignItems: 'center',
    marginTop: 120,
  },
});
