import React, { useState, useEffect, createRef } from 'react';
import { Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { auth } from '../../firebase';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {

    const [locationData, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [currentLatitude, setCurrentLatitude] = useState(50.8468);
    const [currentLongitude, setCurrentLongitude] = useState(4.3524);
    const [searchLocation, setSearchLocation] = useState('');

    const mapViewRef = createRef();

    const [markers, setMarkers] = useState(
    [{
    title: 'test',
    description: 'description',
    coordinate: {
    latitude: 51.04807886707637,
    longitude: 3.7296714985957045
    }},
    {
    title: 'test2',
    description: 'description',
    coordinate: {
    latitude: 51.05807886707637,
    longitude: 3.7296714985957045
    }},
    ]);

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
        let currentRegion={
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.15,
        }
        //console.log(currentRegion);
        //console.log(mapViewRef);
        mapViewRef.current.animateToRegion(currentRegion, 1000);
    }

    return (
        <View style={styles.container}>
            <View style={styles.mapViewContainer}>
                <TouchableOpacity
                    style={styles.roundButtonMenu}
                    onPress={() => navigation.openDrawer()}
                >
                <Icon name={"menu"} size={30} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.roundButtonLocation}
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
                showsMyLocationButton={false}
                ref={mapViewRef}
                >
                {markers.map((marker, index) => (
                    <Marker
                      key={index}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      description={marker.description}
                    />
                  ))}
                </MapView>
                }
            </View>

            <Text style={styles.locationHeaderSub}>Welkom gebruiker</Text>
            <Text style={styles.locationHeaderMain}>Een locatie zoeken</Text>

            <TouchableOpacity>
                <TextInput
                    placeholder='Zoek een stad of een plaats'
                    style={styles.locationInput}
                    left={<TextInput.Icon name="map-search" color="orange" />}
                    theme={{colors: {primary: 'orange'}}}
                    selectionColor='orange'
                    onChangeText={text => setSearchLocation(text)}
                    value={searchLocation}
                />

            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.locationRow}>
                    <View style={styles.locationRowLeft}>
                        <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                        <Text style={styles.locationName}>Dichtste Bestemming 1</Text>
                    </View>
                    <View style={styles.locationRowRight}>
                        <Text style={styles.locationDistance}>XXX,X km</Text>
                        <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.locationRow}>
                    <View style={styles.locationRowLeft}>
                        <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                        <Text style={styles.locationName}>Dichtste Bestemming 2</Text>
                    </View>
                    <View style={styles.locationRowRight}>
                        <Text style={styles.locationDistance}>XXX,X km</Text>
                        <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.locationRow}>
                    <View style={styles.locationRowLeft}>
                        <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                        <Text style={styles.locationName}>Dichtste Bestemming 3</Text>
                    </View>
                    <View style={styles.locationRowRight}>
                        <Text style={styles.locationDistance}>XXX,X km</Text>
                        <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    )
};

export default HomeScreen;