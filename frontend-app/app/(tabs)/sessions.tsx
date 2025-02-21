import { View, Text, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Header from '../../components/Header';
import { allHistoryData, requestHistoryData, sendHistoryData } from '../../data';
import SessionCard from '../../components/SessionCard'
import { useAuth } from '@clerk/clerk-react'


const sendHistoryRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={sendHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SessionCard
            name={item.name}
            avatar={images.clubs}
            date={item.date}
            amount={item.amount}
            onPress={() => console.log("View Detail")}
          />
        )}
      />
    </View>
  )
}

const requestHistoryRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={requestHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SessionCard
            name={item.name}
            avatar={item.avatar}
            date={item.date}
            amount={item.amount}
            onPress={() => console.log("View Detail")}
          />
        )}
      />
    </View>
  )
}


const SessionsScreen = () => {
  const layout = useWindowDimensions();
  const { getToken } = useAuth()

  const [index, setIndex] = React.useState(0);
  const [sessions, setSessions] = React.useState({})
  const [routes] = React.useState([
    { key: 'first', title: 'Available' },
    { key: 'second', title: 'Booked' },
  ]);

  const allHistoryRoute = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.header }}>
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
              amount={item.amount}
              onPress={() => console.log("View Detail")}
            />
          )}
        />
      </View>
    )
  }

  const renderScene = SceneMap({
    first: allHistoryRoute,
    second: sendHistoryRoute,
  });

  useEffect(() => {
      sessionDetails()
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
    <SafeAreaView style={styles.area}>
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
    //backgroundColor: COLORS.header
  }
})

export default SessionsScreen