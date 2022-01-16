import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import DataAccess from '../../localDataStore';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';

const OrderScreen = ({ navigation }) => {

    //const [aboutUs, setAboutUs] = useState(null);

    useEffect(() => {
        (async () => {
        })();
    }, []);

    function navBack() {
    if (navigation.canGoBack())
       navigation.goBack()
    else
       navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navBack()}>
                    <Icon name={"arrow-back"} size={25} color={'#4F4F4F'} style={styles.headerBackButton}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}> Stap 1/6 </Text>
            </View>
        </View>
    )
};

export default OrderScreen;