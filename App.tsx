import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './js/firebase';

export default function App() {
    const [test, setTest] = useState([]);
    useEffect(() => {
        const ref = db.collection('test');    ref.onSnapshot((query) => {
            const objs = [];
            query.forEach((doc) => {
              objs.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setTest(objs);
          });
    }, [])


  return (
     <View style={styles.container}>
          {test.map((obj) => (
            <View id={obj.id}>
              <Text>{obj.name}</Text>
            </View>  ))}
          <StatusBar style="auto" />
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
