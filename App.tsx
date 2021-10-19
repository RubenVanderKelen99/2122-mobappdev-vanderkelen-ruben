import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen } from './js/screens'
import { db } from './js/firebase';
import { auth } from './js/firebase';

const Stack = createStackNavigator();

export default function App() {
    const [signedIn, setSignedIn] = useState(false);

    auth.onAuthStateChanged((user) => {
        if (user) {
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
      });

    /* verbinding maken met Firebase
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
        }, []) */


  return (
      <NavigationContainer>
           <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
             { signedIn ? (
               <Stack.Screen name="Home">
                 {props => <HomeScreen {...props} extraData={user} />}
               </Stack.Screen>
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