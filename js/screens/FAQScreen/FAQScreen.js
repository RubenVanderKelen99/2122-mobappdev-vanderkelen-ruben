import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';
import styles from '../styles';

const FAQScreen = ({ navigation }) => {

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior="height" enabled keyboardVerticalOffset={50}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.authFormContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name={"arrow-back"} size={25} color={'#4F4F4F'} style={styles.headerBackButton}/>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}> FAQ </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default FAQScreen;