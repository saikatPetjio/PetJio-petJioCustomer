import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownItem } from '../types/dropdown';
import Colors from '../themes/Colors';

interface Props {
  data: DropdownItem[];
  value: string | null;
  onChange: (item: DropdownItem) => void;
  placeholder?: string;
  search?: boolean;
}

const AppDropdown: React.FC<Props> = ({
  data,
  value,
  onChange,
  placeholder = 'Select item',
  search = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: Colors.primary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 5 },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: { fontSize: 16, color: '#111827' },
  selectedTextStyle: { fontSize: 16, color: '#111827' },
  inputSearchStyle: { height: 40, fontSize: 16, color: '#111827' },
});
