import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, illustrations } from '../constants'
import { Image } from 'expo-image'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import InputLabel from '../components/InputLabel'
import Input from '../components/Input'
import { useNavigation } from 'expo-router'
import Button from '../components/Button'

type Nav = {
  navigate: (value: string) => void
}

interface InputValues {
  newPassword: string,
  confirmNewPassword: string
}

interface InputValidities {
  newPassword: boolean | undefined,
  confirmNewPassword: boolean | undefined
}

interface FormState {
  inputValues: InputValues
  inputValidities: InputValidities
  formIsValid: boolean
}

const initialState: FormState = {
  inputValues: {
    newPassword: '',
    confirmNewPassword: '',
  },
  inputValidities: {
    newPassword: false,
    confirmNewPassword: false,
  },
  formIsValid: false,
}


const ResetPassword = () => {
  const { navigate } = useNavigation<Nav>()
  const [error, setError] = useState<string | undefined>()
  const [formState, dispatchFormState] = useReducer(reducer, initialState)

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      })
    },
    [dispatchFormState]
  )

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error)
    }
  }, [error])
  return (
    <SafeAreaView style={styles.area}>
      <PageContainer>
        <ScrollView>
          <Text style={styles.formTitle}>Reset Password</Text>
          <View style={{ alignItems: "center" }}>
            <Image
              source={illustrations.forgetPassword}
              contentFit='contain'
              style={styles.illustration}
            />
          </View>
          <Text style={styles.formSubtitle}>Enter your new password below to reset</Text>
          <Text style={styles.formSubtitle}>your password</Text>
          <View style={{ marginVertical: 32 }}>
            <InputLabel title="New Password" />
            <Input
              id="newPassword"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['newPassword']}
              placeholder="***********"
              placeholderTextColor={COLORS.black}
            />
            <InputLabel title="Confirm New Password" />
            <Input
              id="confirmNewPassword"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['confirmNewPassword']}
              placeholder="***********"
              placeholderTextColor={COLORS.black}
            />
          </View>
          <Button
            title="Save"
            filled
            onPress={() => navigate('account')}
            style={styles.btn}
          />
        </ScrollView>
      </PageContainer>
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
  formSubtitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: "black",
    textAlign: "center",
    paddingHorizontal: 16,
    marginVertical: 2
  },
  illustration: {
    height: 179,
    width: 179,
    marginVertical: 32,
  },

  btn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginVertical: 16
  }
})

export default ResetPassword