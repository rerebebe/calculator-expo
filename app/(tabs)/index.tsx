import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteEditor from '../components/NoteEditor';

export default function PrintableCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <Text style={styles.title}>Printable Undated Calendar</Text>
      {/* calendar */}
      <View>
        <Calendar
          style={styles.calendarContainer}
          onDayPress={(day: any) => setSelectedDate(day.dateString)}
          markedDates={
            selectedDate
              ? { [selectedDate]: { selected: true, selectedColor: '#d63384' } }
              : {}
          }
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: '#d63384',
            selectedDayBackgroundColor: '#d63384',
            selectedDayTextColor: '#fff',
            todayTextColor: '#d63384',
            dayTextColor: '#333',
            textDisabledColor: '#d9d9d9',
            arrowColor: '#d63384',
            monthTextColor: '#d63384',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textMonthFontSize: 20,
            textDayFontSize: 16,
            textDayHeaderFontSize: 14,
            'stylesheet.day.basic': {
              base: {
                width: '96%', // Size of each grid cell
                height: 60, // Size of each grid cell
                padding: 0,
                margin: 0,
                alignItems: 'flex-start', // Align number to the left
                justifyContent: 'flex-start', // Move number to top
                // paddingRight: 5, // Space from right edge
                // paddingTop: 5, // Space from top edge
                // borderWidth: 1,
                // borderColor: 'purple',
                backgroundColor: '#efe7db',
                borderRadius: 5,
              },
              text: {
                marginTop: 5,
                marginLeft: 5,
                color: '#333',
                fontSize: 16,
                fontWeight: 'bold',
              },
            },
            'stylesheet.calendar.main': {
              week: {
                margin: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                // borderWidth: 1,
                // borderColor: 'orange',
              },
            },
          }}
        />
      </View>

      {selectedDate && (
        <Text style={styles.selectedDateText}>
          Selected Date: {format(new Date(selectedDate), 'MMMM d, yyyy')}
        </Text>
      )}
      <NoteEditor
        visible={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        onSave={(note) => console.log('Note saved:', note)}
        selectedDate={selectedDate || ''}
        note={selectedDate ? `Note for ${selectedDate}` : ''}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fde4e4',
    backgroundColor: '#d4b99a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d63384',
    textAlign: 'center',
  },
  calendarContainer: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '85%',
    backgroundColor: 'transparent',
    // borderRadius: 10,
    // padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    // borderWidth: 2,
    // borderColor: 'purple',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#d63384',
  },
});
