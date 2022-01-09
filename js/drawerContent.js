import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { auth } from './firebase';
import { db } from './firebase';
import { Icon } from 'react-native-elements';
import styles from './screens/styles';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export function DrawerContent(props) {

    const signOut = () => {
        auth
        .signOut()
    }

    return (
        <View style={styles.drawerWrapper}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <View style={styles.drawerUserInfo}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image style={{alignSelf:'center'}}
                                source={require('../assets/user-placeholder.png')}
                                size={40}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.drawerUsername}>Username</Title>
                                <Caption style={styles.drawerMail}>user@email.com</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('History')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="history"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="History"
                            onPress={() => {props.navigation.navigate('History')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="gift-outline"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="Promotions"
                            onPress={() => {props.navigation.navigate('Promotions')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="help-circle-outline"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="FAQ"
                            onPress={() => {props.navigation.navigate('FAQ')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="information-outline"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="About us"
                            onPress={() => {props.navigation.navigate('About us')}}
                        />

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.drawerBottomSection}>
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

            </Drawer.Section>
        </View>
    );
};