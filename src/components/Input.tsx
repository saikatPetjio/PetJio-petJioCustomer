import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const Input: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor="#9CA3AF"
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
});
