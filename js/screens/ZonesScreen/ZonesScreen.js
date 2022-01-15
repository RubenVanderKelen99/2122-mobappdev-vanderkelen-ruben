import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';
import styles from '../styles';

const ZonesScreen = ({ navigation }) => {

    function navBack() {
    if (navigation.canGoBack())
       navigation.goBack()
    else
       navigation.navigate('Home')
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

        <TextInput
        placeholder='Zoek een stad of een plaats'
        style={styles.locationInput}
        left={<TextInput.Icon name="map-search" color="orange" />}
        theme={{colors: {primary: 'orange'}}}
        selectionColor='orange'
        //onChangeText={text => setSearchLocation(text)}
        //value={searchLocation}
        />

        <ScrollView>
            <TouchableOpacity onPress={() => {navigation.navigate('Zones')}}>
                <View style={styles.locationRow}>
                    <View style={styles.locationRowLeft}>
                        <Icon name="location-pin" type='material' size={30} color="#ABABAB" style={styles.locationIcon}/>
                        <Text style={styles.locationName}>zone naam</Text>
                    </View>
                    <View style={styles.locationRowRight}>
                        <Text style={styles.locationDistance}>XX,X km</Text>
                        <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </View>
    )
};

export default ZonesScreen;