import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebase';
import { db } from './firebase';
import { getDistance } from 'geolib';

let DataAccess = {
    saveUserData: async function(userData) {
        try {
            await AsyncStorage.setItem('userdata', JSON.stringify(userData));
        } catch (err) {
        console.log(err);
        }
    },
    getUserData: async function() {
        try {
        const result = await AsyncStorage.getItem('userdata');
        //console.log(JSON.parse(result));
        return (JSON.parse(result))
        } catch (err) {
            console.log(err);
        }
    },
    setMarkers: async function() {
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

            await AsyncStorage.setItem('zonesdata', JSON.stringify(zones));
        } catch (err) {
            console.log(err);
        }
    },
    getMarkers: async function() {
        try {
        const result = await AsyncStorage.getItem('zonesdata');
        //console.log(JSON.parse(result));
        return (JSON.parse(result))
        } catch (err) {
            console.log(err);
        }
    },
    setZoneDistances: async function(latitude, longitude) {
        const result = await AsyncStorage.getItem('zonesdata');
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
        console.log(zoneDistances)
        return zoneDistances;
    },
}

module.exports = DataAccess;