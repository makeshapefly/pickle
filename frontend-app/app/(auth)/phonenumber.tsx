import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../../components/PageContainer'
import { COLORS, SIZES, icons } from '../../constants'
import { Image } from 'expo-image'
import { TextInput } from 'react-native'
import Button from '../../components/Button'
import { useSignUp } from '@clerk/clerk-expo'
import { router } from 'expo-router';

type Nav = {
  navigate: (value: string) => void
}

const PhoneNumber = () => {
  const [setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [phoneNumber, setphoneNumber] = useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const { isLoaded, signUp, setActive } = useSignUp()

  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        phoneNumber
      })

      // Send user an email with verification code
      //await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      await signUp.preparePhoneNumberVerification({strategy: 'phone_code'})

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
      router.replace('/verifyaccount')
    }

    return (
      <SafeAreaView style={styles.area}>
      <PageContainer>
        <ScrollView>
          <Text style={styles.formTitle}>Get Started</Text>
          <Text style={styles.formSubTitle}>Enter your mobile number to get going</Text>
          <View
            style={{
              flexDirection: "row",
              borderColor: COLORS.black,
              borderWidth: .4,
              borderRadius: 6,
              height: 58,
              width: SIZES.width - 44,
              alignItems: 'center',
              marginVertical: 16
            }}>
            <View
              style={{
                width: 90,
                height: 50,
                marginHorizontal: 5,
                flexDirection: "row",
              }}
            >
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{ uri: 'https://flagsapi.com/GB/flat/64.png' }}
                  contentFit="contain"
                  style={{
                    width: 30,
                    height: 30
                  }}
                />
              </View>

              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text style={{ color: "#111", fontSize: 12 }}>+44</Text>
              </View>
            </View>
            {/* Phone Number Text Input */}
            <TextInput
              style={{
                flex: 1,
                marginVertical: 10,
                height: 40,
                fontSize: 14,
                color: "#111"
              }}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              value={phoneNumber}
              onChangeText={(phoneNumber) => setphoneNumber(phoneNumber)}
              selectionColor="#111"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
      </PageContainer>
      <View style={styles.footer}>
        <Button
          title="Sign In"
          filled
          onPress={onSignUpPress}
          style={styles.filledBtn}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18,
  },
  formSubTitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.black,
    textAlign: "center",
    paddingHorizontal: 16
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledBtn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  outlinedBtn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  footer: {
    width: '100%',
    marginVertical: 12,
    position: "absolute",
    bottom: 22,
    right: 16,
    left: 16
  }
})
export default PhoneNumber