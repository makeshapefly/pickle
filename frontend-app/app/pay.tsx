import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { BarcodeScanningResult, Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'

const ScanQRRoute = () => {
    const [facing, setFacing] = useState<any>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [scannedData, setScannedData] = useState<string>('');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
        setScanned(true);
        setScannedData(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{
            flex: 1,
            padding: 16,
            backgroundColor: COLORS.white,
            alignItems: "center"
        }}>
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 32
            }}>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    facing={facing}
                    style={styles.camera}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"]
                    }}>
                </CameraView>
            </View>
            <Text style={{
                ...FONTS.body4,
                textAlign: "center"
            }}>Scan QR Code here</Text>
            {/* Replace !scanned with scanned to make the scan QR working */}
            {/* We implement this only for design purposes */}
            {!scanned &&
                (
                    <TouchableOpacity
                        onPress={() => setScanned(false)}
                        style={{
                            height: 72,
                            width: 72,
                            borderRadius: 36,
                            backgroundColor: COLORS.primary,
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            bottom: 32
                        }}>
                        <MaterialCommunityIcons
                            name="lightning-bolt"
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const MyQRCodeRoute = () => (
    <View style={{
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.white,
        alignItems: "center"
    }}>
        <View style={{
            height: 240,
            width: 240,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 64,
            marginBottom: 12
        }}>
            <QRCode
                value="@alexandermichael"
                size={220}
            />
        </View>
        <Text style={{
            ...FONTS.body4,
            textAlign: "center",
            color: COLORS.primary
        }}>@alexandermichael</Text>
    </View>
)

const renderScene = SceneMap({
    first: ScanQRRoute,
    second: MyQRCodeRoute,
});

const PayScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Scan QR' },
        { key: 'second', title: 'My QR' },
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: COLORS.primary,
            }}
            style={{
                backgroundColor: '#fff',
            }}
            renderLabel={({ route, focused, color }) => (
                <Text style={[{
                    color: focused ? COLORS.primary : 'gray',
                    fontSize: 14,
                    fontFamily: focused ? "medium" : "regular"
                }]}>
                    {route.title}
                </Text>
            )}
        />
    )
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Pay With CHILDPAY" />
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
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
        flex: 1
    },
    camera: {
        width: SIZES.width - 32,
        height: SIZES.width - 32,
    }
})

export default PayScreen