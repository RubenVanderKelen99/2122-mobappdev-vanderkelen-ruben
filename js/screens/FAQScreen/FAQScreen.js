import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';
import { List } from 'react-native-paper';
import styles from '../styles';

const FAQScreen = ({ navigation }) => {

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        (async () => {
            const faqsRef = db.collection('faqs');
            const snapshot = await faqsRef.get();
            //data telkens pushen naar faqs, faqs eerst leegmaken
            setFaqs(faqs => []);
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                setFaqs(faqs => faqs.concat(doc.data()));
            });
            console.log(faqs);
        })();
    }, []);

    function navBack() {
    if (navigation.canGoBack())
       navigation.goBack()
    else
       navigation.navigate('Home')
    }


    return (
            <ScrollView style={styles.scrollContainer1}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            onPress={() => navBack()}
                        >
                            <Icon name={"arrow-back"} size={25} color={'#4F4F4F'} style={styles.headerBackButton}/>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}> FAQ </Text>
                    </View>
                    <List.Section>
                        {faqs.map((faq)  =>
                        <List.Accordion key={faq.id} theme={{ colors: { primary: 'orange' }}} title={faq.question}>
                            <List.Item
                            titleNumberOfLines={10}
                            title={faq.anwser}
                            />
                        </List.Accordion>
                        )}
                    </List.Section>

            </ScrollView>
    )
};

export default FAQScreen;