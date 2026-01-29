import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomHead from '../../components/CustomHead';

type RootStackParamList = {
  AddYourPet: undefined;
  QueAns: undefined;
};

const ChoosePet: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <CustomHead>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logoImg} />
      </View>

      {/* Title */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Find your Perfect</Text>
        <Text style={styles.highlight}>CHOOSE YOUR PET</Text>
        <Text style={styles.subtitle}>
          Answer a few quick questions and we’ll match you with pets that fit
          your lifestyle
        </Text>
      </View>

      {/* Image */}
      <Image
        source={images.petGroup}
        style={styles.image}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('QueAns')} activeOpacity={0.85}>
          <LinearGradient colors={['#EC4899', '#D946EF']} style={styles.button}>
            <Text style={styles.buttonText}>Need a pet →</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddYourPet')} activeOpacity={0.85}>
          <LinearGradient colors={['#EC4899', '#D946EF']} style={styles.button}>
            <Text style={styles.buttonText}>Need pet serves →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </CustomHead>
  );
};

export default ChoosePet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
  },

  /* ---------- Logo ---------- */
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
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

  /* ---------- Text ---------- */
  textContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
    width: '80%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#111827',
  },
  highlight: {
    fontSize: 26,
    fontWeight: '800',
    color: '#EC4899',
    marginVertical: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
  },

  /* ---------- Image ---------- */
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'contain',
    marginVertical: 30,
  },

  /* ---------- Buttons ---------- */
  buttonContainer: {
    gap: 14,
  },
  button: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  logoImg: {
    height: 160,
    width: 160,
    resizeMode: 'contain',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});
