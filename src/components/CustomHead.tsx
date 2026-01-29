import React from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  StatusBar, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomHead: React.FC<{ children: React.ReactNode; statusBarColor?: string }> = ({ 
  children, 
  statusBarColor = "#BFF3FF" 
}) => {
  return (
    <LinearGradient
      colors={[statusBarColor, '#FFFFFF']}
      locations={[0, 0.3]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle="dark-content"
        translucent={true}
      />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default CustomHead;