import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants'
import Header from '../components/Header'
import InputLabel from '../components/InputLabel'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Input from '../components/Input'
import { useNavigation } from 'expo-router'
import Button from '../components/Button'

type Nav = {
    navigate: (value: string) => void
}

interface InputValues {
    currentEmail: string
    newEmail: string
    password: string
}

interface InputValidities {
    currentEmail: boolean | undefined
    newEmail: boolean | undefined
    password: boolean | undefined
}

interface FormState {
    inputValues: InputValues
    inputValidities: InputValidities
    formIsValid: boolean
}

const initialState: FormState = {
    inputValues: {
        currentEmail: '',
        newEmail: '',
        password: '',
    },
    inputValidities: {
        currentEmail: false,
        newEmail: false,
        password: false,
    },
    formIsValid: false,
}

const ChangeEmailScreen = () => {
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
            <View style={styles.container}>
                <Header title="Change Email" />
                <View style={{ margin: 16 }}>
                    <InputLabel title="Current Email Address" />
                    <Input
                        id="currentEmail"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['currentEmail']}
                        placeholder="alexander@gmail.com"
                        placeholderTextColor={COLORS.black}
                    />
                    <InputLabel title="New Email Address" />
                    <Input
                        id="newEmail"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['newEmail']}
                        placeholder="alexander23@gmail.com"
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
                </View>
                <Button
                    title="Save Email"
                    onPress={() => navigate("profile")}
                    filled
                    style={{
                        position: "absolute",
                        bottom: 32,
                        width: SIZES.width - 32,
                        marginHorizontal: 16
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})

export default ChangeEmailScreen