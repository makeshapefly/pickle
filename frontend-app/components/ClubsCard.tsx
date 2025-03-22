import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import React  from 'react'
import { Image } from 'expo-image';
import { COLORS, SIZES, icons, images } from '../constants'
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

interface ClubsCardProps {
    name: string;
    onPress: () => void;
}

type Booking = {
    sessionId: string;
    sessionDate: string;
};

const ClubsCard: React.FC<ClubsCardProps> = ({ name, onPress }) => {
    const [buttonText, setButtonText] = React.useState('Book In')
    const navigation = useNavigation();
    const { navigate } = useNavigation<Nav>()

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
                        </View>
                    </View>

                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 12
                }}>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
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

export default ClubsCard