import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen, HomeScreen, RegistrationScreen, CompleteProfileScreen, HistoryScreen, PromotionsScreen, FAQScreen, AboutScreen } from './js/screens'
import { db } from './js/firebase';
import { auth } from './js/firebase';

const Drawer = createDrawerNavigator();

function DrawerStack() {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Rit plannen" component={HomeScreen} />
            <Drawer.Screen name="Geschiedenis" component={HistoryScreen} />
            <Drawer.Screen name="Promoties" component={PromotionsScreen} />
            <Drawer.Screen name="FAQ" component={FAQScreen} />
            <Drawer.Screen name="Over ons" component={AboutScreen} />
        </Drawer.Navigator>
    );
}

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
                    <Stack.Screen name="Home" component={DrawerStack} />
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