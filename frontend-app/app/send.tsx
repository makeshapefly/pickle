import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { COLORS, SIZES, icons, images } from '../constants'
import Slider from '@react-native-community/slider';
import { useNavigation } from 'expo-router'
import Button from '../components/Button'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'

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


const SendScreen = () => {
    const navigation = useNavigation();
    const { navigate } = useNavigation<Nav>()
    const [modalVisible, setModalVisible] = useState(false);
    /**
     * Render Header
     */
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
                        <Text style={styles.cardNumber}>1231  3212  2221 0910</Text>
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

                <Text style={styles.subtitle}>Send To</Text>
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
                            }}>Vina Andini</Text>
                            <Text style={{
                                fontFamily: "regular",
                                fontSize: 12,
                                color: "gray"
                            }}>0821 2103 1120</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Feather name="edit" size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>Enter Nominal</Text>

                <Text style={{
                    fontSize: 32,
                    color: COLORS.primary,
                    fontFamily: 'semiBold',
                    marginVertical: 6
                }}>${sliderValue.toFixed(2)}</Text>

                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={sliderValue}
                    onValueChange={handleSliderChange}
                    minimumTrackTintColor={COLORS.primary}
                    maximumTrackTintColor="gray"
                    thumbTintColor={COLORS.primary}
                />
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginVertical: 22
                }}>
                    {

                        data.map((item, index) => (
                            <Container
                                key={index}
                                item={item}
                                isSelected={selectedContainer === item}
                                onSelect={() => handleSelectContainer(item)}
                            />
                        )
                        )
                    }
                </View>
                <Button
                    title="Send Money"
                    onPress={() => setModalVisible(true)}
                    filled
                />

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
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
                {renderHeader()}
                <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                    {renderCardInfo()}
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
    }
})

export default SendScreen