import React, { useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode };
if (!global.atob) { global.atob = decode };
import { auth } from '../../firebase';
import { db } from '../../firebase';
import styles from '../styles';

const RegistrationScreen = ({ navigation }) => {
    var passRegex = new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
    /*
    (?=.*[A-Z]) minstens 1 upperase leter
    (?=.*[a-z]) minstens 1 lowercase letter
    (?=.*[0-9]) minstens 1 cijfer
    (?=.{8,}) minstens 8 karakters lang
    */
    const { control, formState: { errors }, handleSubmit, watch, register } = useForm();
    const password = useRef({});
    const [showPassword, setShowPassword] = useState(false);
    const [icon, setIcon] = useState('eye');
    password.current = watch('password', '');

    function showPasswordToggle() {
        setShowPassword(!showPassword);
        if(showPassword) {
            setIcon('eye');
        }
        else {
            setIcon('eye-off');
        }
    }

    const onSubmit = (data) => {
        const { email, username, password } = data;
        auth
            .createUserWithEmailAndPassword(email.trim().toLowerCase(), encode(password))
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    username,
                    type: 'user',
            };
            const usersRef = db.collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .catch((error) => {
                    alert(error)
                });
            })
        .catch((error) => {
            alert(error)
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior="height" enabled keyboardVerticalOffset={50}>
            <ScrollView  style={styles.scrollContainer}>
                <View style={styles.authFormContainer}>
                    <Image
                        style={styles.smallLogo}
                        source={require('../../../assets/logo.png')}
                    />
                    <Text style={styles.title}> Registration </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Email is required to register',
                            validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Please enter a valid email, example: abc@domain.com',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Email"
                                mode="flat"
                                left={<TextInput.Icon name="email-open" color="orange" />}
                                theme={{colors: {primary: 'orange'}}}
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
                            required: 'Username is required to register',
                            minLength: {
                            value: 4,
                            message: 'Username should be at least 4 characters',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Username"
                                mode="flat"
                                left={<TextInput.Icon name="account" color="orange" />}
                                theme={{colors: {primary: 'orange'}}}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.formInput}

                            />
                        )}
                        name="username"
                        defaultValue=""
                    />

                    <View style={styles.errorMsg}>
                        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                    </View>

                    <Controller
                        control={control}
                        rules={{
                        required: "Password is required to register",
                        validate: (value) => passRegex.test(value) || 'Weak password: password should be at least 8 characters \nw/ min. 1 uppercase, 1 lowercase character & 1 digit',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Password"
                                mode="flat"
                                left={<TextInput.Icon name="lock" color="orange" />}
                                right={<TextInput.Icon name={icon} color="gray" onPress={() => showPasswordToggle()}/>}
                                theme={{colors: {primary: 'orange'}}}
                                secureTextEntry={!showPassword}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.formInput}
                            />
                        )}
                        name="password"
                        defaultValue=""
                    />

                    <View style={styles.errorMsg}>
                        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                    </View>

                    <Controller
                        control={control}
                        rules={{
                        required: "Confirm password is required to register",
                        validate: (value) => value === password.current || 'The passwords does not match'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Confirm Password"
                                mode="flat"
                                left={<TextInput.Icon name="lock-plus" color="orange" />}
                                right={<TextInput.Icon name={icon} color="gray" onPress={() => showPasswordToggle()}/>}
                                theme={{colors: {primary: 'orange'}}}
                                secureTextEntry={!showPassword}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.formInput}
                            />
                        )}
                        name="confirmPass"
                        defaultValue=""
                    />

                    <View style={styles.errorMsg}>
                        {errors.confirmPass && <Text style={styles.errorText}>{errors.confirmPass.message}</Text>}
                    </View>

                    <Button
                        mode="contained"
                        compact={false}
                        onPress={handleSubmit(onSubmit)}
                        icon="account-plus"
                        color="orange"
                        labelStyle={{ color: "white", fontSize: 16 }}
                        style={styles.submitButton}
                    >
                        Register Account
                    </Button>

                    <View style={styles.redirectText}>
                        <Text>Already have an account? <Text style={styles.redirectUnderlineText} onPress={() => navigation.navigate('Login')}>Sign in</Text></Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default RegistrationScreen;