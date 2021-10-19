import React, { useRef } from 'react'
import { View, Text } from 'react-native';
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
    password.current = watch('password', '');

    const onSubmit = (data) => {
        const { email, password } = data;
        auth
            .createUserWithEmailAndPassword(email.trim().toLowerCase(), encode(password))
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email
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
        <View style={styles.authFormContainer}>
            <Controller
                control={control}
                rules={{
                    required: 'Email is required to register',
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
                required: "Password is required to register",
                validate: (value) => passRegex.test(value) || 'Weak password: password should be at least 8 characters \nw/ min. 1 uppercase, 1 lowercase character & 1 digit',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Password"
                        mode="outlined"
                        secureTextEntry
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
                        label="Confirm Password"
                        mode="outlined"
                        secureTextEntry
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
                style={styles.submitButton}
            >
                Register Account
            </Button>

            <View style={styles.switchScreenText}>
                <Text> Already have an account? </Text>
            </View>

            <Button
                mode="outlined"
                style={styles.switchBtn}
                icon="account-arrow-right"
                compact
                onPress={() => navigation.navigate('Login')}
            >
                Login
            </Button>
        </View>
    )
};

export default RegistrationScreen;