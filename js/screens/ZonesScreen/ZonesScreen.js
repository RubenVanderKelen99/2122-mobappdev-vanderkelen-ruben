import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import DataAccess from '../../localDataStore';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { decimalToSexagesimal } from 'geolib';
import MapView, { Marker } from 'react-native-maps';
import styles from '../styles';

const ZonesScreen = ({ navigation }) => {

    const [zoneDistances, setZoneDistances] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');

    const [toolbarHackHeight, setToolbarHackHeight] = useState(0);

    useFocusEffect(() => {
        (async () => {
            setZoneDistances(await DataAccess.getSortedZoneDistances(zoneDistances));
        })();

    });

    function navBack() {
    if (navigation.canGoBack())
       navigation.goBack()
    else
       navigation.navigate('Home')
    }

    async function getSelectedZone(id, distance) {
        await DataAccess.setSelectedZone(id, distance);
        setSelectedZone(await DataAccess.getSelectedZone());
    }

    function showToolBarHack() {
        const heightDiff = 0.5; // we don't want to change the height too much so keep it small. I've noticed 0.5 works best, as opposed to 0.1 doesn't work at all, and 0.5 is barely noticeable to the user.
        // switch the height between 0 and 0.5 and back.
        setToolbarHackHeight(
          toolbarHackHeight === heightDiff
            ? toolbarHackHeight - heightDiff
            : toolbarHackHeight + heightDiff,
        );
    }

    return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity
            onPress={() => navBack()}
            >
                <Icon name={"arrow-back"} size={25} color={'#4F4F4F'} style={styles.headerBackButton}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}> Zones </Text>
        </View>

        { zoneDistances && zoneDistances.length > 0 && selectedZone === '' &&
            <ScrollView>
                <TextInput
                placeholder='Zoek een stad of een plaats'
                style={styles.locationInput}
                left={<TextInput.Icon name="map-search" color="orange" />}
                theme={{colors: {primary: 'orange'}}}
                selectionColor='orange'
                //onChangeText={text => setSearchLocation(text)}
                //value={searchLocation}
                />
                {zoneDistances.map((zoneDistance)  =>
                    <TouchableOpacity key={zoneDistance.id} onPress={() => getSelectedZone(zoneDistance.id, zoneDistance.distance)}>
                        <View style={styles.locationRow}>
                            <View style={styles.locationRowLeft}>
                                <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                                <Text style={styles.locationName}>{zoneDistance.name.length < 20 ? zoneDistance.name : zoneDistance.name.substring(0, 20) + "..."}</Text>
                            </View>
                            <View style={styles.locationRowRight}>
                                <Text style={styles.locationDistance}>{(zoneDistance.distance / 1000) < 1 ? (zoneDistance.distance) + " m" : (zoneDistance.distance / 1000) + " km"}</Text>
                                <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        }

        { selectedZone !== '' &&
            <View>
                <Text>{selectedZone.name}</Text>
                <Text>Latitude: {decimalToSexagesimal(selectedZone.location.latitude)} {'\n'}Longitude: {decimalToSexagesimal(selectedZone.location.longitude)} </Text>
                <MapView
                onMarkerPress={() => showToolBarHack()}
                style={styles.zoneMap, {width: 300, height: 250 + toolbarHackHeight}}
                initialRegion={{
                latitude: selectedZone.location.latitude,
                longitude: selectedZone.location.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
                }}
                toolbarEnabled={true}
                showsUserLocation={false}
                showsMyLocationButton={false}
                >
                    <MapView.Marker
                      coordinate={{
                      latitude: selectedZone.location.latitude,
                      longitude: selectedZone.location.longitude
                      }}
                      title={selectedZone.name}
                    />
                </MapView>

                <Text>Opening Hours: {'\n'}Hand-in: {selectedZone.open.handin} {'\n'}Pick-up: {'\n'}Weekdays: {selectedZone.open.pickup.weekdays} {'\n'}Weekend: {selectedZone.open.pickup.weekend}</Text>

            </View>
        }


    </View>
    )
};

export default ZonesScreen;