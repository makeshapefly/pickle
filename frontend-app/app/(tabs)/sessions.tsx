import { View, Text, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, images } from '../../constants';
import Header from '../../components/Header';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SessionCard from '../../components/SessionCard'
import BookingCard from '@/components/BookingCard';
import auth from '@react-native-firebase/auth';
import firestore, { Filter, Timestamp } from '@react-native-firebase/firestore';

type Session = {
  id: string,
  name: string,
  date: Date,
  dateString: string,
  sessionDate: string //date, no time, used to search bookings
  location: string,
  price: number,
  //bookingString: string,
  //people: number,
  bookings: number,
  isBookable: boolean,
}

type Booking = {
  id: string,
  name: string,
  member: string,
}


const SessionsScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [sessionsAvailable, setSessionsAvailable] = React.useState({})
  const [sessionsBooked, setSessionsBooked] = React.useState({})
  const [routes] = React.useState([
    { key: 'first', title: 'Available' },
    { key: 'second', title: 'Booked' },
  ]);

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

  const booked = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
        <FlatList
          data={sessionsBooked}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookingCard
              id={item.id}
              name={item.name}
              member={item.member}
              onPress={() => console.log("View Detail")}
            />
          )}
        />
      </View>
    )
  }


  const available = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
        <FlatList
          data={sessionsAvailable}
          //keyExtractor={(item, i) => i}
          renderItem={({ item }) => (
            <SessionCard
              id={item.id}
              name={item.name}
              location={item.location}
              date={item.date}
              sessionDate={item.sessionDate}
              location={item.location}
              dateString={item.dateString}
              price={item.price}
              bookings={item.bookings}
              isBookable={item.isBookable}
              //bookingsString={item.bookings + ' of ' + item.people}
              bookingsString={"booking string"}
              onPress={() => console.log("View Detail")}
            />
          )}
        />
      </View>
    )
  }

  const renderScene = SceneMap({
    first: available,
    second: booked,
  });

  useEffect(() => {
    getSessionsForClub()
    bookedSessions()
    availableSessions()   
  }, []);

  /* gets member's clubs */
  const getClubsForMember = async () => {
    const querySnapshot = await firestore()
      .collection('member')
      .where('uid', '==', auth().currentUser?.uid)
      .get()

    let clubs = []
    querySnapshot.forEach(documentSnapshot => {
      clubs = documentSnapshot.data().clubs
    });
    return clubs
  }

  /* get bookings size for a particular session */
  const getBookingsNumberForSession = async (sessionId: string, sessionDate: string) => {
    const querySnapshot = await firestore()
      .collection('booking')
      .where(Filter.and(Filter('session_date', '==', sessionDate), Filter('session_id', '==', sessionId)))
      .get()

    querySnapshot.forEach(documentSnapshot => {

    });
    console.log("size: " + querySnapshot.size)
    return querySnapshot.size
  }


  const getSessionsForClub = async () => {
    const clubs = await getClubsForMember()
    const querySnapshot = await firestore()
      .collection('session')
      .where('organisation', 'in', clubs)
      .get()

    let sessions = []
    querySnapshot.forEach(documentSnapshot => {
      let session = documentSnapshot.data()
      session.id = documentSnapshot.id
      sessions.push(session)
    });

    return sessions
  }

  const availableSessions = async () => {
    const sessions = await getSessionsForClub()
    let availableSessions = []

    for (let i = 0; i < sessions.length; i++) {
      let session = sessions[i]
      let sessionStartDate = session.start_date.toDate();
      console.log("sessionStartDate: " + sessionStartDate)
      let sessionEndDate = session.end_date.toDate();
      let sessionStartHours = sessionStartDate.getHours()
      let sessionStartMinutes = sessionStartDate.getMinutes()

      

      let today = new Date()
      let todayPlusWindow = addHoursNewDate(today, session.window_open)
      const days = new Map([
        [0, "Sunday"],
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
      ]);

      let sessionSlot = new Date() //the date of a potential session > add 24 hours in loop

      //populate to today + windowOpen  OR   session end date, whichever is sooner
      let populateToDate = null
      populateToDate = addHours(new Date(), session.window_open)
      if (populateToDate > sessionEndDate) {
        populateToDate = addHoursNewDate(sessionEndDate, 0)
      }

      while (sessionSlot < populateToDate) {
        sessionSlot.setHours(sessionStartHours)
        sessionSlot.setMinutes(sessionStartMinutes)

        let closeWindowDate = minusHoursNewDate(sessionSlot, session.window_close)

        if (session.days.includes(days.get(sessionSlot.getDay()))) {
          if (todayPlusWindow >= sessionSlot) {
            if (new Date() < closeWindowDate) {
              //session is available
              //console.log("avaialable: " + JSON.stringify(sessionSlot))
              //console.log(days.get(sessionSlot.getDay()) + ' ' + getDateAsString(sessionSlot))
              let availableSession: Session = {}
              availableSession.id = session.id + '_' + getDateAsStringMinimal(sessionSlot)
              availableSession.name = session.name
              availableSession.location = session.location
              availableSession.isBookable = true
              availableSession.price = session.price
              availableSession.date = addHoursNewDate(sessionSlot, 0)
              availableSession.dateString = days.get(sessionSlot.getDay()) + ' ' + getDateAsString(sessionSlot) + " - " + sessionEndDate.getHours() + ":" + sessionEndDate.getMinutes()
              availableSession.sessionDate = getDateAsStringMinimal(sessionSlot)

              let numberOfBookings = await getBookingsNumberForSession(session.id, availableSession.sessionDate)
              availableSession.bookings = numberOfBookings

              if (availableSession.bookings < session.capacity) {
                availableSessions.push(availableSession)
              }
              
              console.log("availableSession" + JSON.stringify(availableSession))
            } else {
              let diff = (new Date() - closeWindowDate) / (60 * 60 * 1000)
            }
          }
          //don't think this condition will ever be met
          if (todayPlusWindow < sessionSlot) {
            //console.log("not avaialable: " + JSON.stringify(sessionSlot))
            //let difference = sessionSlot - todayPlusWindow
            //console.log("difference: " + difference)
          }
        }

        sessionSlot = addHours(sessionSlot, 24)
      }
    }
    setSessionsAvailable(availableSessions)
  }

  const bookedSessions = async () => {
    let uid = auth().currentUser?.uid;
    const querySnapshot = await firestore()
      .collection('booking')
      .where('member', '==', uid)
      .get()

    let bookings = []
    querySnapshot.forEach(documentSnapshot => {
      let booking = documentSnapshot.data()
      booking.id = documentSnapshot.id

      let bookedSession: Booking = {}
      bookedSession.id = booking.id
      bookedSession.name = booking.session_name
      bookedSession.name = booking.session_name
      bookedSession.member = booking.member_name
      bookings.push(bookedSession)
    });

    console.log("bookings: " + JSON.stringify(bookings))
    setSessionsBooked(bookings)
  }

  const getDateAsString = (date: Timestamp) => {
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    return dd + ' ' + months[mm] + ' ' + yyyy + ' ' + hrs + ':' + mins
  }

  const getDateAsStringMinimal = (date: Timestamp) => {
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy
  }

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: '#fff',
      }}
      renderLabel={({ route, focused, color }) => (
        <Text style={[{
          color: focused ? COLORS.primary : 'gray',
          fontSize: 14,
          minWidth: 100,
          fontFamily: focused ? "medium" : "regular"
        }]}>
          {route.title}
        </Text>
      )}
    />
  )

  return (
    <View style={styles.container}>
      <Header title="Sessions" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
})

export default SessionsScreen

function addHours(date: Date, hours: number) {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
}

function minusHours(date, hours) {
  const hoursToSubtract = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() - hoursToSubtract);
  return date;
}

function addHoursNewDate(date, hours) {
  const hoursToAdd = hours * 60 * 60 * 1000;
  let returnDate = new Date()
  returnDate.setTime(date.getTime() + hoursToAdd)
  return returnDate
}

function minusHoursNewDate(date, hours) {
  const hoursToSubtract = hours * 60 * 60 * 1000;
  let returnDate = new Date()
  returnDate.setTime(date.getTime() - hoursToSubtract)
  return returnDate
}
