import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, illustrations } from '../constants'
import { Image } from 'expo-image'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router';

type User = {
    firstName: string;
    lastName: string;
    mobilePhone: string;
    email: string;
};

const Setupuserdetails = () => {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const { getToken } = useAuth()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        let user: User = {
            firstName: firstName,
            lastName: lastName,
            mobilePhone: "",
            email: "",
        }

        const token = await getToken()
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user)
        };

        try {
            await fetch(
                process.env.EXPO_PUBLIC_DB_URL + 'member/', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            router.push('/(tabs)')
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
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
                    <Text style={styles.formTitle}>Please add your name to continue</Text>
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
                                marginHorizontal: -20,
                                flexDirection: "row",
                            }}
                        >
                        </View>

                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: 10,
                                height: 40,
                                fontSize: 14,
                                color: "#111"
                            }}
                            placeholder="First Name"
                            placeholderTextColor={COLORS.black}
                            value={firstName}
                            onChangeText={(e) => setFirstName(e)}
                            selectionColor="#111"
                            keyboardType="numeric"
                        />

                    </View>
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
                                marginHorizontal: -20,
                                flexDirection: "row",
                            }}
                        >
                        </View>

                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: 10,
                                height: 40,
                                fontSize: 14,
                                color: "#111"
                            }}
                            placeholder="Last Name"
                            placeholderTextColor={COLORS.black}
                            value={lastName}
                            onChangeText={(e) => setLastName(e)}
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

export default Setupuserdetails