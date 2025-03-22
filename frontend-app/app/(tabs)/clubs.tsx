import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants'
import { FlatList } from 'react-native'
import Card from '../../components/ClubCard'
import Header from '../../components/Header';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ClubsCard from '@/components/ClubsCard'
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
    { key: 'second', title: 'Find Clubs' },
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
    getClubs(member)
  }

  const getClubs = async (member) => {
    const querySnapshot = await firestore()
      .collection('club')
      .get()

    let clubs = [];
    let myClubs = [];
    querySnapshot.forEach(documentSnapshot => {
      clubs.push(documentSnapshot.data())
      console.log("member?.clubs: " + member?.clubs)
      console.log("documentSnapshot.id: " + documentSnapshot.id)
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
    //getClubs()
  }, []);

  const first = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
        <FlatList
          data={myClubs}
          keyExtractor={(item, i) => i}
          renderItem={({ item }) => (
            <ClubsCard
              name={item.name}
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
            <ClubsCard
              name={item.name}
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
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontFamily: "medium",
    color: COLORS.white,
    marginVertical: 16,
    textAlign: "center"
  },
 
})
export default ClubsScreen