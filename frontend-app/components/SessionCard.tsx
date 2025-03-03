import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { COLORS, SIZES, icons, images } from '../constants'
import { useAuth } from '@clerk/clerk-react'
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { useNavigation } from 'expo-router'

interface ContainerProps {
    item: string | number;
    isSelected: boolean;
    onSelect: () => void;
}

type Nav = {
    navigate: (value: string) => void
}

const Container: React.FC<ContainerProps> = ({ item, isSelected, onSelect }) => (
    <TouchableOpacity
        style={[styles.amountContainer, isSelected && styles.selectedContainer]}
        onPress={onSelect}
    >
        <Text style={{
            fontSize: 14,
            fontFamily: 'medium',
            color: isSelected ? COLORS.white : "gray"
        }}>${item}</Text>
    </TouchableOpacity>
);

interface SessionCardProps {
    avatar: string;
    id: string;
    name: string;
    location: string;
    date: string;
    price: number;
    bookingsString: string;
    onPress: () => void;
}

type Booking = {
    sessionId: string;
    sessionDate: string;
};

const SessionCard: React.FC<SessionCardProps> = ({ avatar, id, name, location, date, price, people, isBookable, bookingsString, onPress }) => {
    const { getToken } = useAuth()
    const [buttonText, setButtonText] = React.useState('Book In')
    const navigation = useNavigation();
    const { navigate } = useNavigation<Nav>()

    const eventDate = Date.parse(date);
    let eventAsDate = new Date(eventDate);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateString = eventAsDate.toLocaleDateString("en-GB", options)


    const bookSession = async () => {
        let booking: Booking = {
            sessionId: id,
            sessionDate: date,
        }
        const token = await getToken()
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(booking)
        };

        try {
            await fetch(
                process.env.EXPO_PUBLIC_DB_URL + 'booking/', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            //router.push('/(tabs)')
                            setButtonText('Booked')
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    // Render Send
    const renderCard = () => {
        return (
            <View style={{
                marginHorizontal: 16
            }}>

                <Text style={styles.subtitle}>{name}</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 12
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={images.avatar1}
                            contentFit='contain'
                            style={{
                                height: 48,
                                width: 48,
                                borderRadius: 999
                            }}
                        />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={{
                                fontFamily: "medium",
                                fontSize: 14,
                                color: COLORS.primary,
                                marginBottom: 4
                            }}>{dateString}</Text>
                            <Text style={{
                                fontFamily: "regular",
                                fontSize: 12,
                                color: "gray"
                            }}>{location}</Text>
                        </View>
                    </View>

                </View>

                <View>
                    <Text style={styles.subtitle}>{bookingsString} spaces taken</Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 12
                }}>
                    <Text style={{
                        fontSize: 32,
                        color: COLORS.primary,
                        fontFamily: 'semiBold',
                        marginVertical: 6
                    }}>£{price}</Text>
                    {isBookable &&
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnText} onPress={bookSession}>{buttonText}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={isBookable ? styles.container : styles.containerNotAvailable}>
            <View style={{ flex: 1, backgroundColor: isBookable ? COLORS.primary: COLORS.fullyBooked }}>
                <View style={{ flex: 1, backgroundColor: isBookable ? COLORS.white: COLORS.fullyBooked }}>
                    <ScrollView>
                        {renderCard()}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        //height: 150,
        width: SIZES.width - 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        marginVertical: 6
    },
    containerNotAvailable: {
        //height: 150,
        width: SIZES.width - 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        backgroundColor: COLORS.fullyBooked,
        marginHorizontal: 16,
        marginVertical: 6
    },
    cardInfoContainer: {
        height: 94,
        width: SIZES.width - 32,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 16,
        marginHorizontal: 16,
        top: -32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    typeCard: {
        fontSize: 4,
        fontFamily: "regular",
        color: "rgba(255,255,255,.8)"
    },
    typeCardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    date: {
        fontSize: 4,
        fontFamily: "regular",
        color: "rgba(255,255,255,.8)"
    },
    debit: {
        fontSize: 12,
        fontFamily: "medium",
        color: COLORS.black
    },
    amount: {
        fontFamily: "semiBold",
        fontSize: 7,
        color: COLORS.white
    },
    cardNumber: {
        fontSize: 6,
        fontFamily: "medium",
        color: COLORS.white,
        marginVertical: 12
    },
    cardContainer: {
        width: 96,
        height: 62,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        marginRight: 12,
        padding: 6
    },
    bottomCardContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 0
    },
    cardLogo: {
        width: 16,
        height: 9
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 8,
        marginBottom: 16,
        backgroundColor: COLORS.primary,
        height: 78
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.white
    },
    title: {
        fontSize: 16,
        fontFamily: "medium",
        color: COLORS.white,
    },
    moreIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.white
    },
    slider: {
        width: '100%',
        marginTop: 10,
        height: 40
    },
    amountContainer: {
        backgroundColor: COLORS.white,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: 98,
        height: 48,
        borderRadius: 12,
        borderWidth: .4,
        borderColor: "gray",
        marginBottom: 10
    },
    selectedContainer: {
        backgroundColor: COLORS.primary,
    },
    subtitle: {
        fontFamily: "medium",
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 12
    },
    btn: {
        width: 120,
        height: 51,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        backgroundColor: COLORS.zopa,
        borderRadius: 6,
        marginTop: 12
    },
    btnText: {
        fontSize: 16,
        fontFamily: "medium",
        color: COLORS.zopa_dark_purple
    },
})

export default SessionCard