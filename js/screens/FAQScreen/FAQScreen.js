import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';
import { List } from 'react-native-paper';
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
                    <List.Section>
                        <List.Accordion theme={{ colors: { primary: 'orange' }}} title="Question 1">
                            <List.Item
                            titleNumberOfLines={10}
                            title="Answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aenean ante urna, dignissim quis velit mattis, lacinia consectetur eros. Fusce diam nibh, finibus quis lectus at, mattis varius massa.
                            Aliquam rutrum urna sagittis, malesuada enim sed, sodales risus. Maecenas finibus commodo varius. Nam in placerat turpis, sed scelerisque mi. " />
                        </List.Accordion>

                        <List.Accordion theme={{ colors: { primary: 'orange' }}} title="Question 2">
                            <List.Item
                            titleNumberOfLines={10}
                            title="Answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aenean ante urna, dignissim quis velit mattis, lacinia consectetur eros. Fusce diam nibh, finibus quis lectus at, mattis varius massa.
                            Aliquam rutrum urna sagittis, malesuada enim sed, sodales risus. Maecenas finibus commodo varius. Nam in placerat turpis, sed scelerisque mi. " />
                        </List.Accordion>

                        <List.Accordion theme={{ colors: { primary: 'orange' }}} title="Question 3">
                            <List.Item
                            titleNumberOfLines={10}
                            title="Answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aenean ante urna, dignissim quis velit mattis, lacinia consectetur eros. Fusce diam nibh, finibus quis lectus at, mattis varius massa.
                            Aliquam rutrum urna sagittis, malesuada enim sed, sodales risus. Maecenas finibus commodo varius. Nam in placerat turpis, sed scelerisque mi. " />
                        </List.Accordion>


                    </List.Section>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default FAQScreen;