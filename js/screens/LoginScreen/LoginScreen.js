import React from 'react'
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode };
if (!global.atob) { global.atob = decode };
import { auth } from '../../firebase';
import { db } from '../../firebase';
import styles from '../styles';

const LoginScreen = ({ navigation }) => {
    const { control, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
    const { email, password } = data;
    //console.log(data);
        auth
            .signInWithEmailAndPassword(email.trim().toLowerCase(), encode(password))
            .then((response) => {
                const uid = response.user.uid
                const usersRef = db.collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            console.log("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
        .catch(error => {
            alert(error)
        })
    };

    return (
        <View style={styles.authFormContainer}>
            <Controller
                control={control}
                rules={{
                    required: 'Email is required to login',
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
                required: "Password is required to login",
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

            <Button
                mode="contained"
                compact={false}
                onPress={handleSubmit(onSubmit)}
                icon="account-arrow-right"
                style={styles.submitButton}
            >
                Sign in
            </Button>

            <View style={styles.switchScreenText}>
                <Text> Don't have an account yet? </Text>
            </View>

            <Button
                mode="outlined"
                style={styles.switchBtn}
                icon="account-plus"
                compact
                onPress={() => navigation.navigate('Registration')}
            >
                Register Account
            </Button>
        </View>
    )
};

export default LoginScreen;