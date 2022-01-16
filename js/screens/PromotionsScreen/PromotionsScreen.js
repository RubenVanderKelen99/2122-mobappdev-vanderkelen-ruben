import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import styles from '../styles';

const PromotionsScreen = ({ navigation }) => {

    const { control, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
    const { promocode } = data;
        //console.log(data);
    };

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
                        <Text style={styles.headerTitle}> Promotions </Text>
                    </View>

                    <Controller
                            control={control}
                            rules={{
                                required: 'Please enter a promocode',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Promocode"
                                    mode="flat"
                                    theme={{colors: {primary: 'orange'}}}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={styles.formInputPromo}
                                />
                            )}
                            name="promocode"
                            defaultValue=""
                        />
                        <View style={styles.errorMsg}>
                            {!errors.promocode && <Text>Enter a promocode to have it automatically applied to your next ride.</Text>}
                            {errors.promocode && <Text style={styles.errorText}>{errors.promocode.message}</Text>}
                        </View>

                        <Button
                            mode="contained"
                            compact={false}
                            onPress={handleSubmit(onSubmit)}
                            color="orange"
                            labelStyle={{ color: "white", fontSize: 16 }}
                            style={styles.submitButton}
                        >
                            Toevoegen
                        </Button>

                </View>
            </ScrollView>
    )
};

export default PromotionsScreen;