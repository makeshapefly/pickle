import React, { memo, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import auth from '@react-native-firebase/auth';

import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import Container from 'components/Container';
import { useTranslation } from 'react-i18next';
import { Images } from 'assets/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { RuleEmail, RulePassword } from 'utils/rules';
import useToggle from 'hooks/useToggle';
import Flex from 'components/Flex';
import { RootStackParamList } from 'navigation/types';
import useAuth from 'hooks/useAuth';
import { globalStyle } from 'styles/globalStyle';

const Login = memo(() => {
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const [confirm, setConfirm] = useState(null);
  const [otp, setOtp] = useState('');

  const { navigate, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(['auth', 'common']);

  const { signIn } = useAuth();
  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const onLogin = () => {
    signIn();
    nextScreen('MainBottomTab');
  };
  const [invisible, setInvisible] = useToggle(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'lehieuds@gmail.com',
      password: '123456Aa',
    },
  });
  const [canContinue, setCanContinue] = React.useState(false);
  React.useEffect(() => {
    if (errors.email === undefined && errors.password === undefined) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [errors.email, errors.password]);
  const onFacebook = React.useCallback(() => { }, []);
  const onTwitter = React.useCallback(() => { }, []);
  const onAuth = React.useCallback(
    screen => () => {
      navigate('AuthStack', { screen: screen });
    },
    [],
  );

  async function signInWithPhoneNumber() {
    console.log(phone)
    const confirmation = await auth().signInWithPhoneNumber('+44' + phone);
    console.log("confirmation: " + confirmation)
    setConfirm(confirmation);
  }

  function onAuthStateChanged(user) {
    if (user) {
      console.log("the user: " + JSON.stringify(user))
      if (user?.displayName == null || user?.displayName == '') {
        //router.push('/setupuserdetails')
      } else {
        //getMember()
        //router.push('/(tabs)')
      }
    }
  }

  async function confirmCode(text: string) {
    console.log(text)
    try {
      await confirm.confirm(text);
      console.log("suvccess")
      navigate('MainBottomTab')
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  useEffect(() => {
    setConfirm(null)
    console.log("what is user: " + JSON.stringify(auth().currentUser))
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (confirm != null) {
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>
          <Image source={Images.logo} />
          <Text mt={24} category="h7" mb={72}>
            Get Started
          </Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(code) => setCode(code)}
            focusStickBlinkingDuration={500}
            onFilled={(text) => confirmCode(text)}
            //onFilled={(text) => memberDetails()}
            theme={{
              pinCodeContainerStyle: {
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
          <Button
            onPress={confirmCode()}
            disabled={canContinue}
            style={globalStyle.shadowBtn}>
            Continue
          </Button>
        </KeyboardAwareScrollView>
      </Container>
    )
  }

  return (
    <Container style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <Image source={Images.logo} />
        <Text mt={24} category="h7" mb={72}>
          Get Started
        </Text>
        <Controller
          control={control}
          name="email"
          //rules={RuleEmail}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Mobile Number'
              status={errors.email ? 'warning' : 'basic'}
              style={styles.email}
              value={phone}
              onChangeText={(e) => setPhone(e)}
              onTouchStart={handleSubmit(() => { })}
              onTouchEnd={handleSubmit(() => { })}
              onBlur={onBlur}
              //keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
        <Button
          onPress={signInWithPhoneNumber}
          disabled={canContinue}
          style={globalStyle.shadowBtn}>
          Continue
        </Button>
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginTop: 40,
    paddingHorizontal: 24,
    zIndex: 10,
  },
  email: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  password: {
    borderBottomWidth: 2,
  },
  facebook: {
    marginBottom: 16,
    flex: 1,
  },
  logoSocial: {
    position: 'absolute',
    left: 16,
    top: 14,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  forgetPass: {
    alignSelf: 'center',
  },
});
