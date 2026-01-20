import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '../../../assets/icons';
import Images from '../../../assets/images';

// Mock Data based on your screenshot
const VET_DATA = Array(10).fill({
  id: Math.random().toString(),
  name: 'Dr. Susmi Bhattacharya',
  type: 'Veterinary diagnosis',
  price: '500',
  distance: '6 km',
  image: Images.doctor1, // Replace with actual path
});

const VeterinaryList = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            Rs <Text style={styles.priceValue}>{item.price}</Text>
          </Text>
          <View style={styles.distContainer}>
            <Text style={styles.distIcon}>📍</Text>
            <Text style={styles.distText}>{item.distance}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (navigation as any).openDrawer()}>
          <Image source={Icons.menu} style={styles.icon} />
        </TouchableOpacity>
        <Image source={Images.dog} style={styles.logo} />
        <View style={styles.profileContainer}>
          <Image source={Images.dog} style={styles.profilePic} />
          <Text style={styles.profileName}>Max ⌵</Text>
        </View>
      </View>

      {/* Back button and Title */}
      <View style={styles.titleRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>List of Veterinary</Text>
      </View>

      <FlatList
        data={VET_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FDFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  icon: { width: 24, height: 24, resizeMode: 'contain' },
  logo: { width: 100, height: 40, resizeMode: 'contain' },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 20,
    elevation: 2,
  },
  profilePic: { width: 30, height: 30, borderRadius: 15 },
  profileName: { fontSize: 12, fontWeight: 'bold', marginLeft: 5 },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  backBtn: { marginRight: 15 },
  backArrow: { fontSize: 24, color: '#333' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },

  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F3E5F5', // Light purple tint from image
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  infoContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  type: { fontSize: 14, color: '#777', marginVertical: 4 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  price: { fontSize: 14, color: '#777' },
  priceValue: { color: 'green', fontWeight: 'bold' },
  distContainer: { flexDirection: 'row', alignItems: 'center' },
  distIcon: { fontSize: 12, marginRight: 4 },
  distText: { fontSize: 12, color: '#777' },
});

export default VeterinaryList;
