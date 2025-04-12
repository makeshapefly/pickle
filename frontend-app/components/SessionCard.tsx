import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';
import { COLORS, SIZES, icons, images } from '../constants'
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import Ionicons from '@expo/vector-icons/Ionicons';
//import { useNavigation } from 'expo-router'
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import getMember from '../app/actions/getMember'

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
    date: Date;
    dateString: string;
    sessionDate: string
    price: number;
    bookingsString: string;
    bookings: number;
    isBookable: boolean;
    isAlreadyBooked: boolean;
    onPress: () => void;
}

type Booking = {
    sessionId: string;
    sessionDate: string;
};

const SessionCard: React.FC<SessionCardProps> = ({ id, name, location, date, dateString, sessionDate, price, bookings, isBookable, bookingsString, isAlreadyBooked, onPress }) => {
    const [buttonText, setButtonText] = React.useState('Book In')
    //const navigation = useNavigation();
    //const { navigate } = useNavigation<Nav>()

    const bookSession = async () => {
        let member = await getMember()
        /*firestore()
            .collection('booking')
            .add({
                member: member.uid,
                member_name: member.first_name + ' ' + member.last_name,
                session_id: id.split("_")[0],
                session_name: name,
                session_date: sessionDate
            })
            .then(() => {
                console.log('Booking added!');
            });*/
    }

    return (
        <SafeAreaView style={isAlreadyBooked ? styles.containerNotAvailable : styles.container}>
            <View style={styles.card}>
                <Image
                    source={icons.smash}
                    contentFit='contain'
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.date}>{dateString}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Text style={styles.location}>{location}</Text>
                </View>
                <View>
                    <Text style={styles.details}>{bookings} booked on this session</Text>
                </View>
                {/*<Text style={styles.sports}>{item.sports.join(' | ')}</Text> */}
            </View>

            <View style={styles.card}>
                <Text style={styles.price}>£ {price}</Text>
                <View style={styles.info}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => onPress(id, name, sessionDate)}>Book Session</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        //height: 150,
        width: SIZES.width - 32,
        flexDirection: "column",
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
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        backgroundColor: COLORS.black,
        marginHorizontal: 16,
        marginVertical: 6
    },
    card: {
        flexDirection: 'row',
        //backgroundColor: '#fbfbfb',
        //borderWidth: 4,
        //borderColor: '#DCDCDC',
        padding: 10,
        //borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },
    price: {
        width: 60,
        height: 60,
        borderRadius: 40,
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    location: {
        fontSize: 14,
        color: '#888',
        marginVertical: 2,
    },
    date: {
        fontSize: 16,
        color: '#888',
        marginVertical: 5,
        fontWeight: 'bold',
        padding: 5
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 16,
        color: '#FFD700',
    },
    sports: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    button: {
        borderWidth: 1,
        borderColor: COLORS.zopa,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        //marginTop: 10,
        fontWeight: "bold",
        backgroundColor: COLORS.zopa,
    },
    btnText: {
        fontSize: 16,
        fontFamily: "medium",
        color: COLORS.zopa_dark_purple
    },
})

export default SessionCard