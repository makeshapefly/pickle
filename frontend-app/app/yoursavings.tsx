import { View, Text, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Header from '../components/Header'
import SavingCard from '../components/SavingCard';
import { doneSavingsData, onPressSavingsData } from '../data';

const onProgressSavingsRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={onPressSavingsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SavingCard
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            percentage={item.percentage}
            onPress={() => console.log("View Detail")}
          />
        )}
      />
    </View>
  )
}

const doneSavingsRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={doneSavingsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SavingCard
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            percentage={item.percentage}
            onPress={() => console.log("View Detail")}
          />
        )}
      />
    </View>
  )
}
const renderScene = SceneMap({
  first: onProgressSavingsRoute,
  second: doneSavingsRoute,
});

const YourSavingsScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'On Progress' },
    { key: 'second', title: 'Done' },
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
        <Header title="Your Savings" />
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
export default YourSavingsScreen