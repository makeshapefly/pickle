import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { COLORS, SIZES, icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { Image } from 'expo-image'
import { userCards } from '../data'
import Card from '../components/ClubCard'
import { ScrollView } from "react-native-virtualized-view"
import { useNavigation } from 'expo-router'

type Nav = {
  navigate: (value: string) => void
}

const YourCardScreen = () => {
  const { navigate } = useNavigation<Nav>();

  // Render User Debit Card
  const renderAllUserCard = () => {
    return (
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <FlatList
          data={userCards}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              number={item.number}
              balance={item.balance}
              date={item.date}
              onPress={() => console.log("Card Pressed")}
              containerStyle={{
                width: SIZES.width - 32,
                marginBottom: 8
              }}
            />
          )} />
        <TouchableOpacity
          onPress={() => navigate("addnewcard")}
          style={styles.btn}>
          <Image
            source={icons.plus}
            contentFit="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 16
            }}
          />
          <Text style={styles.btnText}>Add Credit Card</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Your Card" />
        {renderAllUserCard()}
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
  },
  btn: {
    width: SIZES.width - 32,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderStyle: "dashed",
    borderWidth: 1,
    flexDirection: "row"
  },
  btnText: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.primary
  }
})
export default YourCardScreen