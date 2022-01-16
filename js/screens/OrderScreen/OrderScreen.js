import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import DataAccess from '../../localDataStore';
import { Icon } from 'react-native-elements';
import styles from '../styles';

const OrderScreen = ({ navigation }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [zoneDistances, setZoneDistances] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState('');

    useEffect(() => {
        const focusSubscription = navigation.addListener('focus', async () => {
        setCurrentStep(1);
        setZoneDistances(await DataAccess.getSortedZoneDistances());

        console.log("focusListener OrderScreen");
        });

        return focusSubscription;
    }, [navigation]);


    function navBack() {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.navigate('Home')
    }

    async function updateOrderStatus(value) {
        switch(currentStep) {
          case 1:
            console.log('set zone');
            setSelectedZone(value);
            setCars(await DataAccess.getCarsFromZoneId(value));
            break;
          case 2:
            console.log('set car')
            setSelectedCar(value);
            break;
          case 3:
            // code block
            break;
          case 4:
            // code block
            break;
          case 5:
            // code block
            break;
          case 6:
            // code block
            break;
          default:
            // code block
        }
        setCurrentStep(currentStep + 1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navBack()}>
                    <Icon name={"arrow-back"} size={25} color={'#4F4F4F'} style={styles.headerBackButton}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Step {currentStep}/6</Text>
            </View>
            { currentStep === 1 &&
                <View>
                    { zoneDistances && zoneDistances.length > 0 &&
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
                                <TouchableOpacity key={zoneDistance.id} onPress={() => updateOrderStatus(zoneDistance.id)}>
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
                </View>
            }

            { currentStep === 2 &&
                <View>
                    { cars && cars.length > 0 &&
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
                            {cars.map((car)  =>
                                <TouchableOpacity key={car.id} onPress={() => updateOrderStatus(car.id)}>
                                    <View style={styles.locationRow}>
                                        <View style={styles.locationRowLeft}>
                                            <Icon name="car-arrow-right" type='material-community' size={30} color="#ABABAB" style={styles.locationIcon}/>
                                            <Text style={styles.locationName}>{car.name.length < 20 ? car.name : car.name.substring(0, 20) + "..."}</Text>
                                        </View>
                                        <View style={styles.locationRowRight}>
                                            <Text style={styles.locationDistance}>€ {car.price}/dag</Text>
                                            <Icon name="chevron-right" size={30} style={styles.moreIcon} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    }
                </View>
            }

        </View>
    )
};

export default OrderScreen;