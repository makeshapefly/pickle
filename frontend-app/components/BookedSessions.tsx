import React, { useEffect } from 'react'
import { View, Text, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import { COLORS, images } from '../constants';
import BookingCard from '@/components/BookingCard';
import auth from '@react-native-firebase/auth';
import firestore, { Filter, Timestamp } from '@react-native-firebase/firestore';

type Booking = {
    id: string,
    name: string,
    member: string,
    date: Date
  }

const BookedSessions = () => {
    const [sessionsBooked, setSessionsBooked] = React.useState({})

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
          bookedSession.date = booking.session_date
          bookedSession.member = booking.member_name
          bookings.push(bookedSession)
        });
    
        console.log("bookings: " + JSON.stringify(bookings))
        setSessionsBooked(bookings)
      }

    useEffect(() => {
        bookedSessions()
    }, []);


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

export default BookedSessions

