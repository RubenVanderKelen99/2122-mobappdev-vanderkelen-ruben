import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import CountryPicker, { CountryModalProvider, getAllCountries, getCallingCode } from 'react-native-country-picker-modal';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import styles from '../styles';

/*
Hierop moet komen:
email x
name x
surName x
geboortedatum (dag, maand, jaar) x
country(Code) x
Ook meegeven:
isDriver: false
*/

const CompleteProfileScreen = ({ navigation }) => {

    const { control, formState: { errors }, handleSubmit } = useForm();
    const [countryCode, setCountryCode] = useState(null);
    const [country, setCountry] = useState(null);
    const [visible, setVisible] = useState(false);


    const onSubmit = (data) => {
            console.log(data);
    }

    const onSelect = (country: Country) => {
        setCountry(country);
        setCountryCode(country.cca2);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center'}}
        behavior="height" enabled keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.authFormContainer}>

                    <Controller
                        control={control}
                            rules={{
                                required: 'Please enter a email',
                                validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Please enter a valid email, example: abc@domain.com',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Email"
                                    mode="flat"
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
                                placeholder="Name"
                                mode="flat"
                                autoCapitalize="words"
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
                            placeholder="Surname"
                            mode="flat"
                            autoCapitalize="words"
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
                                    <Picker.Item value='' label='Month' enabled={false}/>
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
                        name="birthMonth"
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
                                mode="flat"
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
                        {errors.birthMonth && <Text style={styles.errorText}>{errors.birthMonth.message}</Text>}
                        {errors.birthDay && <Text style={styles.errorText}>{errors.birthDay.message}</Text>}
                        {errors.birthYear && <Text style={styles.errorText}>{errors.birthYear.message}</Text>}
                     </View>

                     <Controller
                        control={control}
                        rules={{
                        required: 'Please select a country',
                        }}
                        render={({ value }) => (
                            <View>
                                 <CountryPicker
                                    {...{
                                        placeholder:'Country',
                                        withFilter:true,
                                        withFlag:true,
                                        withCountryNameButton:true,
                                        withEmoji:true,
                                        withModal:true,
                                        withFlagButton:true,
                                        onSelect,
                                        disableNativeModal:false,
                                        preferredCountries: ['BE', 'NL', 'FR', 'DE'],
                                        onClose: () => setVisible(false),
                                        onOpen: () => setVisible(true),
                                    }}
                                 />
                            </View>
                        )}
                        name="country"
                     />

                     <Text style={styles.instructions}>Press on the flag to open modal</Text>
                     {country !== null && (<Text style={styles.data}>{JSON.stringify(country, null, 0)}</Text>)}

                     <View style={styles.errorMsg}>
                        {errors.country && <Text style={styles.errorText}>{errors.country.message}</Text>}
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
            </ScrollView>
        </KeyboardAvoidingView>
    )

};

export default CompleteProfileScreen;