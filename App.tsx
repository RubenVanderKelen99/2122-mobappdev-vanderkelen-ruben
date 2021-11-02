import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen, CompleteProfileScreen } from './js/screens'
import { db } from './js/firebase';
import { auth } from './js/firebase';

const Stack = createStackNavigator();

export default function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const usersRef = db.collection('users');
        auth.onAuthStateChanged((user) => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setUser(userData)
                        setSignedIn(true)
                    })
                .catch((error) => {
                    alert(error)
                })
            } else {
                setSignedIn(false)
            }
         });
    }, []);


  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            { signedIn ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Registration" component={RegistrationScreen} />
                </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}