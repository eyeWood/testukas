import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Page({route}) {
  const item = route.params.item
  return (
    <View style={styles.container}>
     <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: item.image
        }}
      />
      <Text>{item && item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
