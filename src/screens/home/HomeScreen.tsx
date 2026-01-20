import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* 1. Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={Icons.menu} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image source={Icons.search} style={styles.headerIcon} />
          <Image source={Icons.bell} style={styles.headerIcon} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Suggested Pets Section */}
        <Text style={styles.sectionTitle}>Your Suggested Pets</Text>
        <LinearGradient
          colors={['#4facfe', '#af89ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTextContainer}>
            <Text style={styles.petName}>Golden retriever</Text>
            <Text style={styles.petMeta}>Male</Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>Status: Available</Text>
              <Text style={styles.distanceText}>📍 6 km</Text>
            </View>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View all {'>'}</Text>
            </TouchableOpacity>
          </View>
          <Image source={Images.dog} style={styles.petImage} />
        </LinearGradient>

        {/* 3. Nearby Veterinary */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Veterinary</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VeterinaryList')}>
            <Text style={styles.viewAllLink}>View all {'>'}</Text>
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
            <Text style={styles.viewAllLink}>View all {'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.servicesGrid}>
          <ServiceItem title="Training" icon={Images.training} color="#E1BEE7" />
          <ServiceItem title="Grooming" icon={Images.training} color="#BBDEFB" />
          <ServiceItem title="Transport" icon={Images.training} color="#C8E6C9" />
        </View>


      </ScrollView>
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

const ServiceItem = ({ title, icon, color }: any) => (
  <View style={styles.serviceItem}>
    <View style={[styles.serviceIconCircle, { backgroundColor: color }]}>
      <Image source={icon} style={styles.serviceIcon} />
    </View>
    <Text style={styles.serviceTitle}>{title}</Text>
    <Text style={styles.serviceDesc}>Every dog learns at its own pace.</Text>
  </View>
);

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#FFF', paddingTop: 15 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerIcon: { width: 24, height: 24, resizeMode: 'contain' },
  headerRight: { flexDirection: 'row', gap: 15 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginVertical: 15,
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
    padding: 20,
    flexDirection: 'row',
    height: 180,
    overflow: 'hidden',
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


});

export default HomeScreen;
