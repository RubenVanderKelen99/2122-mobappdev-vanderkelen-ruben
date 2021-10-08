import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

const App = () => {

    return (
        <SafeAreaView>
            <View>
                <Text>Test</Text>
                <Button title='Login'/>
            </View>
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
