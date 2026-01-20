import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomDrawerContent = (props: any) => {
  const handleLogout = async () => {
    try {
      // 1. Remove the token
      await AsyncStorage.removeItem('accessToken');

      // 2. Reset navigation to Login (so they can't go back)
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* This renders all your standard Drawer.Screen items */}
      <DrawerItemList {...props} />

      {/* This is your custom Logout button */}
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        // Optional: add an icon here
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
