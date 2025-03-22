import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';
import { COLORS, SIZES, icons, images } from '../constants'
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { useNavigation } from 'expo-router'
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

interface BookingCardProps {
    avatar: string;
    id: string;
    name: string;
    member: string;
    onPress: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ id, name, member, onPress }) => {
    const [buttonText, setButtonText] = React.useState('Book In')
    const navigation = useNavigation();
    //const [member, setMember] = React.useState({})
    const { navigate } = useNavigation<Nav>()

    const bookSession = async () => {
        let member = await getMember()
        console.log('id: ' + id)
        firestore()
            .collection('booking')
            .add({
                member: member.uid,
                member_name: member.first_name + ' ' + member.last_name,
                session_id: id,
                session_date: date
            })
            .then(() => {
                console.log('Booking added!');
            });
    }

    // Render Send
    const renderCard = () => {
        console.log("price: " + price)
        return (
            <View style={{
                marginHorizontal: 16
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //marginVertical: 2
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={images.avatar1}
                            contentFit='contain'
                            style={{
                                height: 48,
                                width: 48,
                                borderRadius: 999,
                                marginRight: 10
                            }}
                        />

                        <Text style={styles.subtitle}>{name}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 12
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={images.avatar1}
                    contentFit='contain'
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.details}></Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.details}></Text>
                    </View>
                    {/*<Text style={styles.sports}>{item.sports.join(' | ')}</Text> */}
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.price}></Text>
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
        width: 60,
        height: 60,
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

export default BookingCard