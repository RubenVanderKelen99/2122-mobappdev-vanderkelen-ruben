import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebase';
import { db } from './firebase';
import { getDistance } from 'geolib';

let DataAccess = {
    saveUserData: async function(userData) {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (err) {
        console.log(err);
        }
    },
    getUserData: async function() {
        try {
        const result = await AsyncStorage.getItem('userData');
        //console.log(JSON.parse(result));
        return (JSON.parse(result))
        } catch (err) {
            console.log(err);
        }
    },
    setZones: async function() {
        //only execute when status = updated
        try {
            const zonesRef = db.collection('zones');
            const snapshot = await zonesRef.get();
            let zones = []; //was vroeger var !!!!!!!!!!!!!!!!!!!!!!!!!!!!! controleren als er iets niet werkt
            //var zoneLatitude;
            //var zoneLongitude;
            //var distance;
            snapshot.forEach(doc => {
                const zoneData = doc.data();
                zoneData.id = doc.id;
                zones.push(zoneData);
            });

            await AsyncStorage.setItem('zonesData', JSON.stringify(zones));
        } catch (err) {
            console.log(err);
        }
    },
    getZones: async function() {
        try {
        const result = await AsyncStorage.getItem('zonesData');
        //console.log(JSON.parse(result));
        return (JSON.parse(result))
        } catch (err) {
            console.log(err);
        }
    },
    setZoneDistances: async function(latitude, longitude) {
        try {
            const result = await AsyncStorage.getItem('zonesData');
            let zonesdata = JSON.parse(result);
            let zoneDistances = [];
            for(let i = 0; i < zonesdata.length; i++){
                let zoneDistance = {
                id: "",
                name: "",
                distance: "",
                };

                //console.log("calculating distance for (" + zonesdata[i].id + "): " + zonesdata[i].name)
                let distance = getDistance(
                {latitude: latitude, longitude: longitude},
                {latitude: zonesdata[i].location.latitude, longitude:  zonesdata[i].location.longitude}
                );

                zoneDistance.id = zonesdata[i].id;
                zoneDistance.name = zonesdata[i].name;
                zoneDistance.distance = distance;
                zoneDistances.push(zoneDistance);
            }
            let sortedZoneDistances = this.sortZoneDistances(zoneDistances);
            await AsyncStorage.setItem('sortedZoneDistances', JSON.stringify(sortedZoneDistances));
            //return zoneDistances;
        } catch (err) {
            console.log(err);
        }
    },
    sortZoneDistances: function(zones) {
    //sort Zones by distance (from closest to furthest)
    zones.sort(function(a,b) {
        return a.distance - b.distance
    });
    return zones;
    },
    getSortedZoneDistances: async function() {
        try {
        const result = await AsyncStorage.getItem('sortedZoneDistances');
        //console.log(JSON.parse(result));
        return (JSON.parse(result))
        } catch (err) {
            console.log(err);
        }
    },
}

module.exports = DataAccess;