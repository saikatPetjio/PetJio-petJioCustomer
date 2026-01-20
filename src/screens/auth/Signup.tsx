import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/images';
import Input from '../../components/Input';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { registerUser } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { RegisterRequest } from '../../services/authService';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  ChoosePet: undefined;
};

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const handleRegister = async () => {
    if (firstName === '') {
      Alert.alert('Please enter first name');
      return;
    } else if (lastName === '') {
      Alert.alert('Please enter last name');
      return;
    } else if (mobile === '') {
      Alert.alert('Please enter mobile number');
      return;
    } else if (password === '') {
      Alert.alert('Please enter password');
      return;
    } else if (conPassword === '') {
      Alert.alert('Please enter confirm password');
      return;
    } else if (password !== conPassword) {
      Alert.alert('Password and Confirm Password do not match');
      return;
    } else if (email === '') {
      Alert.alert('Please enter email');
      return;
    } else if (address === '') {
      Alert.alert('Please enter address');
      return;
    } else if (city === '') {
      Alert.alert('Please enter city');
      return;
    } else if (state === '') {
      Alert.alert('Please enter state');
      return;
    } else if (pinCode === '') {
      Alert.alert('Please enter pincode');
      return;
    }
    const finalData: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      password: password,
      address: address,
      pinCode: pinCode,
      city: city,
      state: state,
      lat: 22.5726,
      lng: 88.3639,
      roles: ['user'],
    };

    try {
      // 1. Dispatch and unwrap the promise
      const res = await dispatch(registerUser(finalData)).unwrap();
      console.log('Registration successful:', res);
      if (res.statusCode === 201 || res.statusCode === 200) {
        Alert.alert('Registration Successful');
        navigation.navigate('ChoosePet');
      } else {
        Alert.alert('Registration Failed', res.message || 'Please try again');
      }
      // 2. If it reaches here, the API was successful!
      // Navigate to the next screen
    } catch (error) {
      // 3. If the API failed, it will land here
      // The 'error' here is whatever you passed to 'rejectWithValue' in your thunk
      console.log('error', error);
      console.error('Registration failed:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <LinearGradient
        // Top color to transparent/white
        colors={['#A1EAFB', '#FFFFFF']}
        style={styles.background}
        // Gradient ends about 30% down the screen
        locations={[0, 0.4]}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cc}
          >
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image source={Images.logo} style={styles.logoImg} />
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>Signup</Text>

              <Text style={styles.labelTxt}>First Name</Text>
              <Input
                placeholder="User Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <Text style={styles.labelTxt}>Last Name</Text>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <Text style={styles.labelTxt}>Mobile Number</Text>
              <Input
                placeholder="Mobile Number"
                value={mobile}
                onChangeText={setMobile}
              />
              <Text style={styles.labelTxt}>Password</Text>
              <Input
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text style={styles.labelTxt}>Confirm Password</Text>
              <Input
                placeholder="Confirm Password"
                secureTextEntry
                value={conPassword}
                onChangeText={setConPassword}
              />
              <Text style={styles.labelTxt}>Email Id</Text>
              <Input
                placeholder="Email Id"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={styles.labelTxt}>Address</Text>
              <Input
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <Text style={styles.labelTxt}>City</Text>
              <Input placeholder="City" value={city} onChangeText={setCity} />
              <Text style={styles.labelTxt}>State</Text>
              <Input
                placeholder="State"
                value={state}
                onChangeText={setState}
              />

              <Text style={styles.labelTxt}>Pincode</Text>
              <Input
                placeholder="Pincode"
                value={pinCode}
                onChangeText={setPinCode}
              />

              {/* Login Button */}
              <TouchableOpacity
                // onPress={() => navigation.navigate('ChoosePet')}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#EC4899', '#D946EF']}
                  style={styles.loginButton}
                >
                  {loading ? (
                    <Text style={styles.loginText}>Loading...</Text>
                  ) : (
                    <Text style={styles.loginText}>Submit</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cc: {
    paddingBottom: 20,
  },

  /* ---------- Logo ---------- */
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },

  /* ---------- Card ---------- */
  card: {
    // backgroundColor: '#FFFFFF',
    // borderRadius: 16,
    // padding: 20,
    // shadowColor: '#000',
    // shadowOpacity: 0.08,
    // shadowRadius: 12,
    // shadowOffset: { width: 0, height: 6 },
    // elevation: 6,
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  /* ---------- Login Button ---------- */
  loginButton: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  /////extra////
  logoImg: {
    height: 80,
    width: 160,
    resizeMode: 'contain',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  fingImg: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  labelTxt: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
});
