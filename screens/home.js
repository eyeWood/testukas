import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const names = ["Max", "Jane", "Bane", "Lame", "Elane"];

export default function Home({ navigation }) {
  const network = React.useRef(false);
  const [range, setRange] = React.useState(30);
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState([]);

  NetInfo.fetch().then(state => {
    network.current = state.isConnected;
  });

  async function getList(range) {
    if(network.current) {
      setLoading(true);
      let info = [];
      for(let i = 0; i < range; i++) {
        let image;
        await fetch('https://picsum.photos/200').then(response => {
          image = response.url;
          info.push({ image, name: names[Math.floor(Math.random() * 5)] });
        })
      }

      if(info.length > 29) {
        // Sending to Redux

        setList(info);

        // Setting Locally
        try {
          const jsonValue = JSON.stringify(info)
          await AsyncStorage.setItem('@oldData', jsonValue)
        } catch (e) {
          Alert.alert(e);
        }

        setLoading(false);
      }
    } else {
      getOldData();

      setLoading(false);
    }
  }

  const getOldData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@oldData')
      jsonValue != null && dispatch(dataBase(JSON.parse(jsonValue)));
    } catch(e) {
      Alert.alert(e);
    }
  }


  React.useEffect(() => {
    let mounted = true;
      if(mounted) {
        getList(range);
      }
    return () => mounted = false;
  }, [range])

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          title="30"
          color={range == 30 ? "#4496f3" : "#323232"}
          onPress={() => {setRange(30); setLoading(true)}}
        />
        <Button
          title="50"
          color={range == 50 ? "#4496f3" : "#323232"}
          onPress={() => {setRange(50); setLoading(true)}}
        />
        <Button
          title="100"
          color={range == 100 ? "#4496f3" : "#323232"}
          onPress={() => {setRange(100); setLoading(true)}}
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {
          loading ?
            <Text>loading</Text>
            :
            list.length && list.map((item, i) => <TouchableOpacity key={i} style={styles.box} onPress={() => navigation.navigate('Page', {item})}><Text>{item.name}</Text></TouchableOpacity>)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    width: 140,
    maxHeight: 50,
    minHeight: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box: {
    flexDirection: 'row',
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10
  }
});
