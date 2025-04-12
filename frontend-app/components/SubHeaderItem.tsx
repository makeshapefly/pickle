import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface SubHeaderItemProps {
  title: string;
  onPress: () => void;
  subtitle: string;
}

const SubHeaderItem: React.FC<SubHeaderItemProps> = ({ title, onPress, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress} style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'medium',
    color: COLORS.black
  },
});

export default SubHeaderItem;
