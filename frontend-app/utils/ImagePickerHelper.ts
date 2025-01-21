import * as ImagePicker from 'expo-image-picker'

export const launchImagePicker = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    })

    if (!result.canceled) {
        return result.assets[0].uri
    }
}
