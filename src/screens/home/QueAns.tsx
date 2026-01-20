import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../assets/icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

/* =======================
   TYPES
======================= */
type RootStackParamList = {
  Main: undefined;
};

type Option = {
  label: string;
  value: string;
};

type Block = {
  id: string;
  title: string;
  type: 'single' | 'multi';
  options: Option[];
};

type Step = {
  title: string;
  subtitle?: string;
  blocks: Block[];
};

/* =======================
   DATA
======================= */

const STEPS: Step[] = [
  {
    title: 'Choose your pet',
    subtitle: "Tell us what you're looking for.",
    blocks: [
      {
        id: 'pet',
        title: '',
        type: 'single',
        options: [
          { label: 'Dog', value: 'dog' },
          { label: 'Cat', value: 'cat' },
          { label: 'Bird', value: 'bird' },
          { label: 'Fish', value: 'fish' },
          { label: 'Small animal', value: 'small' },
          { label: 'Exotic', value: 'exotic' },
        ],
      },
    ],
  },
  {
    title: 'About you',
    blocks: [
      {
        id: 'age',
        title: 'Age range',
        type: 'single',
        options: [
          { label: '18–24', value: '18-24' },
          { label: '25–35', value: '25-35' },
          { label: '36–45', value: '36-45' },
          { label: '46–55', value: '46-55' },
          { label: '56–65', value: '56-65' },
          { label: '65+', value: '65+' },
        ],
      },
      {
        id: 'gender',
        title: 'Gender',
        type: 'single',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Prefer not to say', value: 'na' },
        ],
      },
    ],
  },
  {
    title: 'Your living space',
    blocks: [
      {
        id: 'home',
        title: 'Where do you live?',
        type: 'single',
        options: [
          { label: 'Apartment', value: 'apartment' },
          { label: 'Independent house', value: 'house' },
          { label: 'Farmhouse', value: 'farm' },
          { label: 'Shared accommodation', value: 'shared' },
        ],
      },
      {
        id: 'space',
        title: 'Outdoor space',
        type: 'single',
        options: [
          { label: 'Private yard', value: 'yard' },
          { label: 'Shared community area', value: 'community' },
          { label: 'No outdoor access', value: 'none' },
        ],
      },
    ],
  },
  {
    title: 'Your preferences',
    blocks: [
      {
        id: 'traits',
        title: 'Traits',
        type: 'multi',
        options: [
          { label: 'Kid-friendly', value: 'kid' },
          { label: 'Apartment-friendly', value: 'apt' },
          { label: 'Low energy', value: 'low_energy' },
          { label: 'High energy', value: 'high_energy' },
          { label: 'Low noise', value: 'quiet' },
        ],
      },
    ],
  },
];

/* =======================
   SCREEN
======================= */

const STORAGE_KEY = 'ONBOARDING_STATE';

const QueAns: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const translateX = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  /* =======================
     ANIMATION
  ======================= */

  const animate = (direction: 1 | -1, cb: () => void) => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -30 * direction,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(cb);
  };

  /* =======================
     PERSISTENCE
  ======================= */

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep, answers }));
  }, [currentStep, answers]);

  useEffect(() => {
    const restore = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setCurrentStep(parsed.currentStep || 0);
        setAnswers(parsed.answers || {});
      }
    };
    restore();
  }, []);

  /* =======================
     HELPERS
  ======================= */

  const isStepComplete = () =>
    step.blocks.every(b =>
      b.type === 'multi'
        ? Array.isArray(answers[b.id]) && answers[b.id].length > 0
        : Boolean(answers[b.id]),
    );

  const handleSelect = (block: Block, value: string) => {
    setAnswers(prev => {
      if (block.type === 'multi') {
        const arr = prev[block.id] || [];
        return {
          ...prev,
          [block.id]: arr.includes(value)
            ? arr.filter((v: string) => v !== value)
            : [...arr, value],
        };
      }
      return { ...prev, [block.id]: value };
    });
  };

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      animate(1, () => setCurrentStep(s => s + 1));
    } else {
      console.log('FINAL ANSWERS:', answers);
      navigation.navigate('Main');
      AsyncStorage.removeItem(STORAGE_KEY);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      animate(-1, () => setCurrentStep(s => s - 1));
    }
  };

  /* =======================
     RENDER
  ======================= */

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={back} disabled={currentStep === 0}>
          {/* <Text style={styles.back}>{currentStep === 0 ? '' : '←'}</Text> */}
          {currentStep === 0 ? null : (
            <Image source={icons.left} style={styles.left} />
          )}
        </TouchableOpacity>
        <Text style={styles.percent}>{Math.round(progress)}%</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Content */}
      <Animated.ScrollView
        style={{ transform: [{ translateX }] }}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>{step.title}</Text>
        {step.subtitle && <Text style={styles.subtitle}>{step.subtitle}</Text>}

        {step.blocks.map(block => (
          <View key={block.id} style={styles.block}>
            {block.title !== '' && (
              <Text style={styles.blockTitle}>{block.title}</Text>
            )}
            <View style={styles.optionsContainer}>
              {block.options.map(opt => {
                const selected =
                  block.type === 'multi'
                    ? answers[block.id]?.includes(opt.value)
                    : answers[block.id] === opt.value;

                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.option}
                    onPress={() => handleSelect(block, opt.value)}
                  >
                    <View
                      style={[styles.radio, selected && styles.radioSelected]}
                    />
                    <Text>{opt.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Next */}
      <TouchableOpacity
        style={[styles.nextButton, !isStepComplete() && styles.disabled]}
        disabled={!isStepComplete()}
        onPress={next}
      >
        <Text style={styles.nextText}>
          {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QueAns;

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  left: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  back: { fontSize: 22 },
  percent: { color: '#FF2D95', fontWeight: '600', fontSize: 20 },
  progressBar: {
    height: 4,
    backgroundColor: '#EEE',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF2D95',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: {
    color: '#777',
    marginVertical: 8,
  },
  block: { marginTop: 20 },
  blockTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
  option: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#FF2D95',
    marginRight: 12,
  },
  radioSelected: {
    backgroundColor: '#FF2D95',
  },
  nextButton: {
    height: 54,
    backgroundColor: '#FF2D95',
    margin: 20,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.4 },
  nextText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
