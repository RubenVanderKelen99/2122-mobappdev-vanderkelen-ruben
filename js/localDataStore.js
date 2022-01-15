import AsyncStorage from '@react-native-async-storage/async-storage';

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
        console.log(JSON.parse(result));
        return (JSON.parse(result))
        } catch (err) {
            console.log(err);
        }
    },
}

module.exports = DataAccess;