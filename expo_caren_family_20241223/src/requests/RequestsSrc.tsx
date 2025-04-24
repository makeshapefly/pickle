import React, { memo, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Container from 'components/Container';
import { globalStyle } from 'styles/globalStyle';
import keyExtractor from 'utils/keyExtractor';
import BasicTabBar from 'components/BasicTabBar';
import {
  DATA_CURRENT_BOOKING,
  DATA_CURRENT_INTERVIEW,
  DATA_PASS_BOOKING,
  DATA_PAST_INTERVIEW,
} from 'constants/Data';
import { RequestsStackParamList } from 'navigation/types';
import InterviewTab from './Interview/InterviewTab';
import BookingsTab from './Bookings/BookingsTab';
import ApplicationsTab from './Applications/ApplicationsTab';
import auth from '@react-native-firebase/auth';
import firestore, { Filter, Timestamp, FieldValue, arrayUnion } from '@react-native-firebase/firestore';
import { useMember } from 'MemberContext';

const RequestsSrc = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RequestsStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(['request', 'common']);
  const { member } = useMember();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldLoadComponent = (index: number) => index === activeIndex;
  const [sessionsAvailable, setSessionsAvailable] = React.useState(Array<Session>)
  const [sessionsBooked, setSessionsBooked] = React.useState()

  const [dataCurrent, setCurrent] = React.useState(DATA_CURRENT_INTERVIEW);
  const [dataPast, setPast] = React.useState(DATA_PAST_INTERVIEW);

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];

  type Session = {
    id: string,
    name: string,
    location: string,
    isBookable: boolean,
    price: number,
    date: Date,
    dateString: string,
    people: number,
    sessionDate: string //date, no time, used to search bookings   
    //bookingString: string,
    //people: number,
    numberOfBookings: number,
    //isAlreadyBooked: boolean,
  }

  const getSessionsForClub = async () => {
    const clubs = await getClubsForMember()

    const querySnapshot = await firestore()
      .collection('session')
      .where('club', 'in', clubs)
      .get()

    let sessions = []
    querySnapshot.forEach(documentSnapshot => {
      let session = documentSnapshot.data()
      session.id = documentSnapshot.id
      sessions.push(session)
    });

    return sessions
  }

  /* gets member's clubs */
  const getClubsForMember = async () => {
    /*const querySnapshot = await firestore()
      .collection('member')
      .where('uid', '==', auth().currentUser?.uid)
      .get()

    let clubs = []
    querySnapshot.forEach(documentSnapshot => {
      clubs = documentSnapshot.data().clubs
    });
    return */
    return member?.clubs
  }

  /* get bookings size for a particular session */
  const getBookingsNumberForSession = (sessionDate: Timestamp, bookings: Array<object>) => {
    let number = bookings.filter((element) => element.date.isEqual(sessionDate))
    return number.length
  }

  const getBookedSessions = (bookings: Array<object>) => {
    let member = auth().currentUser
    let myBookings = bookings.filter((element) => element.uid == member?.uid)
    console.log('myBookings3: ' + myBookings)
    return myBookings
  }

  const availableSessions = async () => {
    const sessions = await getSessionsForClub()
    let availableSessionsList: Array<Session> = []

    for (let i = 0; i < sessions.length; i++) {
      let session = sessions[i]
      const bookings = session.bookings
      const available = session.available
      let today = new Date()
      available.forEach(element => {
        const opens = (element.opens).toDate()
        const closes = (element.closes).toDate()
        const sessionDate = (element.session).toDate()
        const isDayOfWeek = element.is_correct_day_of_week
        console.log(closes)
        console.log(sessionDate)
        if (today > opens && today < closes && isDayOfWeek) {
          console.log("adding available session")
          let numberOfBookings = 2
          //let numberOfBookings = getBookingsNumberForSession(element.session, bookings)
          console.log("numberOfBookings: " + numberOfBookings)

          //const myBookings = getBookedSessions(bookings)
          //console.log(myBookings)

          let availableSession: Session = {
            id: session.id,
            name: session.name,
            location: session.location,
            isBookable: true,
            price: session.price,
            date: element.sessionDate,
            dateString: getDateAsString(sessionDate),
            people: session.people,
            sessionDate: element.session,
            numberOfBookings: numberOfBookings,
          }
          availableSessionsList.push(availableSession)
        }
      });

    }
    console.log("availableSessionsListsessions for club= " + JSON.stringify(availableSessionsList))
    setSessionsAvailable(availableSessionsList)
  }

  useEffect(() => {
    availableSessions()
  }, []);

  const getDateAsStringMinimal = (date: Timestamp) => {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy
  }

  const getDateAsString = (date: Timestamp) => {
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    return dd + ' ' + months[mm] + ' ' + yyyy + ' ' + hrs + ':' + mins
  }

  const ListFooterComponent = React.useCallback(() => {
    return (
      <View style={styles.footer}>
        <ViewPager
          selectedIndex={activeIndex}
          onSelect={setActiveIndex}
          style={[globalStyle.flexOne]}
          swipeEnabled={false}
          shouldLoadComponent={shouldLoadComponent}>
          <BookingsTab
            available={sessionsAvailable}
          //passData={availableSessions}
          />
          <InterviewTab
            dataCurrentRequest={dataCurrent}
            dataPassRequest={dataPast}
          />

          <ApplicationsTab />
        </ViewPager>
      </View>
    );
  }, [activeIndex, dataCurrent, dataPast]);
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <Layout>
        <BasicTabBar
          style={styles.tabBar}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          tabs={[
            'Find Session',
            'Booked',
          ]}
        />
      </Layout>
    );
  }, [activeIndex]);

  return (
    <Container style={styles.container}>
      <TopNavigation title={t('request:title').toString()} />
      <FlatList
        renderItem={() => <></>}
        stickyHeaderIndices={[0]}
        keyExtractor={keyExtractor}
        data={[0]}
        contentContainerStyle={styles.content}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
});

export default RequestsSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
  tabBar: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  footer: {
    marginHorizontal: 24,
    paddingBottom: 40,
  },
});
