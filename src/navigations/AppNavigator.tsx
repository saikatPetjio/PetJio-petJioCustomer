/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/home/HomeScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import Icons from '../assets/icons';
import { Image, StyleSheet } from 'react-native';
import Login from '../screens/auth/Login';
import ChoosePet from '../screens/auth/ChoosePet';
import QueAns from '../screens/home/QueAns';
import AddYourPet from '../screens/home/AddYourPet';
import VeterinaryList from '../screens/home/services/VeterinaryList';
import Signup from '../screens/auth/Signup';
import PetHome from '../screens/home/PetHome';
import CustomDrawerContent from './CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. Bottom Tab Navigator
const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#E91E63', // Your primary brand color
      tabBarInactiveTintColor: '#8E8E93',
      tabBarStyle: {
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
      },
      tabBarIcon: ({ focused, size }) => {
        let iconSource;

        // Logic to choose icon based on route name
        switch (route.name) {
          case 'Home':
            iconSource = Icons.home;
            break;
          case 'Mart':
            iconSource = Icons.mart;
            break;
          case 'Services':
            iconSource = Icons.service;
            break;
          case 'Forum':
            iconSource = Icons.service;
            break;
          case 'Profile':
            iconSource = Icons.profile;
            break;
        }

        return (
          <Image
            source={iconSource}
            style={[
              styles.icon,
              {
                tintColor: focused ? '#E91E63' : '#8E8E93',
                width: size,
                height: size,
              },
            ]}
            resizeMode="contain"
          />
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={PetHome} />
    <Tab.Screen name="Mart" component={HomeScreen} />
    <Tab.Screen name="Services" component={HomeScreen} />
    <Tab.Screen name="Forum" component={HomeScreen} />
    <Tab.Screen name="Profile" component={HomeScreen} />
  </Tab.Navigator>
);

// 2. Drawer Navigator (Wraps the Tabs)
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props} />}
    screenOptions={{ headerShown: false, drawerType: 'front' }}
  >
    <Drawer.Screen
      name="MainTabs"
      component={BottomTabNavigator}
      options={{ title: 'Home' }}
    />
    {/* Add more drawer items here like 'Settings' or 'My Orders' */}
  </Drawer.Navigator>
);

// 3. Root Stack (Handles Splash Logic)
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ChoosePet" component={ChoosePet} />
      <Stack.Screen name="QueAns" component={QueAns} />
      <Stack.Screen name="AddYourPet" component={AddYourPet} />
      <Stack.Screen name="VeterinaryList" component={VeterinaryList} />
      <Stack.Screen name="PetHome" component={PetHome} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});
