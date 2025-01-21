import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, FONTS } from '../constants'
import Checkbox from 'expo-checkbox'
import * as Animatable from "react-native-animatable"
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'

type Nav = {
    navigate: (value: string) => void
}

interface InputValues {
    email: string
    password: string
}

interface InputValidities {
    email: boolean | undefined
    password: boolean | undefined
}

interface FormState {
    inputValues: InputValues
    inputValidities: InputValidities
    formIsValid: boolean
}

const initialState: FormState = {
    inputValues: {
        email: '',
        password: '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}
const Login = () => {
    const { navigate } = useNavigation<Nav>()
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setChecked] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [acceptTerms, setAcceptTerms] = useState(false)

    const handleTermsToggle = () => {
        setAcceptTerms(!acceptTerms)
    }

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
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{ flex: 1, backgroundColor: COLORS.blue }}>
            <StatusBar hidden />
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerTitle}>Log In</Text>
                <Text
                    style={commonStyles.subHeaderTitle}>Please sign in to your existing account</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                <Text style={commonStyles.formTitle}>Welcome Back!</Text>
                <Text style={commonStyles.inputHeader}>Email</Text>
                <Input
                    id="email"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['email']}
                    placeholder="example@gmail.com"
                    placeholderTextColor={COLORS.black}
                />
                <Text style={commonStyles.inputHeader}>Password</Text>
                <Input
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['password']}
                    id="password"
                    placeholder="*************"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
                />

                <View style={commonStyles.checkBoxContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            style={commonStyles.checkbox}
                            value={isChecked}
                            color={isChecked ? COLORS.primary : COLORS.black}
                            onValueChange={setChecked}
                        />
                        <Text style={{ ...FONTS.body4 }}>Remenber me</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigate("forgotpassword")}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="LOG IN"
                    isLoading={isLoading}
                    filled
                    onPress={() => navigate('account')}
                    style={commonStyles.btn}
                />
                <View style={commonStyles.center}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>Don't have an account?{" "}</Text>
                    <TouchableOpacity
                        onPress={() => navigate("signup")}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </LinearGradient>
    )
}

export default Login