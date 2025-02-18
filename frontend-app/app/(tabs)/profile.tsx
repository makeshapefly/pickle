import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../../constants'
import { Image } from 'expo-image'
import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import ProfileItem from '../../components/ProfileItem'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../../components/Button'
import { launchImagePicker } from '../../utils/ImagePickerHelper'
import { useClerk } from '@clerk/clerk-react'
import * as Linking from 'expo-linking'

type Nav = {
  navigate: (value: string) => void
}

const ProfileScreen = () => {
  const { navigate } = useNavigation<Nav>();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<any>(null);
  const { signOut } = useClerk()

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker()

      if (!tempUri) return

      // set the image
      setImage({ uri: tempUri })
    } catch (error) { }
  }

  const handleSignOut = async () => {
      try {
        await signOut()
        Linking.openURL(Linking.createURL('/'))
      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
      }
    }

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Image
                source={images.error}
                contentFit='contain'
                style={styles.modalSuccess}
              />
              <Text style={styles.modalTitle}>Want to Logout ?</Text>
              <Text style={styles.modalSubtitle}>You will back to early app if you
                click the logout button</Text>
              <Button
                title="Logout Now"
                filled
                onPress={() => {
                  setModalVisible(false)
                }}
                style={styles.modalBtn}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Your Profile</Text>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileLeftContainer}>
              <View>
                <Image
                  source={
                    image === null ?
                      images.avatar6 :
                      image}
                  contentFit='cover'
                  style={styles.avatar}
                />
                <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                  <SimpleLineIcons name="pencil" size={8} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.name}>Alexander Michael</Text>
                <Text style={styles.phoneNumber}>0896 2102 7821</Text>
              </View>
            </View>
            <View style={styles.profileRightContainer}>
              <Text>Basic</Text>
            </View>
          </View>
          <View style={styles.settingsContainer}>
            <Text style={styles.subtitle}>Account</Text>
            <ProfileItem
              title="Change Personal Profile"
              icon={icons.user}
              onPress={() => navigate("changepersonalprofile")}
            />
            <ProfileItem
              title="Change Email Address"
              icon={icons.email}
              onPress={() => navigate("changeemail")}
            />
            <Text style={styles.subtitle}>More Settings</Text>
            <ProfileItem
              title="Help and Privacy"
              icon={icons.question}
              onPress={() => navigate("helpcenter")}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.btn}>
              <Button title="Sign out" onPress={handleSignOut} /> 
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {renderModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.primary
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryWhite
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    height: 72,
    paddingVertical: 16
  },
  headerText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "semiBold"
  },
  profileContainer: {
    height: 80,
    width: SIZES.width - 32,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 6,
    top: -22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 32
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
  name: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.primary,
    marginVertical: 4
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: "regular",
    color: "gray"
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
  subtitle: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.primary,
    marginVertical: 16
  },
  settingsContainer: {
    marginHorizontal: 16
  },
  logout: {
    fontFamily: "semiBold",
    color: "red",
    textDecorationLine: "underline",
    marginVertical: 22,
    textAlign: "center"
  },
  btn: {
    marginTop: 2,
    marginBottom: 36
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)"

  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 6
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 22
  },
  modalSuccess: {
    height: 217,
    width: 217,
    marginVertical: 22
  },
  modal: {
    height: 494,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  modalBtn: {
    width: "100%",
    marginTop: 12
  }
})

export default ProfileScreen