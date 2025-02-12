import { View, Text, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Header from '../../components/Header';
import { allHistoryData, requestHistoryData, sendHistoryData } from '../../data';
import HistoryCard from '../../components/HistoryCard';


const allHistoryRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={allHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryCard
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

const sendHistoryRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={sendHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryCard
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

const requestHistoryRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={requestHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryCard
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
const renderScene = SceneMap({
  first: allHistoryRoute,
  second: sendHistoryRoute,
  third: requestHistoryRoute,
});

const HistoryScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Send' },
    { key: 'third', title: 'Request' },
  ]);

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
    flex: 1
  }
})

export default HistoryScreen