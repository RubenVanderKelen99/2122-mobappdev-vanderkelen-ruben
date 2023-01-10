import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import DataAccess from '../../localDataStore';
import { Icon } from 'react-native-elements';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';

const OrderScreen = ({ navigation }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [zoneDistances, setZoneDistances] = useState([]);
    const [startZone, setStartZone] = useState([]);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endZone, setEndZone] = useState([]);
    const [dateUpdated, setDateUpdated] = useState(0);

    useEffect(() => {
        const focusSubscription = navigation.addListener('focus', async () => {
        setCurrentStep(1);
        setZoneDistances(await DataAccess.getSortedZoneDistances());

        console.log("focusListener OrderScreen");
        });

        return focusSubscription;
    }, [navigation]);


    function navBack() {
        Alert.alert(
              "Are you sure you want to cancel this order ?",
              "Press cancell to return to home, continue to continue",
              [
                {
                  text: "Cancel",
                  onPress: () => navigation.navigate('Home'),
                },
                {
                text: "Continue",
                onPress: () => console.log("Continue Pressed") ,
                }
              ]
        );
    }

    async function updateOrderStatus(value1, value2, value3) {
        switch(currentStep) {
          case 1:
            console.log('Step 1: Setting startzone');
            setStartZone([value1, value2]);
            setCars(await DataAccess.getCarsFromZoneId(value1));
            console.log(startZone);
            break;
          case 2:
            console.log('Step 2: Setting car');
            setSelectedCar([value1, value2, value3]);
            break;
          case 3:
            console.log('Step 3: Setting start date');
            if (dateUpdated === 0) {
                setDateUpdated(1);
                setStartDate(value1);
            }
            break;
          case 4:
            console.log('Step 4: Setting hand-in zone');
            setDateUpdated(0);
            setEndZone([value1, value2]);
            break;
          case 5:
            console.log('Step 5: Order confirmed: push to firestore');
            DataAccess.pushOrder(startZone[0], selectedCar[0], Moment(startDate).format("YYYY-MM-DD"), endZone[0]);
            navigation.navigate('Home');
            break;
          default:
            console.log('Something went wrong here');
            navigation.navigate('Home');
            break;
        }
        setCurrentStep(currentStep + 1);
    }

    const onChangeStartDate = (event, selectedDate) => {
        updateOrderStatus(selectedDate);
    };

    const emptyValues = () => {
        setCurrentStep(1);
        setStartZone('');
        setEndZone('');
        setStartDate(new Date());
        setEndDate(new Date());
        setSelectedCar('');
    };

    const pushOrder = async () => {
        await DataAccess.pushOrder(startZone[0],endZone[0],selectedCar[0],0);
        emptyValues();
    };


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navBack()}>
                    <Icon name={"arrow-back"} size={25} color={'#4F4F4F'} style={styles.headerBackButton}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Step {currentStep}/5</Text>
            </View>
            { currentStep === 1 &&
                <View>
                    <Text> Select pick-up zone </Text>
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
                                <TouchableOpacity key={zoneDistance.id} onPress={() => updateOrderStatus(zoneDistance.id, zoneDistance.name)}>
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
                    <Text> Select car </Text>
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
                                <TouchableOpacity key={car.id} onPress={() => updateOrderStatus(car.id, car.name, car.price)}>
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

            { currentStep === 3 &&
                <View>
                    <Text>Select pick-up date</Text>
                    <DateTimePicker
                        testID="dateTimePickerStart"
                        value={new Date()}
                        minimumDate={Date.parse(new Date())}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeStartDate}
                    />
                </View>
            }

            { currentStep === 4 &&
                <View>
                    <Text> Select hand-in zone </Text>
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
                                <TouchableOpacity key={zoneDistance.id} onPress={() => updateOrderStatus(zoneDistance.id, zoneDistance.name)}>
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


            { currentStep === 5 &&
                <View>
                    <Text>Confirm your order</Text>
                    <Text>Car: {selectedCar[1]} </Text>
                    <Text>Price: € {selectedCar[2]}/dag{'\n'}</Text>

                    <Text>Pick-up zone: {startZone[1]}</Text>
                    <Text>Pick-up date: {Moment(startDate).format('DD-MM-YYYY')}{'\n'}</Text>

                    <Text>Hand-in zone: {endZone[1]}</Text>

                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => navBack()}
                        icon="close"
                        color="red"
                        labelStyle={{ color: "white", fontSize: 16 }}
                        style={styles.submitButton}
                    >
                    Cancel order
                    </Button>

                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => updateOrderStatus(0)}
                        icon="check"
                        color="green"
                        labelStyle={{ color: "white", fontSize: 16 }}
                        style={styles.submitButton}
                    >
                    Place order
                    </Button>

                </View>
            }

        </View>
    )
};

export default OrderScreen;