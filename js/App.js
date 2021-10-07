import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
// In a React Native application
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


//Initializing the SDK
Parse.setAsyncStorage(AsyncStorage);
//Paste below the Back4App Application ID AND the JavaScript KEY
Parse.initialize('ubXN5OEnvNKWCrDHIx20SpeWrHkWizuB4Ue3cyoy', '92WYjKgyN8VScCjQtX0GEbqp4doU6kqpj0rrGHDT');
//Point to Back4App Parse API address
Parse.serverURL = 'https://parseapi.back4app.com/parse';

const App = () => {
    const [user, setUser] = useState(new Parse.Object('User'));

   async function addUser() {
        try {
            //create a new Parse Object instance
            const newUser = new Parse.Object('User');
            //define the attributes you want for your Object
            newUser.set('username', 'Mark.Doe');
            newUser.set('name', 'Mark');
            newUser.set('surName', 'Doe');
            newUser.set('password', 'Azerty123');
            newUser.set('phone', '111222333');
            newUser.set('countryCode', 'BE');
            newUser.set('email', 'MarkDoe@odisee.be');
            console.log(newUser.get('username'));
            console.log(newUser.get('name'));
            console.log(newUser.get('surName'));
            console.log(newUser.get('password'));
            console.log(newUser.get('phone'));
            console.log(newUser.get('countryCode'));
            console.log(newUser.get('email'));
            //save it on Back4App Data Store
            await newUser.save();
            console.log('Status', 'Succes');
        } catch (error) {
            console.log('Error saving new user: ', error);
        }
    }

    async function fetchUser() {
        //create your Parse Query using the Person Class you've created
        let query = new Parse.Query('User');
        console.log(query);
        //run the query to retrieve all objects on Person class, optionally you can add your filters
        let queryResult = await query.find();
        console.log(query);
        //the resul is an arry of objects. Pick the first result
        const currentUser = queryResult[0];
        //access the Parse Object attributes
        console.log('User id: ', currentUser.get('id'));
        console.log('User username: ', currentUser.get('username'));
        console.log('User name: ', currentUser.get('name'));
        console.log('User surname: ', currentUser.get('surName'));
        console.log('User phone: ', currentUser.get('phone'));
        console.log('User countrycode: ', currentUser.get('countryCode'));
        console.log('User email: ', currentUser.get('email'));
        setUser(currentUser);
    }

    useEffect(() => {
        fetchUser()
    }, []);

    /*async function addPriceClass() {
            try {
                //create a new Parse Object instance
                const newClass = new Parse.Object('PriceClass');
                //define the attributes you want for your Object
                newClass.set('minPrice', 10);
                newClass.set('maxPrice', 20);
                //save it on Back4App Data Store
                await newClass.save();
                console.log('Status', 'Succes');
            } catch (error) {
                console.log('Error saving new user: ', error);
            }
        }*/

    return (
        <SafeAreaView>
            <View>
                <Text>Name: {user.get('name')}</Text>
                <Text>email: {user.get('email')}</Text>
                <Button title='Add person' onPress={addUser} />
                <Button title='Fetch person' onPress={fetchUser} />
            </View>
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
