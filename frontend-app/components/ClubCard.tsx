import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, images, icons, SIZES } from '../constants';
import { Image } from 'expo-image';

interface CardProps {
  name: string;
  onPress: () => void;
  containerStyle?: object;
}
const ClubCard: React.FC<CardProps> = ({ name, onPress, containerStyle }) => {
  return (
    <div>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyle]} >
        <View style={styles.headerContainer}>
          <Text style={styles.cardNumber}>{name}</Text>
          <Image
            source={images.clubLogo}
            contentFit='contain'
            style={styles.icon}
          />
        </View>
        <Text style={styles.cardNumber}></Text>
        <View style={styles.footerContainer}>
        </View>
      </TouchableOpacity>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 304,
    height: 150,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginRight: 16
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    fontSize: 12,
    fontFamily: "regular",
    color: "rgba(255,255,255,.8)"
  },
  icon: {
    width: 80,
    height: 80
  },
  cardNumber: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.black,
    marginVertical: 32
  },
  footerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30
  },
  balance: {
    fontFamily: "semiBold",
    fontSize: 20,
    color: COLORS.white
  },
  date: {
    fontSize: 14,
    fontFamily: "regular",
    color: "rgba(255,255,255,.8)"
  },
  elipseIcon: {
    height: 142,
    width: 142,
    position: "absolute",
    bottom: -22,
    right: 0
  },
  rectangleIcon: {
    height: 132,
    width: 156,
    position: "absolute",
    top: -44,
    left: -44,
    zIndex: -999
  },
})

export default ClubCard