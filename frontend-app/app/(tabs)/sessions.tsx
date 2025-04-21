import { View, useWindowDimensions, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../constants';
import Header from '../../components/Header';
import SessionCard from '../../components/SessionCard'
import BookingCard from '@/components/BookingCard';
import auth from '@react-native-firebase/auth';
import firestore, { Filter, Timestamp, FieldValue, arrayUnion } from '@react-native-firebase/firestore';

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
  isAlreadyBooked: boolean,
}

type Booking = {
  id: string,
  sessionId: string,
  name: string,
  member: string,
  memberName: string,
  date: string //e.g. 7/3/2025
}


const SessionsCopyScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [sessionsAvailable, setSessionsAvailable] = React.useState(null)
  const [sessionsBooked, setSessionsBooked] = React.useState()

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

  async function bookSession(id, sessionDate) {
    let member = auth().currentUser
    let booking = {
      date: sessionDate,
      uid: member?.uid,
      name: member?.displayName,
    }

    try {
      console.log(booking)
      firestore()
        .collection('session')
        .doc(id)
        .update({
          bookings: FieldValue.arrayUnion(booking),
        })
        .then(() => {
          console.log('Session updated!');
        });
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromAvailable = (id, sessionDate) => {
    const index = sessionsBooked.findIndex((element) => element.id == id && element.date == sessionDate)
    console.log("index: " + index)
    sessionsAvailable.splice(index, 1)
  }

  useEffect(() => {
    //getSessionsForClub()
    //bookedSessions()
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

  const availableSessions = async () => {
    const sessions = await getSessionsForClub()
    let availableSessionsList = []

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
          let numberOfBookings = getBookingsNumberForSession(element.session, bookings)
          console.log("numberOfBookings: " + numberOfBookings)

          const myBookings = getBookedSessions(bookings)
          console.log(myBookings)

          let availableSession: any = {}
          availableSession.id = session.id
          availableSession.name = session.name
          availableSession.location = session.location
          availableSession.isBookable = true
          availableSession.price = session.price
          availableSession.date = element.sessionDate
          availableSession.dateString = getDateAsStringMinimal(sessionDate)
          availableSession.sessionDate = element.session
          availableSession.numberOfBookings = numberOfBookings
          availableSessionsList.push(availableSession)
        }
      });

    }
    setSessionsAvailable(availableSessionsList)
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
      bookedSession.sessionId = booking.session_id
      bookedSession.name = booking.session_name
      bookedSession.date = booking.session_date
      bookedSession.member = booking.member
      bookedSession.memberName = booking.member_name
      bookings.push(bookedSession)
    });

    //console.log("bookings: " + JSON.stringify(bookings))
    setSessionsBooked(bookings)
    return bookings
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
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <Header title="Sessions" />
      <FlatList
        data={sessionsAvailable}
        keyExtractor={(item, i) => i}
        renderItem={({ item }) => (
          <SessionCard
            id={item.id}
            name={item.name}
            location={item.location}
            date={item.date}
            sessionDate={item.sessionDate}
            dateString={item.dateString}
            price={item.price}
            bookings={item.bookings}
            isBookable={item.isBookable}
            //bookingsString={item.bookings + ' of ' + item.people}
            bookingsString={"booking string"}
            isAlreadyBooked={item.isAlreadyBooked}
            numberOfBookings={item.numberOfBookings}
            onPress={bookSession}
          />
        )}
      />
    </SafeAreaView>
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

export default SessionsCopyScreen

