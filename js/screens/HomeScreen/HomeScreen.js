import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { auth } from '../../firebase';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {
    const signOut = () => {
        auth
            .signOut()
    }

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior="height" enabled keyboardVerticalOffset={100}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.authFormContainer}>
                    <TouchableOpacity
                        style={styles.roundButton}
                    >
                        <Icon name={"menu"} size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.roundButton}
                    >
                        <Icon name={"my-location"} type='material' size={30} color="gray" />
                    </TouchableOpacity>

                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => signOut()}
                        icon="account-arrow-left"
                        color="orange"
                        labelStyle={{ color: "white", fontSize: 16 }}
                        style={styles.submitButton}
                    >
                        Sign out
                    </Button>
                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => navigation.navigate('CompleteProfile')}
                        icon="account-arrow-left"
                        color="orange"
                        labelStyle={{ color: "white", fontSize: 16 }}
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