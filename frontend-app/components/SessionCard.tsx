import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Image } from 'expo-image';
import { COLORS, SIZES } from '../constants';
import { useAuth } from '@clerk/clerk-react'

interface SessionCardProps {
    avatar: string;
    id: string;
    name: string;
    location: string;
    date: string;
    amount: number;
    onPress: () => void;
}

type Booking = {
    sessionId: string;
    sessionDate: string;
};

const SessionCard: React.FC<SessionCardProps> = ({ avatar, id, name, location, date, amount, onPress }) => {
    const { getToken } = useAuth()
    const [buttonText, setButtonText] = React.useState('Book In')

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

    return (
        <TouchableOpacity style={styles.container} >
            <View style={{ flexDirection: "row" }}>
                <View
                    style={styles.iconContainer}>
                    <Image
                        source={avatar}
                        contentFit='contain'
                        style={styles.icon}
                    />
                    <Text style={styles.title}>{name}</Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.title}>{location}</Text>
                    <Text style={styles.title}>{date}</Text>
                </View>


            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText} onPress={bookSession}>{buttonText}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150,
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
    iconContainer: {
        marginRight: 16,
        alignItems: "center",
    },
    icon: {
        height: 48,
        width: 48,
        borderRadius: 24,
    },
    title: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.primary,
        marginVertical: 4
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.primary
    },
    amount: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.primary
    },
    btn: {
        width: 80,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.zopa,
        borderRadius: 6,
        marginTop: 12
    },
    btnText: {
        fontSize: 12,
        fontFamily: "medium",
        color: COLORS.zopa_dark_purple
    },
})

export default SessionCard