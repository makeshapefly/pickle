import { View, Text, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Header from '../../components/Header';
import { allHistoryData, requestHistoryData, sendHistoryData } from '../../data';
import SessionCard from '../../components/SessionCard'
import { useAuth } from '@clerk/clerk-react'

type session = {
  id: string,
  name: string,
  date: Date,
  amount: number,
  location: string,
  bookingString: string,
  people: number,
  isBookable: boolean,
}


const SessionsScreen = () => {
  const layout = useWindowDimensions();
  const { getToken } = useAuth()

  const [index, setIndex] = React.useState(0);
  const [sessions, setSessions] = React.useState({})
  const [sessionsBooked, setSessionsBooked] = React.useState({})
  const [routes] = React.useState([
    { key: 'first', title: 'Available' },
    { key: 'second', title: 'Booked' },
  ]);

  const booked = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
        <FlatList
          data={sessionsBooked}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SessionCard
              id={item.id}
              name={item.name}
              location={item.location}
              avatar={images.clubs}
              date={item.startDate}
              price={item.price}
              people={item.people}
              isBookable={item.bookableNow}
              bookingsString={item.bookings + ' of ' + item.people}
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
          data={sessions}
          keyExtractor={(item, i) => i}
          renderItem={({ item }) => (
            <SessionCard
              id={item.id}
              name={item.name}
              location={item.location}
              avatar={images.clubs}
              date={item.startDate}
              price={item.price}
              people={item.people}
              isBookable={item.bookableNow}
              bookingsString={item.bookings + ' of ' + item.people}
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
    sessionDetails()
    bookedSessions()
  }, []);

  const sessionDetails = async () => {
    const token = await getToken()
    const response = await fetch(process.env.EXPO_PUBLIC_DB_URL + 'session/available', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    console.log(JSON.stringify(data))
    setSessions(data)
  }

  const bookedSessions = async () => {
    const token = await getToken()
    const response = await fetch(process.env.EXPO_PUBLIC_DB_URL + 'booking/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    console.log(JSON.stringify(data))
    setSessionsBooked(data)
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