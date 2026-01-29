import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import images from '../../assets/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppDropdown from '../../components/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store/hook';
import {
  addPetSlice,
  fetchPetBreed,
  fetchPetCategories,
  fetchPetGenders,
  fetchPetSizes,
} from '../../store/slices/authSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHead from '../../components/CustomHead';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ChoosePet: undefined;
  Main: undefined;
  PetHome: undefined;
};

interface Breed {
  id: number;
  name: string;
  pet: {
    id: number;
    catName?: string;
  };
}

const AddYourPet: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectPet, setSelectPet] = useState<string | null>(null);
  const [selectPetName, setSelectPetName] = useState<string>('');
  const [petName, setPetName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [dailyFoodCount, setDailyFoodCount] = useState<string>('');
  const [selectBread, setSelectBread] = useState<string | null>(null);
  // const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const [selectSize, setSelectSize] = useState<string | null>(null);
  // const [selectOtherName, setSelectOtherName] = useState<string | null>(null);
  const [selectGender, setSelectGender] = useState<string | null>(null);
  // const [selectWeight, setSelectWeight] = useState<string | null>(null);
  const [selectDob, setSelectDob] = useState<string | null>(
    new Date().toISOString().split('T')[0],
  );
  const [showPicker, setShowPicker] = useState(false);
  const [dobLabel, setDobLabel] = useState('Select Date of Birth');
  const [filteredBreeds, setFilteredBreeds] = useState<any[]>([]);

  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { user, categories, sizes, genders, breeds } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(fetchPetCategories());
    dispatch(fetchPetSizes());
    dispatch(fetchPetGenders());
    dispatch(fetchPetBreed());
  }, [dispatch]);

  useEffect(() => {
    console.log('Categories fetched:', categories);
    console.log('Sizes fetched:', sizes);
    console.log('Genders fetched:', genders);
    console.log('Breeds fetched:', breeds);
    const filtered = breeds.filter(
      item => item.pet.catName.toLowerCase() === selectPetName?.toLowerCase(),
    );
    setFilteredBreeds(filtered);
  }, [categories, sizes, genders, breeds, selectPetName]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const handleAddPet = async () => {
    if (petName === '') {
      Alert.alert('Please enter pet name');
    } else if (!selectPet) {
      Alert.alert('Please select pet category');
    } else if (!selectSize) {
      Alert.alert('Please select pet size');
    } else if (!selectGender) {
      Alert.alert('Please select pet gender');
    } else if (weight === '') {
      Alert.alert('Please enter pet weight');
    } else if (dailyFoodCount === '') {
      Alert.alert('Please enter daily food count');
    } else {
      const petData = {
        petName: petName,
        dob: selectDob,
        category: parseInt(selectPet || '0', 10),
        size: parseInt(selectSize || '0', 10),
        ownerId: userId || '',
        profileImg: '',
        otherPetName: '',
        uploads: undefined,
        gender: parseInt(selectGender || '0', 10),
        weight: parseInt(weight, 10),
        dailyFeedCount: parseInt(dailyFoodCount, 10),
      };
      try {
        // 1. Dispatch and unwrap the promise
        const res = await dispatch(addPetSlice(petData)).unwrap();
        console.log('pet add  successful:', res);
        navigation.navigate('Main');
      } catch (error) {
        // 3. If the API failed, it will land here
        // The 'error' here is whatever you passed to 'rejectWithValue' in your thunk
        console.log('Detailed Error:', JSON.stringify(error, null, 2));
        console.error('Login failed:', error);
      }
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    // Hide the picker for Android immediately
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (selectedDate) {
      setSelectDob(selectedDate.toISOString().split('T')[0]);
      // Format the date for the input box (YYYY-MM-DD)
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDobLabel(formattedDate);
    }
  };

  return (
    <CustomHead>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logoImg} />
      </View>

      {/* Card */}
      <View>
        <Text style={styles.title}>Add a Pet</Text>
        <Text style={styles.labelTxt}>Select Pet</Text>
        <AppDropdown
          data={categories.map(cat => ({
            label: cat.catName,
            value: cat.id,
          }))}
          value={selectPet}
          onChange={item => {
            console.log('Selected pet category:', item.value);
            setSelectPet(item.value);
            setSelectPetName(item.label);
          }}
          search
          placeholder="Select Pets"
        />

        <Text style={styles.labelTxt}>Pet Breed</Text>
        <AppDropdown
          data={filteredBreeds.map(breed => ({
            label: breed.name,
            value: breed.id,
          }))}
          value={selectBread}
          onChange={item => setSelectBread(item.value)}
          search
          placeholder="Select Breeds"
        />

        <Text style={styles.labelTxt}>Pet Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pet Name"
          placeholderTextColor={'gray'}
          value={petName}
          onChangeText={setPetName}
        />

        {/* <Text style={styles.labelTxt}>Select Breed</Text>
          <AppDropdown
            data={petsData}
            value={selectBread}
            onChange={item => setSelectBread(item.value)}
            search
            placeholder="Select Breeds"
          /> */}

        {/* <Text style={styles.labelTxt}>Select Category</Text>
          <AppDropdown
            data={petsData}
            value={selectCategory}
            onChange={item => setSelectCategory(item.value)}
            search
            placeholder="Select Categories"
          /> */}

        {selectPet && parseInt(selectPet, 10) === 2 && (
          <>
            <Text style={styles.labelTxt}>Size</Text>
            <AppDropdown
              data={sizes.map(size => ({
                label: size.size,
                value: size.id,
              }))}
              value={selectSize}
              onChange={item => setSelectSize(item.value)}
              search
              placeholder="Select Sizes"
            />
          </>
        )}

        {/* <Text style={styles.labelTxt}>Other Name</Text>
          <AppDropdown
            data={petsData}
            value={selectOtherName}
            onChange={item => setSelectOtherName(item.value)}
            search
            placeholder="Select Other Names"
          /> */}

        <Text style={styles.labelTxt}>Gender</Text>
        <AppDropdown
          data={genders.map(gender => ({
            label: gender.name,
            value: gender.id,
          }))}
          value={selectGender}
          onChange={item => setSelectGender(item.value)}
          placeholder="Select Genders"
        />
        <Text style={styles.labelTxt}>Dob</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Select Dob"
            placeholderTextColor={'gray'}
            value={selectDob || ''}
            onChangeText={setSelectDob}
            editable={false}
          />
        </TouchableOpacity>

        <Text style={styles.labelTxt}>Weight</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pet Weight"
          placeholderTextColor={'gray'}
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.labelTxt}>Daily Food Count</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Daily Food Count"
          placeholderTextColor={'gray'}
          value={dailyFoodCount}
          onChangeText={setDailyFoodCount}
        />

        <TouchableOpacity onPress={handleAddPet} activeOpacity={0.8}>
          <LinearGradient colors={['#EC4899', '#D946EF']} style={styles.btn}>
            <Text style={styles.btnTxt}>Sumbmit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectDob ? new Date(selectDob) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()} // Prevents selecting future dates
          onChange={onChange}
        />
      )}
    </CustomHead>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
  },
  /* ---------- Logo ---------- */
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: '20%',
    // backgroundColor: 'red'
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

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoImg: {
    height: 80,
    width: 160,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  labelTxt: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#9A9A9A',
    marginBottom: 6,
  },
  selectBox: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
  },
  selectText: {
    fontSize: 14,
    color: '#999999',
  },
  chevron: {
    fontSize: 16,
    color: '#999999',
  },
  uploadBox: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
  },
  uploadText: {
    fontSize: 14,
    color: '#999999',
  },
  uploadIcons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 18,
    marginLeft: 10,
  },
  submitButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  btn: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  btnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 14,
    color: '#111827',
  },
});

export default AddYourPet;
