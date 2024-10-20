// src/components/UserAvatar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRandomColor } from '../utils/colors';

const UserAvatar = ({ username, size = 40 }) => {
  const backgroundColor = getRandomColor(username);
  return (
    <View style={[styles.avatar, { backgroundColor, width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size / 2 }]}>{username[0].toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserAvatar;
