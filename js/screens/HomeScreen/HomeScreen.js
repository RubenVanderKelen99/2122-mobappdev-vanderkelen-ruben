import React from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { auth } from '../../firebase';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {
    const signOut = () => {
        auth
            .signOut()
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <View style={styles.authFormContainer}>
                <Button
                mode="contained"
                compact={false}
                onPress={() => signOut()}
                icon="account-arrow-left"
                style={styles.submitButton}
                >
                    Sign out
                </Button>
           </View>
        </View>
)
};

export default HomeScreen;