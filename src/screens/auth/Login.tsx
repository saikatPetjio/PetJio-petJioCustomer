import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Images from '../../assets/images';
import Input from '../../components/Input';
import Icons from '../../assets/icons';
import SocialButton from '../../components/SocialButton';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { LoginRequest } from '../../services/authService';
import { loginUser } from '../../store/slices/authSlice';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ChoosePet: undefined;
};

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  //   const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const handleLogin = async () => {
    // Combine your local UI states into the format the API expects
    if(email === ''){
      Alert.alert('Please enter email');
      return;
    } else if(password === ''){
      Alert.alert('Please enter password');
      return;
    }
    const finalData: LoginRequest = {
      emailPhone: email,
      password: password,
    };

    try {
      // 1. Dispatch and unwrap the promise
      const res = await dispatch(loginUser(finalData)).unwrap();
      console.log('Login successful:', res?.body?.user);

      // 2. If it reaches here, the API was successful!
      // Navigate to the next screen
      navigation.navigate('ChoosePet');
    } catch (error) {
      // 3. If the API failed, it will land here
      // The 'error' here is whatever you passed to 'rejectWithValue' in your thunk
      console.log('error', error);
      console.error('Login failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logoImg} />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to log in
        </Text>

        <Input placeholder="User Name" value={email} onChangeText={setEmail} />
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

        {/* Remember & Forgot */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRemember(!remember)}
          >
            <View style={[styles.checkbox, remember && styles.checked]} />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
          <LinearGradient
            colors={['#EC4899', '#D946EF']}
            style={styles.loginButton}
          >
            {loading ? (
              <Text style={styles.loginText}>Loading...</Text>
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Social */}
        <Text style={styles.orText}>Or login with</Text>

        <View style={styles.socialRow}>
          <SocialButton source={Icons.google} />
          <SocialButton source={Icons.fb} />
        </View>

        {/* Signup */}
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.signupText}
        >
          Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>

        {/* Fingerprint */}
        <View style={styles.fingerprintContainer}>
          <Image source={Images.fingerPrint} style={styles.fingImg} />
          <Text style={styles.fingerprintText}>
            Please place your <Text style={styles.pink}>finger</Text> to your
            phone
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  /* ---------- Logo ---------- */
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#38BDF8',
  },
  logoHighlight: {
    color: '#F97316',
  },
  logoSub: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#6B7280',
    marginTop: 4,
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

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 12,
    marginBottom: 34,
  },

  /* ---------- Remember & Forgot ---------- */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 15,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    marginRight: 8,
  },

  checked: {
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
  },

  rememberText: {
    fontSize: 13,
    color: '#374151',
  },

  forgotText: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '500',
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

  /* ---------- Social ---------- */
  orText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 14,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  /* ---------- Signup ---------- */
  signupText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },

  signupLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },

  /* ---------- Fingerprint ---------- */
  fingerprintContainer: {
    alignItems: 'center',
    marginTop: 8,
  },

  fingerprint: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  fingerprintText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    width: '60%',
  },

  pink: {
    color: '#EC4899',
    fontWeight: '600',
  },
  /////extra////
  logoImg: {
    height: 160,
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
});

export default Login;
