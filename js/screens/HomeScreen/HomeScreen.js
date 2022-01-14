import React, { useState, useEffect, createRef } from 'react';
import { Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {

    const [locationData, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    const mapViewRef = createRef();

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            let locationUpdate = await Location.watchPositionAsync({accuracy: Location.Accuracy.Balanced, timeInterval: 5000, distanceInterval: 10}, updateUserLocation);

            const zonesRef = db.collection('zones');
            const snapshot = await zonesRef.get();
            //data telkens pushen naar markers, markers eerst leegmaken
            setMarkers(markers => []);
            var zones = [];
            var zoneLatitude;
            var zoneLongitude;
            var distance;
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());
                const zoneData = doc.data();
                zoneData.id = doc.id;
                setMarkers(markers => markers.concat(zoneData));
            });

            /*setMarkers(markers.concat(zones)
                .sort((a, b) => a.distance > b.distance ? 1 : -1)
            );*/


            //setMarkers(markers.sort((a,b) => a.distance - b.distance));
            //console.log(markers);

            return async function cleanup() {
                console.log('Remove tracking')
                await locationUpdate.remove();
            };

        })();
    }, []);

    /*
    // This code is for it to run whenever your variable, timerOn, changes
    useEffect(() => {
        console.log(locationData);
    }, [locationData]); // The second parameters are the variables this useEffect is listening to for changes.
    */
    const signOut = () => {
        auth
            .signOut()
    }

    const updateUserLocation = async () => {
    let locationNew = await Location.getCurrentPositionAsync({});
    setLocation(locationNew);
    }

    const toUserLocation = () => {
        let currentRegion={
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.10,
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

            {markers[2] !== undefined &&
            <ScrollView>
            <TouchableOpacity>
                <View style={styles.locationRow}>
                    <View style={styles.locationRowLeft}>
                        <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                        <Text style={styles.locationName}>{markers[0].name.substring(0, 22)}</Text>
                    </View>
                    <View style={styles.locationRowRight}>
                        <Text style={styles.locationDistance}>{markers[0].distance/1000} km</Text>
                        <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.locationRow}>
                    <View style={styles.locationRowLeft}>
                        <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                        <Text style={styles.locationName}>{markers[1].name.substring(0, 22)}</Text>
                    </View>
                    <View style={styles.locationRowRight}>
                        <Text style={styles.locationDistance}>{markers[1].distance/1000} km</Text>
                        <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.locationRow}>
                    <View style={styles.locationRowLeft}>
                        <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                        <Text style={styles.locationName}>{markers[2].name.substring(0, 22)}</Text>
                    </View>
                    <View style={styles.locationRowRight}>
                        <Text style={styles.locationDistance}>{markers[2].distance/1000} km</Text>
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