import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons } from '../../constants'
import { FlatList } from 'react-native'
import Card from '../../components/ClubCard'
import Header from '../../components/Header';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ClubItem from '../../components/ClubItem'
import { Image } from 'expo-image'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ClubsScreen = () => {
  const [clubs, setClubs] = React.useState([])
  const [myClubs, setMyClubs] = React.useState([])
  const [member, setMember] = React.useState(null)
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    { key: 'first', title: 'My Clubs' },
    { key: 'second', title: 'All Clubs' },
  ]);

  const getMember = async () => {
    let uid = auth().currentUser?.uid;
    console.log(uid);

    const querySnapshot = await firestore()
      .collection('member')
      .where('uid', '==', uid)
      .get();

    let member = null;
    querySnapshot.forEach(documentSnapshot => {
      if (documentSnapshot.data().uid === uid) {
        member = documentSnapshot.data()
        console.log("documentSnapshot.data().clubs: " + documentSnapshot.data().clubs)
        setMember(member)
      }
    });
  }

  const getClubs = async () => {
    const querySnapshot = await firestore()
      .collection('club')
      .get()

    let clubs = [];
    let myClubs = [];
    querySnapshot.forEach(documentSnapshot => {
      clubs.push(documentSnapshot.data())
      if (member?.clubs.includes(documentSnapshot.id)) {
        myClubs.push(documentSnapshot.data())
      }
    });

    console.log(("myClubs: " + JSON.stringify(myClubs)))
    setClubs(clubs)
    setMyClubs(myClubs)
  }

  useEffect(() => {
    getMember()
    getClubs()
  }, []);

  const first = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
        <FlatList
          data={myClubs}
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

  const second = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
        <FlatList
          data={clubs}
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
    first: first,
    second: second,
  });

  const renderAllClubs = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          horizontal
          data={clubs}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              onPress={() => console.log("Card Pressed")}
            />
          )} />
      </View>
    )
  }

  const renderMyClubs = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>

      </View>
    )
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
      <Header title="Clubs" />
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
    backgroundColor: '#5EAA79',
  },
  container: {
    flex: 1,
    backgroundColor: '#5EAA79',
  },
  title: {
    fontSize: 20,
    fontFamily: "medium",
    color: COLORS.white,
    marginVertical: 16,
    textAlign: "center"
  },
  balanceText: {
    fontSize: 14,
    fontFamily: "regular",
    color: "gray"
  },
  amount: {
    fontSize: 20,
    fontFamily: "medium",
    color: "black",
    marginTop: 6
  },
  timeSelection: {
    width: 78,
    height: 38,
    flexDirection: "row",
    borderWidth: .3,
    borderColor: "gray",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",

  },
  timeSelectionText: {
    fontSize: 12,
    fontFamily: "medium",
    color: "gray"
  },
  downIcon: {
    height: 8,
    width: 8,
    tintColor: "gray",
    marginLeft: 4
  },
  timeSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 16
  }
})
export default ClubsScreen