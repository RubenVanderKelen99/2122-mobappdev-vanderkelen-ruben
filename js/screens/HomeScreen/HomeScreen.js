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
    const [currentLatitude, setCurrentLatitude] = useState(50.8468);
    const [currentLongitude, setCurrentLongitude] = useState(4.3524);

    useEffect(() => {
     (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setCurrentLatitude(location.coords.latitude);
        setCurrentLongitude(location.coords.longitude);
     })();
    }, []);

    const signOut = () => {
        auth
            .signOut()
    }

    const toUserLocation = () => {
        console.log(currentLatitude);
        console.log(currentLongitude);
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
                        onPress={() => toUserLocation()}
                    >
                        <Icon name={"my-location"} type='material' size={30} color="gray" />
                    </TouchableOpacity>

                    {locationData !== null &&
                        <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: currentLatitude,
                            longitude: currentLongitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.15,
                        }}
                        showsUserLocation={true}
                        />
                    }

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