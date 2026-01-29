import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const DateSelectionScreen = () => {
  const [range, setRange] = useState<{
    start: string | null;
    end: string | null;
  }>({
    start: null,
    end: null,
  });

  // Track which month/year the calendar is currently showing
  const [currentDate] = useState('2025-11-01');

  const onDayPress = (day: any) => {
    const { dateString } = day;

    if (!range.start || (range.start && range.end)) {
      setRange({ start: dateString, end: null });
    } else {
      if (dateString < range.start) {
        setRange({ start: dateString, end: null });
      } else {
        setRange({ ...range, end: dateString });
      }
    }
  };

  // Memoize this to prevent heavy re-renders on every click
  const markedDates = useMemo(() => {
    let marked: any = {};

    if (range.start) {
      marked[range.start] = {
        startingDay: true,
        color: '#FF40B4',
        textColor: 'white',
      };
    }

    if (range.start && range.end) {
      marked[range.end] = {
        endingDay: true,
        color: '#FF40B4',
        textColor: 'white',
      };

      let start = new Date(range.start);
      let end = new Date(range.end);

      // Safety: iterate through days between start and end
      let curr = new Date(start);
      curr.setDate(curr.getDate() + 1);

      while (curr < end) {
        const str = curr.toISOString().split('T')[0];
        marked[str] = { color: '#FF40B4', textColor: 'white', opacity: 0.7 };
        curr.setDate(curr.getDate() + 1);
      }
    }
    return marked;
  }, [range]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Date and Time</Text>
      </View>

      <View style={styles.calendarWrapper}>
        <Calendar
          // Key prop ensures the component re-renders if we force a date jump
          key={currentDate}
          current={currentDate}
          markingType={'period'}
          onDayPress={onDayPress}
          markedDates={markedDates}
          // Enable month/year clicking (Wix calendar behavior)
          enableSwipeMonths={true}
          theme={{
            calendarBackground: '#ffffff',
            selectedDayBackgroundColor: '#FF40B4',
            arrowColor: '#FF40B4',
            monthTextColor: '#000',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => console.log('Selected Range:', range)}
      >
        <LinearGradient
          colors={range.end ? ['#4facfe', '#f093fb'] : ['#D1D1D1', '#BDBDBD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.nextButton}
        >
          <Text style={styles.buttonText}>Next {'>'}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F9FF', // Light cyan background from your image
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  calendarWrapper: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 10,
    // Shadow/Elevation
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  nextButton: {
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DateSelectionScreen;
