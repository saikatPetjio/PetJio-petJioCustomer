import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface Props {
  source: ImageSourcePropType;
}

const SocialButton: React.FC<Props> = ({ source }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
