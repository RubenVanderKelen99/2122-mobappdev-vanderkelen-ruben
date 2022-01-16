import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';
import { List } from 'react-native-paper';
import styles from '../styles';

const HistoryScreen = ({ navigation }) => {

    function navBack() {
    if (navigation.canGoBack())
       navigation.goBack()
    else
       navigation.navigate('Home')
    }

    return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.authFormContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            onPress={() => navBack()}
                        >
                            <Icon name={"arrow-back"} size={25} color={'#4F4F4F'} style={styles.headerBackButton}/>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}> History </Text>
                    </View>

                    <List.Section>
                        <List.Accordion theme={{ colors: { primary: 'orange' }}} title="Ride 1: Gent-Brussel">
                            <List.Item
                            titleNumberOfLines={10}
                            title="Extra information about the ride. " />
                        </List.Accordion>

                    </List.Section>
                </View>
            </ScrollView>
    )
};

export default HistoryScreen;