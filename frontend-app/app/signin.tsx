import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, images } from '../constants'
import { Image } from 'expo-image'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import { OtpInput } from "react-native-otp-entry";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { router } from 'expo-router';

const Signin = () => {
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const [confirm, setConfirm] = useState(null);

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      console.log("the user: " + JSON.stringify(user))
      if (user?.displayName == null || user?.displayName == '') {
        router.push('/setupuserdetails')
      } else {
        getMember()
        router.push('/(tabs)')
      }
    }
  }

  const getMember = async () => {
    let uid = auth().currentUser?.uid;
    console.log(uid);

    const querySnapshot = await firestore()
      .collection('member')
      .where('uid', '==', uid)
      .get();

    let member = null;
    querySnapshot.forEach(documentSnapshot => {
      if (documentSnapshot.data().uid === uid)
        member = documentSnapshot.data()
    });

    if (member == null) {
      //add member
      firestore()
        .collection('member')
        .add({
          uid: uid
        })
        .then(() => {
          console.log('User added!');
        });
    }
  }

  useEffect(() => {
    setConfirm(null)
    console.log("what is user: " + JSON.stringify(auth().currentUser))
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber() {
    console.log(phone)
    const confirmation = await auth().signInWithPhoneNumber('+44' + phone);
    console.log("confirmation: " + confirmation)
    setConfirm(confirmation);
  }

  async function confirmCode(text: string) {
    console.log(text)
    try {
      await confirm.confirm(text);
      console.log("suvccess")
      //router.push('/(tabs)')
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (confirm != null) {
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
                onTextChange={(code) => setCode(code)}
                focusColor={COLORS.primary}
                focusStickBlinkingDuration={500}
                onFilled={(text) => confirmCode(text)}
                //onFilled={(text) => memberDetails()}
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
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <ImageBackground source={images.bg} style={styles.bg}>
        <Text style={styles.formTitle}>Let's Go!</Text>
        <View
          style={{
            flexDirection: "row",
            borderColor: COLORS.white,
            borderWidth: .4,
            borderRadius: 6,
            height: 58,
            //width: SIZES.width - 44,
            marginLeft: '5%',
            marginRight: "5%",
            alignItems: 'center',
            marginVertical: 16,
            backgroundColor: COLORS.white,
            //justifyContent: "center",
          }}>
          <View
            style={{
              width: 90,
              height: 50,
              marginHorizontal: 5,
              flexDirection: "row",
              backgroundColor: COLORS.white,
            }}
          >
            <View style={{ justifyContent: "center", marginLeft: 5 }}>
              <Image
                source={{ uri: 'https://flagsapi.com/GB/flat/64.png' }}
                contentFit="contain"
                style={{
                  width: 40,
                  height: 40
                }}
              />
            </View>

            <View style={{ justifyContent: "center", marginLeft: 5 }}>
              <Text style={{ color: "#000", fontSize: 16 }}>+44</Text>
            </View>
          </View>
          {/* Phone Number Text Input */}
          <TextInput
            style={{
              flex: 1,
              marginVertical: 10,
              height: 40,
              fontSize: 14,
              color: COLORS.black,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: "center"
            }}
            placeholder="Enter your phone number"
            placeholderTextColor={COLORS.black}
            value={phone}
            onChangeText={(e) => setPhone(e)}
            selectionColor="#111"
            keyboardType="numeric"
          />
        </View>
        <View style={{ marginTop: '20px' }}>
          <Button
            title="Continue"
            onPress={signInWithPhoneNumber}
            filled
            style={styles.filledBtn}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    margin: 0,
    height: "100%",
    //backgroundColor: COLORS.white,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    marginTop: '25%',
    marginBottom: '10px'
  },
  formSubTitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.white,
    textAlign: "center",
    paddingHorizontal: 16
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledBtn: {
    //width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    //backgroundColor: COLORS.primary,
    backgroundColor: '#3C5C8B',
    borderColor: '#3C5C8B',
    marginLeft: '15%',
    marginRight: "15%",
    color: '#FFF',
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
  },
  bg: {
    width: '100%',
    height: '100%',
  }
})
export default Signin