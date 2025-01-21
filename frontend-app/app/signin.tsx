import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, icons, illustrations } from '../constants'
import { Image } from 'expo-image'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'
import { ClerkAPIError, PhoneCodeFactor, SignInFirstFactor } from '@clerk/types'
import { useRouter } from 'expo-router';

type Nav = {
  navigate: (value: string) => void
}

const Signin = () => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const { signUp } = useSignUp()
  const [verifyingSignIn, setVerifyingSignIn] = React.useState(false)
  const [verifyingSignUp, setVerifyingSignUp] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const [errors, setErrors] = React.useState<ClerkAPIError[]>()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    //setErrors(undefined)

    if (!isLoaded && !signIn) return null

    try {
      // Start the sign-in process using the phone number method
      const { supportedFirstFactors } = await signIn.create({
        identifier: '+44' + phone,
      })

      // Filter the returned array to find the 'phone_code' entry
      const isPhoneCodeFactor = (factor: SignInFirstFactor): factor is PhoneCodeFactor => {
        return factor.strategy === 'phone_code'
      }
      const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor)

      if (phoneCodeFactor) {
        // Grab the phoneNumberId
        const { phoneNumberId } = phoneCodeFactor

        // Send the OTP code to the user
        await signIn.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        })

        // Set verifying to true to display second form
        // and capture the OTP code
        setVerifyingSignIn(true)
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
      if (isClerkAPIResponseError(err)) {
        let errorArray: ClerkAPIError[] = err.errors
        errorArray.forEach(ele => {
          if (ele.code === 'form_identifier_not_found') {
            //try sign up insetad
            onSignUpPress()
          }
        });
      }
    }
  }

  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp?.create({
        'phoneNumber': '+44' + phone
      })

      // Send user an email with verification code
      //await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      await signUp?.preparePhoneNumberVerification({strategy: 'phone_code'})

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerifyingSignUp(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

async function handleVerification(e: React.FormEvent) {
  e.preventDefault()

  if (!isLoaded && !signIn) return null

  try {
    // Use the code provided by the user and attempt verification
    const signInAttempt = await signIn.attemptFirstFactor({
      strategy: 'phone_code',
      code,
    })

    // If verification was completed, set the session to active
    // and redirect the user
    if (signInAttempt.status === 'complete') {
      await setActive({ session: signInAttempt.createdSessionId })

      router.push('/')
    } else {
      // If the status is not complete, check why. User may need to
      // complete further steps.
      console.error(signInAttempt)
    }
  } catch (err) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling
    console.error('Error:', JSON.stringify(err, null, 2))
  }
}

if (verifyingSignIn) {
  router.replace('/verifysignin')
}

if (verifyingSignUp) {
  router.replace('/verifyaccount')
}

return (
  <SafeAreaView style={styles.area}>
    <PageContainer>
      <ScrollView>
      <View style={{ alignItems: "center" }}>
            <Image
              source={illustrations.forgetPassword}
              contentFit='contain'
              style={styles.illustration}
            />
          </View>
        <Text style={styles.formTitle}>Let's Go!</Text>
        <Text style={styles.formSubTitle}>Enter your mobile number to get going.</Text>
        <Text style={styles.formSubTitle}>We'll send a verification code to your mobile.</Text>
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

            <View style={{ justifyContent: "center" }}>

            </View>
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
            value={phone}
            onChangeText={(e) => setPhone(e)}
            selectionColor="#111"
            keyboardType="numeric"
          />
        </View>
      </ScrollView>
    </PageContainer>
    <View style={styles.footer}>
      <Button
        title="Continue"
        filled
        onPress={handleSubmit}
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
  illustration: {
    height: 179,
    width: 179,
    marginVertical: 32,
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
export default Signin