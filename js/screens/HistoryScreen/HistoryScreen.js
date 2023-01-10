import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';
import { List } from 'react-native-paper';
import DataAccess from '../../localDataStore';
import styles from '../styles';

const HistoryScreen = ({ navigation }) => {

    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const focusSubscription = navigation.addListener('focus', async () => {
        setOrderHistory(await DataAccess.getOrderHistory());

        console.log("focusListener HistoryScreen");
        });

        return focusSubscription;
    }, [navigation]);



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

                { orderHistory.length === 0 &&
                    <Text>No orders placed yet.</Text>
                }

                { orderHistory && orderHistory.length > 0 &&
                    <List.Section>
                        {orderHistory.map((order)  =>
                        <List.Accordion key={order.id} theme={{ colors: { primary: 'orange' }}} title={order.id}>
                            <List.Item
                            titleNumberOfLines={10}
                            title={"Car: " + order.car + '\n'
                            + "Startzone: " + order.startZone + '\n'
                            + "Endzone: " + order.endZone + '\n'
                            + "Startdate: " + order.startDate
                            }
                            />
                        </List.Accordion>
                        )}
                    </List.Section>
                }

                </View>
            </ScrollView>
    )
};

export default HistoryScreen;