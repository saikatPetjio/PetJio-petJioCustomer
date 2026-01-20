/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('Token:', token);
        
        if (token) {
          // OPTIONAL: Dispatch an API call here to get fresh user data using the token
          // await dispatch(fetchUserProfile()).unwrap();
          
          navigation.replace('Main'); // Go to Home/Main Screen
        } else {
          navigation.replace('Login'); // Go to Login Screen
        }
      } catch (e) {
        console.error('Error checking token: ', e);
        navigation.replace('Login');
      }
    };
    // Give the splash screen a second to show your logo
    const timer = setTimeout(checkToken, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>PETJIO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#E91E63' },
});

export default SplashScreen;