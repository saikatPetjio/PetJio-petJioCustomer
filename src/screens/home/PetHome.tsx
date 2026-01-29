import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PetHome = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      console.log('Logged-in user:', user);
    }
  }, [user]);
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* 1. Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={Icons.menu} style={styles.menu} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image source={Images.logo} style={styles.logoImg} />
        </View>
        <View style={styles.headerRight}>
          <Image source={Icons.petCoin} style={styles.headerIcon} />
          <Text style={styles.headTxt}>Rs 500</Text>
        </View>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.headerRight}
        >
          <Image source={Images.dogHome} style={styles.headerIcon} />
          <Text style={styles.headTxt}>Max</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Suggested Pets Section */}
        <Text style={styles.sectionTitle}>Your Suggested Pets</Text>
        <View style={styles.heroCard}>
          <Image source={Images.dogHome} style={styles.heroImage} />
        </View>

        {/* 3. Nearby Veterinary */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Veterinary</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('VeterinaryList')}
          >
            <Text style={styles.viewAllLink}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VetCard
            name="Dr. Susmi Bhattacharya"
            sub="Veterinary diagnosis"
            price="500"
            dist="6 km"
          />
          <VetCard name="Dr. Anita Roy" sub="Surgeon" price="700" dist="2 km" />
        </ScrollView>

        {/* 4. Our Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllLink}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.servicesGrid}>
          <ServiceItem
            title="Boarding"
            icon={Images.training}
            color="#E1BEE7"
            onPress={() => navigation.navigate('DateSelection')}
          />
          <ServiceItem
            title="Grooming"
            icon={Images.training}
            color="#BBDEFB"
          />
          <ServiceItem
            title="Transport"
            icon={Images.training}
            color="#C8E6C9"
          />
        </View>
      </ScrollView>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.menuBox}>
              {/* Profile Section */}
              <View style={styles.menuHeader}>
                <Image source={Images.dogHome} style={styles.avatarLarge} />
                <Text style={styles.menuName}>{user?.firstName || 'Max'}</Text>
              </View>

              <TouchableOpacity style={styles.seeProfileBtn}>
                <Text style={styles.seeProfileText}>See all profile ›</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Menu Links */}
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Food Habit</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Vaccination</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Waking</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

// --- Sub-Components ---

const VetCard = ({ name, sub, price, dist }: any) => (
  <View style={styles.vetCard}>
    <Image source={Images.doctor1} style={styles.vetThumb} />
    <View>
      <Text style={styles.vetName}>{name}</Text>
      <Text style={styles.vetSub}>{sub}</Text>
      <View style={styles.vetFooter}>
        <Text style={styles.price}>Rs {price}</Text>
        <Text style={styles.dist}>📍 {dist}</Text>
      </View>
    </View>
  </View>
);

const ServiceItem = ({ title, icon, color, onPress }: any) => (
  <TouchableOpacity style={styles.serviceItem} onPress={onPress}>
    <View style={[styles.serviceIconCircle, { backgroundColor: color }]}>
      <Image source={icon} style={styles.serviceIcon} />
    </View>
    <Text style={styles.serviceTitle}>{title}</Text>
    <Text style={styles.serviceDesc}>Every dog learns at its own pace.</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#FFF', paddingTop: 15 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  menu: { width: 30, height: 30, resizeMode: 'contain' },
  headerIcon: { width: 30, height: 30, resizeMode: 'cover', borderRadius: 15 },
  logoImg: { width: 120, height: 30, resizeMode: 'contain' },
  headerRight: { flexDirection: 'row', gap: 8 },
  headTxt: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    alignSelf: 'center',
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllLink: { color: 'green', fontWeight: '600' },

  // Hero Card
  heroCard: {
    borderRadius: 20,
    height: 180,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  heroTextContainer: { flex: 1, justifyContent: 'center' },
  petName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  petMeta: { color: '#EEE', fontSize: 14 },
  statusRow: { marginVertical: 10 },
  statusText: { color: '#FFF', fontSize: 12 },
  distanceText: { color: '#FFF', fontSize: 12, marginTop: 4 },
  viewAllBtn: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  viewAllText: { color: '#FFF', fontSize: 12 },
  petImage: {
    width: 140,
    height: 160,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  // Vet Card
  vetCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 15,
    marginRight: 15,
    width: 250,
    alignItems: 'center',
  },
  vetThumb: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  vetName: { fontSize: 14, fontWeight: 'bold' },
  vetSub: { fontSize: 12, color: '#777' },
  vetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: { color: 'green', fontWeight: 'bold' },
  dist: { fontSize: 12, color: '#777' },

  // Services
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  serviceItem: { width: '30%', alignItems: 'center' },
  serviceIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceIcon: { width: 25, height: 25 },
  serviceTitle: { fontSize: 14, fontWeight: 'bold' },
  serviceDesc: { fontSize: 10, color: '#999', textAlign: 'center' },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Darken background
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuBox: {
    marginTop: 50, // Adjust based on your header height
    marginRight: 20,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarLarge: { width: 50, height: 50, borderRadius: 25 },
  menuName: { marginLeft: 15, fontSize: 18, fontWeight: 'bold' },
  seeProfileBtn: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  seeProfileText: { fontWeight: '600', color: '#333' },
  divider: { height: 1, backgroundColor: '#EEE', marginBottom: 10 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  menuItemText: { fontSize: 16, color: '#444' },
  arrow: { fontSize: 18, color: '#999' },
});

export default PetHome;
