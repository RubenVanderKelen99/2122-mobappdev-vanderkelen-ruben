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
            let zones = [];
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
    setSelectedZone: async function(id, distance) {
        try {
            const zonesRef = db.collection('zones').doc(id);
            const doc = await zonesRef.get();
            if (!doc.exists) {
              console.log('Document does not exist');
            } else {
              const zoneData = doc.data();
              zoneData.id = doc.id;
              await AsyncStorage.setItem('selectedZone', JSON.stringify(zoneData));
            }
        } catch (err) {
            console.log(err);
        }
    },
    getSelectedZone: async function() {
        try {
        const result = await AsyncStorage.getItem('selectedZone');
        //console.log(JSON.parse(result));
        return (JSON.parse(result))
        } catch (err) {
            console.log(err);
        }
    },
    getCarsFromSelectedZone: async function(zone) {
        try {
            const carsRef = db.collection('zones').doc(zone.id).collection('cars');
            const snapshot = await carsRef.get();
            let cars = [];
            snapshot.forEach(doc => {
                const carData = doc.data();
                carData.id = doc.id;
                cars.push(carData);
            });
            //await AsyncStorage.setItem('carsData', JSON.stringify(cars));
            return(cars);
        } catch (err) {
            console.log(err);
        }
    },
    setAboutUs: async function() {
        try {
            const aboutRef = db.collection('about').doc('content');
            const doc = await aboutRef.get();
            if (!doc.exists) {
              console.log('Document does not exist');
            } else {
              //console.log(JSON.stringify(doc.data()));
              await AsyncStorage.setItem('aboutUsData', JSON.stringify(doc.data()));
            }
        } catch (err) {
            console.log(err);
        }
    },
    getAboutUs: async function() {
        try {
        const result = await AsyncStorage.getItem('aboutUsData');
        console.log(JSON.parse(result));
        return (JSON.parse(result));
        } catch (err) {
            console.log(err);
        }
    },

}

module.exports = DataAccess;