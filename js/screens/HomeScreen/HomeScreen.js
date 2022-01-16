import React, { useState, useEffect, createRef } from 'react';
import { Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import DataAccess from '../../localDataStore';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {

    const [userData, setUserData] = useState(null);
    const [locationData, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    const mapViewRef = createRef();

    const [markers, setMarkers] = useState([]);
    const [zoneDistances, setZoneDistances] = useState([]);

    useEffect(() => {
        (async () => {

            await DataAccess.setZones();
            setUserData(await DataAccess.getUserData());
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            let locationUpdate = await Location.watchPositionAsync({accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10}, updateUserLocation);

            return async function cleanup() {
                console.log('Remove tracking')
                await locationUpdate.remove();
            };

        })();
    }, []);


    // Code will run whenever variable locationData changes
    useEffect(() => {
        (async () => {
            if(locationData !== null) {
                setMarkers(await DataAccess.getZones());
                let zoneDistances = await DataAccess.setZoneDistances(locationData.coords.latitude, locationData.coords.longitude);
                setZoneDistances(await DataAccess.getSortedZoneDistances(zoneDistances));
            }
        })();
    }, [locationData]); // The second parameter(s) are the variables this useEffect is listening to for changes.


    const signOut = () => {
        auth
            .signOut()
    }

    const updateUserLocation = async () => {
    console.log('new location');
    let locationNew = await Location.getCurrentPositionAsync({});
    await setLocation(locationNew);
    }

    const toUserLocation = () => {
        let currentRegion={
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.10,
        }
        mapViewRef.current.animateToRegion(currentRegion, 1000);
    }

    return (
        <View style={styles.homeContainer}>
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

                { locationData !== null &&
                <MapView
                style={styles.map}
                initialRegion={{
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.10,
                }}
                showsUserLocation={true}
                showsMyLocationButton={false}
                ref={mapViewRef}
                >
                {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      coordinate={{
                      latitude: marker.location.latitude,
                      longitude: marker.location.longitude
                      }}
                      title={marker.name}
                      description={marker.id}
                    />
                ))}

                </MapView>
                }
            </View>

            <Text style={styles.locationHeaderSub}>Welkom {userData ? userData.username : 'gebruiker'}</Text>
            <Text style={styles.locationHeaderMain}>Een locatie zoeken</Text>

            <TextInput
                placeholder='Zoek een stad of een plaats'
                style={styles.locationInput}
                left={<TextInput.Icon name="map-search" color="orange" />}
                theme={{colors: {primary: 'orange'}}}
                selectionColor='orange'
                onChangeText={text => setSearchLocation(text)}
                onSubmitEditing={() => navigation.navigate('Zones', {searchLocation})}
                value={searchLocation}
            />

            {zoneDistances && zoneDistances.length > 0 &&
                <ScrollView>
                    <TouchableOpacity
                    onPress={() => {navigation.navigate('Zones')}}
                    >
                        <View style={styles.locationRow}>
                            <View style={styles.locationRowLeft}>
                                <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                                <Text style={styles.locationName}>{zoneDistances[0].name.length < 20 ? zoneDistances[0].name : zoneDistances[0].name.substring(0, 20) + "..."}</Text>
                            </View>
                            <View style={styles.locationRowRight}>
                                <Text style={styles.locationDistance}>{(zoneDistances[0].distance / 1000) < 1 ? (zoneDistances[0].distance) + " m" : (zoneDistances[0].distance / 1000) + " km"}</Text>
                                <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {navigation.navigate('Zones')}}
                    >
                        <View style={styles.locationRow}>
                            <View style={styles.locationRowLeft}>
                                <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                                <Text style={styles.locationName}>{zoneDistances[1].name.length < 20 ? zoneDistances[1].name : zoneDistances[1].name.substring(0, 20) + "..."}</Text>
                            </View>
                            <View style={styles.locationRowRight}>
                                <Text style={styles.locationDistance}>{(zoneDistances[1].distance / 1000) < 1 ? (zoneDistances[1].distance) + " m" : (zoneDistances[1].distance / 1000) + " km"}</Text>
                                <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {navigation.navigate('Zones')}}
                    >
                        <View style={styles.locationRow}>
                            <View style={styles.locationRowLeft}>
                                <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                                <Text style={styles.locationName}>{zoneDistances[2].name.length < 20 ? zoneDistances[2].name : zoneDistances[2].name.substring(0, 20) + "..."}</Text>
                            </View>
                            <View style={styles.locationRowRight}>
                                <Text style={styles.locationDistance}>{(zoneDistances[2].distance / 1000) < 1 ? (zoneDistances[2].distance) + " m" : (zoneDistances[2].distance / 1000) + " km"}</Text>
                                <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            }

        </View>
    )
};

export default HomeScreen;