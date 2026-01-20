import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';


interface CustomTextInputProps extends TextInputProps {
  label: string;
  icon?: string;
  error?: string;
  showPasswordToggle?: boolean;
  secureTextEntry?: boolean;
  onTogglePassword?: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  secureTextEntry,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
       
        <View style={styles.inputContent}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            {...textInputProps}
            secureTextEntry={secureTextEntry}
            style={styles.textInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    marginBottom: 10,
    minHeight: 7.5,
  },
  iconContainer: {
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 2,
  },
  inputLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    fontSize: 15,
    color: '#111827',
    padding: 0,
    margin: 0,
    minHeight: 24,
    fontWeight: '500',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  eyeIconContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    borderRadius: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default CustomTextInput;
