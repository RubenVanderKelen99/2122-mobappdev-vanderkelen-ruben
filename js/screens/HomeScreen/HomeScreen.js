import React from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
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
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center'}}
        behavior="height" enabled keyboardVerticalOffset={100}>
            <ScrollView>
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
                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => navigation.navigate('CompleteProfile')}
                        icon="account-arrow-left"
                        style={styles.submitButton}
                    >
                        Complete profile
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
)
};

export default HomeScreen;