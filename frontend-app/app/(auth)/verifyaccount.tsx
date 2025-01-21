import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../../components/PageContainer'
import { COLORS, SIZES } from '../../constants'
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from 'expo-router'
import Button from '../../components/Button'
import { useSignUp } from '@clerk/clerk-expo'
import { router } from 'expo-router';

type Nav = {
  navigate: (value: string) => void;
}

const VerifyAccount = () => {
  const { navigate } = useNavigation<Nav>();
  const [error, setError] = useState<string | undefined>();
  const [code, setCode] = React.useState('')
  const { isLoaded, signUp, setActive } = useSignUp()

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);

   const onVerifyPress = async (text: string) => {
      if (!isLoaded) return
  
      try {
        // Use the code the user provided to attempt verification
        const signUpAttempt = await signUp.attemptPhoneNumberVerification({
          'code': text
        })
  
        // If verification was completed, set the session to active
        // and redirect the user
        if (signUpAttempt.status === 'complete') {
          await setActive({ session: signUpAttempt.createdSessionId })
          router.replace('/')
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(signUpAttempt, null, 2))
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
    }

  return (
    <SafeAreaView style={styles.area}>
      <PageContainer>
        <ScrollView>
          <Text style={styles.formTitle}>Verify Account</Text>
          <Text style={styles.formSubTitle}>Enter digit code we have sent to</Text>
          <Text style={styles.phoneNumber}>+6285788773880</Text>
          <View style={{ marginVertical: 16 }}>
          <OtpInput 
              numberOfDigits={6}
              onTextChange={(code)=> setCode(code)} 
              focusColor={COLORS.primary}
              focusStickBlinkingDuration={500}
              onFilled={(text) => onVerifyPress(text)}
              theme={{
                pinCodeContainerStyle: {
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.black,
                  borderRadius: 10,
                  height: 58,
                  width: 58,
                  borderBottomWidth: 2,
                },
                pinCodeTextStyle: {
                  color: "black",
                }
              }}
              />
          </View>
          <Text style={styles.formSubTitle}>Haven’t received verification code?</Text>
          <TouchableOpacity>
            <Text style={styles.resendCode}>Resend Code</Text>
          </TouchableOpacity>
        </ScrollView>
      </PageContainer>
      <View style={styles.footer}>
        <Button
          title="Verify Now"
          filled
          onPress={() => navigate('accountcreated')}
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
    color: "black",
    textAlign: "center",
    paddingHorizontal: 16
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: "medium",
    color: "black",
    textAlign: "center",
    paddingHorizontal: 16,
    marginVertical: 8
  },
  OTPStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderRadius: 10,
    height: 58,
    width: 58,
    borderBottomWidth: 2,
  },
  footer: {
    width: '100%',
    marginVertical: 12,
    position: "absolute",
    bottom: 36,
    right: 16,
    left: 16
  },
  resendCode: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    textDecorationColor: COLORS.primary,
    textDecorationLine: "underline",
    marginVertical: 4
  },
  filledBtn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
})

export default VerifyAccount