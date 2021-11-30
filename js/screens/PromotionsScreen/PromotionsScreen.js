import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import styles from '../styles';

const PromotionsScreen = ({ navigation }) => {

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior="height" enabled keyboardVerticalOffset={50}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.authFormContainer}>
                    <Text> Promoties </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default PromotionsScreen;