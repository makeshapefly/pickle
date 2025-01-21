import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import PageContainer from '../components/PageContainer'
import InputLabel from '../components/InputLabel'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Input from '../components/Input'
import { COLORS, SIZES } from '../constants'
import CheckboxItem from '../components/CheckboxItem'
import Button from '../components/Button'

type Nav = {
    navigate: (value: string) => void
}

interface InputValues {
    fullName: string
    email: string
    password: string
}

interface InputValidities {
    fullName: boolean | undefined
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
        fullName: '',
        email: '',
        password: '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
    },
    formIsValid: false,
}

const signup = () => {
    const { navigate } = useNavigation<Nav>()
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
        <SafeAreaView style={styles.area}>
            <PageContainer>
                <ScrollView>
                    <Text style={styles.formTitle}>Welcome!</Text>
                    <View>
                        <InputLabel title="Full Name" />
                        <Input
                            id="fullName"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['fullName']}
                            placeholder="John Doe"
                            placeholderTextColor={COLORS.black}
                        />
                        <InputLabel title="Email Address" />
                        <Input
                            id="email"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['email']}
                            placeholder="example@example.com"
                            placeholderTextColor={COLORS.black}
                        />
                        <InputLabel title="Password" />
                        <Input
                            id="password"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['password']}
                            placeholder="**********"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={true}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <CheckboxItem
                                label=""
                                selected={acceptTerms}
                                onSelect={handleTermsToggle}
                            />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.body6}>I accept the </Text>
                                <Text style={styles.h6}>
                                    Terms & Conditions{' '}
                                </Text>
                                <Text style={styles.body6}>And </Text>
                                <Text style={styles.h6}>Privacy Policy </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', marginVertical: 12 }}>
                        <Button
                            title="Create Account"
                            filled
                            onPress={() => navigate('createpassword')}
                            style={styles.filledBtn}
                        />
                        <Button
                            title="Login Now"
                            onPress={() => navigate('login')}
                            textColor={COLORS.primary}
                            style={styles.outlinedBtn}
                        />

                        <View style={styles.footerContainer}>
                            <Text style={styles.body6}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => navigate('login')}>
                                <Text style={styles.h6}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    h6: {
        fontSize: 11,
        fontFamily: 'medium',
        color: COLORS.primary,
        textDecorationColor: COLORS.primary,
        textDecorationLine: 'underline',
    },
    body6: {
        fontSize: 11,
        fontFamily: 'regular',
        color: COLORS.black,
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
})

export default signup
