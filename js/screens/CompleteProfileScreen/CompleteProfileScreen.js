import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import styles from '../styles';

/*
Hierop moet komen:
email
name x
surName x
geboortedatum
country(Code)
Ook meegeven:
isDriver: false
*/

const CompleteProfileScreen = ({ navigation }) => {

    const { control, formState: { errors }, handleSubmit } = useForm();
    const [date, setDate] = useState(new Date());


    const onSubmit = (data) => {
            console.log(data);
    }

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <View style={styles.authFormContainer}>
            <Controller
                control={control}
                rules={{
                    required: 'Please enter a name',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Name"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.formInput}
                    />
                )}
                name="name"
                defaultValue=""
            />

            <View style={styles.errorMsg}>
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>

            <Controller
                control={control}
                rules={{
                    required: 'Please enter a surname',
                }}
               render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    label="Surname"
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.formInput}
                    />
               )}
               name="surName"
               defaultValue=""
            />

            <View style={styles.errorMsg}>
                {errors.surName && <Text style={styles.errorText}>{errors.surName.message}</Text>}
            </View>

            <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      display="calendar"
                      onChange={onChange}
            />

            <Button
                mode="contained"
                compact={false}
                onPress={handleSubmit(onSubmit)}
                icon="account-arrow-right"
                style={styles.submitButton}
            >
                Complete profile
            </Button>

        </View>
    )

};

export default CompleteProfileScreen;