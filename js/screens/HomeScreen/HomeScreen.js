import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { auth } from '../../firebase';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {

    const [locationData, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
     (async () => {
       let { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== 'granted') {
         setErrorMsg('Permission to access location was denied');
         return;
       }

       let location = await Location.getCurrentPositionAsync({});
       setLocation(location);
       setLatitude(location.coords.latitude);
       setLongitude(location.coords.longitude);

       console.log(location);
     })();
    }, []);

    const signOut = () => {
        auth
            .signOut()
    }

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior="height" enabled keyboardVerticalOffset={50}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.authFormContainer}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Icon name={"menu"} size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.roundButton}
                    >
                        <Icon name={"my-location"} type='material' size={30} color="gray" />
                    </TouchableOpacity>

                    <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 51.0622,
                        longitude: 3.7074,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.121,
                    }}
                    />

                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => signOut()}
                        icon="account-arrow-left"
                        color="orange"
                        labelStyle={{ color: "white", fontSize: 16 }}
                        style={styles.submitButton}
                    >
                        Sign out
                    </Button>
                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => navigation.navigate('CompleteProfile')}
                        icon="account-arrow-left"
                        color="orange"
                        labelStyle={{ color: "white", fontSize: 16 }}
                        style={styles.submitButton}
                    >
                        Complete profile
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
)
};

export default HomeScreen;