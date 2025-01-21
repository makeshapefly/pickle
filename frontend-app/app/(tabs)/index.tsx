import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native'
import React from 'react'
import { COLORS, images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import SubHeaderItem from '../../components/SubHeaderItem'
import Card from '../../components/Card'
import { userCards } from '../../data'
import SavingCard from '../../components/SavingCard'
import { ScrollView } from 'react-native-virtualized-view'
import { useClerk } from '@clerk/clerk-react'
import * as Linking from 'expo-linking'

type Nav = {
  navigate: (value: string) => void
}

const HomeScreen = () => {
  const { navigate } = useNavigation<Nav>();
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Render balance card
  const renderBalanceCard = () => {
    return (
      <View style={styles.balanceCard}>
        <View style={styles.balanceCardView}>
          <Text style={styles.balanceText}>My Balance</Text>
          <Text style={styles.balanceValue}>$2887.65</Text>
        </View>
        <View style={styles.featureColumn}>
          <TouchableOpacity
            onPress={() => navigate("send")}
            style={styles.featureContainer}>
            <View style={styles.featureIconContainer}>
              <Image
                source={images.sendIcon}
                contentFit='contain'
                style={styles.featureIcon}
              />
            </View>
            <Text style={styles.featureText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("requestmoney")}
            style={styles.featureContainer}>
            <View style={styles.featureIconContainer}>
              <Image
                source={images.requestIcon}
                contentFit='contain'
                style={styles.featureIcon}
              />
            </View>
            <Text style={styles.featureText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("pay")}
            style={styles.featureContainer}>
            <View style={styles.featureIconContainer}>
              <Image
                source={images.payIcon}
                contentFit='contain'
                style={styles.featureIcon}
              />
            </View>
            <Text style={styles.featureText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("topup")}
            style={styles.featureContainer}>
            <View style={styles.featureIconContainer}>
              <Image
                source={images.topupIcon}
                contentFit='contain'
                style={styles.featureIcon}
              />
            </View>
            <Text style={styles.featureText}>Top Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Render User Debit Card
  const renderAllDebitCard = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          horizontal
          data={userCards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              number={item.number}
              balance={item.balance}
              date={item.date}
              onPress={() => console.log("Card Pressed")}
            />
          )} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.username}>Alexander Michael</Text>
            <Button title="Sign out" onPress={handleSignOut} />
          </View>
          <TouchableOpacity
            onPress={() => navigate("notifications")}
          >
            <View style={styles.notiView} />
            <Octicons name="bell" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        {renderBalanceCard()}
        <ScrollView style={{ top: -40 }}>
          <SubHeaderItem
            title="Your Cards"
            subtitle="View All"
            onPress={() => navigate("yourcard")}
          />
          {renderAllDebitCard()}
          <SubHeaderItem
            title="Your Savings"
            subtitle="View All"
            onPress={() => navigate("yoursavings")}
          />
          <SavingCard
            title="Buy Playstation"
            subtitle="Slim 1 TB 56 Games"
            icon={images.gameIcon}
            percentage={60}
            onPress={() => console.log("View Detail")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.primary,
    margin: 0,
    height: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    height: 126,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "regular",
    color: "rgba(255, 255, 255,.72)",
  },
  username: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.white,
    marginTop: 8
  },
  notiView: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    right: 2,
    zIndex: 999
  },
  balanceCard: {
    height: 172,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 16,
    marginHorizontal: 16,
    top: -40
  },
  balanceCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    paddingBottom: 12
  },
  balanceText: {
    fontSize: 16,
    fontFamily: "regular",
    color: "black",
  },
  balanceValue: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
  },
  featureColumn: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  featureContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 16
  },
  featureIconContainer: {
    height: 46,
    width: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
    backgroundColor: "#ECE7FF",
    marginBottom: 12
  },
  featureIcon: {
    height: 32,
    width: 32
  },
  featureText: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.primary,
  }
})
export default HomeScreen