import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { COLORS, SIZES, icons, images } from '../constants'
import { useAuth } from '@clerk/clerk-react'
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons'
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

const data = [100, 200, 250, 300, 400, 500, 600, 700, 1000];


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

const SessionCard: React.FC<SessionCardProps> = ({ avatar, id, name, location, date, price, bookingsString, onPress }) => {
    const { getToken } = useAuth()
    const [buttonText, setButtonText] = React.useState('Book In')
    const navigation = useNavigation();
    const { navigate } = useNavigation<Nav>()
    const [modalVisible, setModalVisible] = useState(false);

    const eventDate = Date.parse(date);
    let eventAsDate = new Date(eventDate);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dateString = eventAsDate.toLocaleDateString("en-GB", options)

    const bookSession = async () =>  {
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

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        contentFit='contain'
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Send</Text>
                <TouchableOpacity>
                    <Image
                        source={icons.more}
                        contentFit='contain'
                        style={styles.moreIcon}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Render Card Information
     */

    const renderCardInfo = () => {
        return (
            <View style={styles.cardInfoContainer}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <View style={styles.cardContainer}>
                        <View style={styles.typeCardContainer}>
                            <Text style={styles.typeCard}>Payment Card</Text>
                            <Image
                                source={images.cardLogo}
                                contentFit='contain'
                                style={styles.cardLogo}
                            />
                        </View>
                        <Text style={styles.cardNumber}>gg</Text>
                        <View style={styles.bottomCardContainer}>
                            <Text style={styles.amount}>$2885.00</Text>
                            <Text style={styles.date}>12/24</Text>
                        </View>
                    </View>
                    <Text style={styles.debit}>Debit</Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontFamily: "semiBold",
                        color: COLORS.primary,
                        fontSize: 16
                    }}>$364.00</Text>
                    <Image
                        source={icons.down}
                        contentFit='contain'
                        style={{
                            height: 12,
                            width: 12,
                            tintColor: "gray"
                        }}
                    />
                </View>
            </View>
        )
    }

    // Render Send
    const renderSend = () => {
        const [sliderValue, setSliderValue] = useState(0);
        const [selectedContainer, setSelectedContainer] = useState(null);

        const handleSelectContainer = (item: any): void => {
            setSelectedContainer(item);
        };

        const handleSliderChange = (value: number): void => {
            setSliderValue(value);
        };


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
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText} onPress={bookSession}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>{bookingsString} spaces taken</Text>

                <Text style={{
                    fontSize: 32,
                    color: COLORS.primary,
                    fontFamily: 'semiBold',
                    marginVertical: 6
                }}>£{price}</Text>
            </View>
        )
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0,0,0,0.2)"

                        }}
                    >
                        <View
                            style={{
                                height: 494,
                                width: SIZES.width * 0.9,
                                backgroundColor: COLORS.white,
                                borderRadius: 12,
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 16
                            }}
                        >
                            <Image
                                source={images.success}
                                contentFit='contain'
                                style={{
                                    height: 217,
                                    width: 217,
                                    marginVertical: 22
                                }}
                            />
                            <Text style={{
                                fontSize: 24,
                                fontFamily: "semiBold",
                                color: COLORS.primary,
                                textAlign: "center",
                                marginVertical: 6
                            }}>Sent Successfully</Text>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "regular",
                                color: COLORS.primary,
                                textAlign: "center",
                                marginVertical: 22
                            }}>The amount  will be send to the account with in few minutes</Text>
                            <Button
                                title="Continue"
                                filled
                                onPress={() => {
                                    setModalVisible(false)
                                    navigate("sendmoneysuccess")
                                }}
                                style={{
                                    width: "100%",
                                    marginTop: 12
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
                <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                    <ScrollView>
                        {renderSend()}
                    </ScrollView>
                </View>
            </View>
            {renderModal()}
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