import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, ImageBackground } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { COLORS, images, icons, SIZES } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import { Octicons } from '@expo/vector-icons'
import { Redirect, useNavigation } from 'expo-router'
import SubHeaderItem from '../../components/SubHeaderItem'
import Card from '../../components/ClubCard'
import { userCards } from '../../data'
import SavingCard from '../../components/SavingCard'
import { ScrollView } from 'react-native-virtualized-view'
import { useClerk, useAuth } from '@clerk/clerk-react'
import * as Linking from 'expo-linking'
import ClubCard from '../../components/ClubCard'
import { SimpleLineIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type Nav = {
  navigate: (value: string) => void
}

type User = {
  isSignedIn: boolean;
  id: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  email: string;
  organisations: [];
  noOrganisations: number;
};

const HomeScreen = () => {
  const [userDetails, setUserDetails] = React.useState({})
  const { navigate } = useNavigation<Nav>();
  const { signOut } = useClerk()
  const { getToken } = useAuth()

  useEffect(() => {
    memberDetails()
  }, []);

  const memberDetails = async () => {
    const token = await getToken()
    const response = await fetch(process.env.EXPO_PUBLIC_DB_URL + 'member/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status == 404) {

    }

    if (response.status == 401) {

    }

    if (response.status == 200) {
      const data = await response.json()
      let noOfOrgs = data.organisations ? data.organisations.length : 0;

      let user: User = {
        isSignedIn: true,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        mobilePhone: data.mobilePhone,
        email: data.email,
        organisations: data.organisations,
        noOrganisations: noOfOrgs
      }
      setUserDetails(user)

      //if (user.firstName == '' || user.firstName == null) {
      //router.replace('/setupuserdetails')
      //}
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Render balance card
  const renderBalanceCard = () => {
    return (
      <View style={styles.balanceCard}>
        <View style={styles.balanceCardView}>
          <Text style={styles.balanceValue}>15th March 2025</Text><Text style={{ backgroundColor: '#3C5C8B', padding: 7, borderRadius: 30, color: COLORS.white }}>14:00 - 15:00</Text>
        </View>
        <View style={styles.featureColumn}>
          <View style={styles.profileLeftContainer}>
            <View style={{ marginLeft: 16, marginTop: 5 }}>
              <Text style={styles.name}>Purple Pickleball</Text>
            </View>
          </View>
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
          data={userDetails.organisations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ClubCard
              name={item.orgName}
              onPress={() => console.log("Card Pressed")}
            />
          )} />
      </View>
    )
  }

  const renderAllSessions = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          horizontal
          data={userDetails.organisations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ClubCard
              name={item.orgName}
              onPress={() => console.log("Card Pressed")}
            />
          )} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <ImageBackground source={images.bg} style={styles.bg}>
        <StatusBar style="light" />

        <View style={styles.container}>

          <View style={styles.profileContainer}>
            <View style={styles.profileLeftContainer}>
              <View>
                <FontAwesome5 name="user-circle" size={32} color="white" />
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={{ color: 'white' }}>Welcome</Text>
                <Text style={{ color: 'white' }}>{userDetails.firstName}</Text>
              </View>
            </View>
            <View style={styles.profileRightContainer}>
              <Image
                source={icons.alerts}
                contentFit='contain'
                style={styles.icon}
              />
            </View>
          </View>
          <View style={{ top: -40 }}>
            <SubHeaderItem
              title="Booked Sessions"
              subtitle="View All"
              onPress={() => navigate("yourcard")}
            />           
          </View>
          {renderBalanceCard()}

        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}//

const styles = StyleSheet.create({
  area: {
    flex: 1,
    //backgroundColor: COLORS.white,
    margin: 0,
    height: "100%",
  },
  container: {
    flex: 1,
    //backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    height: 92,
    paddingVertical: 16,
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
    height: 140,
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
    color: "#3C5C8B",
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
    alignItems: "center",
    marginTop: 20
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
    //borderRadius: 23,
    //backgroundColor: "#ECE7FF",
    marginBottom: 12
  },
  featureIcon: {
    height: 48,
    width: 48
  },
  logo: {
    height: 68,
    width: 68
  },
  featureText: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.primary,
  },
  logoText: {
    color: "#000000",
    fontSize: 20,
  },
  qrContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between"
  },
  qrInfoContainer: {
    width: (SIZES.width - 32) / 2 - 12,
    height: 72,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  qrIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#F1EDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  qrIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.primary
  },
  qrText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.primary
  },
  profileContainer: {
    height: 150,
    width: SIZES.width,
    borderRadius: 10,
    padding: 20,
    //backgroundColor: COLORS.header,
    //marginHorizontal: 16,
    //marginVertical: 6,
    top: -22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileLeftContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  profileRightContainer: {
    height: 26,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  iconContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  icon: {
    width: 28,
    height: 28,
  },
  bg: {
    width: '100%',
    height: '100%',
  }
})
export default HomeScreen 