import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import styles from '../styles';

/*
Hierop moet komen:
email x
name x
surName x
geboortedatum
country(Code)
Ook meegeven:
isDriver: false
*/

const CompleteProfileScreen = ({ navigation }) => {

    const { control, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
            console.log(data);
    }

    return (
        <View style={styles.authFormContainer}>

            <Controller
                control={control}
                    rules={{
                        required: 'Please enter a email',
                        validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Please enter a valid email, example: abc@domain.com',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Email"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={styles.formInput}
                        />
                    )}
                    name="email"
                    defaultValue=""
            />

            <View style={styles.errorMsg}>
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

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

            <Controller
                      control={control}
                      render={({ value }) => (
                        <View>
                          <Picker
                            selectedValue={value}
                            mode='dropdown'
                          >
                            <Picker.Item value='' label='Month' />
                            <Picker.Item label="January" value="01" />
                            <Picker.Item label="February" value="02" />
                            <Picker.Item label="March" value="03" />
                            <Picker.Item label="April" value="04" />
                            <Picker.Item label="May" value="05" />
                            <Picker.Item label="June" value="06" />
                            <Picker.Item label="July" value="07" />
                            <Picker.Item label="August" value="08" />
                            <Picker.Item label="September" value="09" />
                            <Picker.Item label="October" value="10" />
                            <Picker.Item label="November" value="11" />
                            <Picker.Item label="December" value="12" />
                          </Picker>
                        </View>
                      )}
                      name="language"
                    />


            <Controller
                control={control}
                rules={{
                    required: 'Please enter a day',
                    validate: {
                        isNumber: value => /^[0-9]*$/.test(value) || 'Please enter numbers only',
                        //checkLength: value => value.length > 3 || 'Please enter a valid day',
                        minimum: value => value >= 1 || 'Please enter a valid day',
                        maximum: value  => value <= 31 || 'Please enter a valid day', //kijken afhankelijk van de maand
                        },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode="outlined"
                        keyboardType='numeric'
                        maxLength={2}
                        placeholder="Day"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.formInput}
                    />
                )}
                    name="birthDay"
            />

            <Controller
                control={control}
                rules={{
                    required: 'Please enter a year',
                    validate: {
                    isNumber: value => /^[0-9]*$/.test(value) || 'Please enter numbers only',
                    checkLength: value => value.length === 4 || 'Please enter a valid year',
                    minimum: value => value >= 1900 || 'Please enter a valid year',
                    maximum: value  => value <= 2020 || 'Please enter a valid year', //updaten met huidig jaar zodat dit altijd persoon van 18+ is
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode="outlined"
                        keyboardType='numeric'
                        maxLength={4}
                        placeholder="Year"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.formInput}
                    />
                )}
                name="birthYear"
            />

             <View style={styles.errorMsg}>
                {errors.birthDay && <Text style={styles.errorText}>{errors.birthDay.message}</Text>}
                {errors.birthYear && <Text style={styles.errorText}>{errors.birthYear.message}</Text>}
             </View>


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