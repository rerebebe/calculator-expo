import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEventsStore } from '../../stores/eventsStore';

export default function NewEventScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [participants, setParticipants] = useState([
    { name: '', amount: '', activity: '', isPayer: false },
  ]);
  const addEvent = useEventsStore((state) => state.addEvent);

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { name: '', amount: '', activity: '', isPayer: false },
    ]);
  };

  const updateParticipant = (index: number, field: string, value: any) => {
    const newParticipants = [...participants];
    if (field === 'isPayer') {
      // Uncheck other payers when selecting a new one
      newParticipants.forEach((p, i) => {
        p.isPayer = i === index ? value : false;
      });
    } else {
      newParticipants[index] = { ...newParticipants[index], [field]: value };
    }
    setParticipants(newParticipants);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (
      !title ||
      participants.some((p) => !p.name || !p.amount || !p.activity)
    ) {
      // Show error
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      date,
      participants: participants.map((p) => ({
        ...p,
        amount: parseFloat(p.amount) || 0,
      })),
      totalAmount: participants.reduce(
        (sum, p) => sum + (parseFloat(p.amount) || 0),
        0
      ),
    };

    addEvent(newEvent);
    router.push('/');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Event</Text>
      </View>
      {/* 
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter event name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Date & Time</Text>
          <input
            type="datetime-local"
            value={date.toISOString().slice(0, 16)}
            onChange={(e) => setDate(new Date(e.target.value))}
            style={styles.dateInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Participants</Text>
        {participants.map((participant, index) => (
          <View key={index} style={styles.participantContainer}>
            <View style={styles.participantInputs}>
              <TextInput
                style={[styles.input, styles.nameInput]}
                value={participant.name}
                onChangeText={(value) => updateParticipant(index, 'name', value)}
                placeholder="Name"
              />
              <TextInput
                style={[styles.input, styles.activityInput]}
                value={participant.activity}
                onChangeText={(value) => updateParticipant(index, 'activity', value)}
                placeholder="Product/Activity"
              />
              <TextInput
                style={[styles.input, styles.amountInput]}
                value={participant.amount}
                onChangeText={(value) => updateParticipant(index, 'amount', value)}
                placeholder="Amount"
                keyboardType="decimal-pad"
              />
              <Pressable
                style={[styles.payerButton, participant.isPayer && styles.payerButtonActive]}
                onPress={() => updateParticipant(index, 'isPayer', !participant.isPayer)}
              >
                <Ionicons 
                  name={participant.isPayer ? "wallet" : "wallet-outline"} 
                  size={24} 
                  color={participant.isPayer ? "#fff" : "#6366f1"} 
                />
              </Pressable>
              {participants.length > 1 && (
                <Pressable
                  onPress={() => removeParticipant(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={24} color="#ef4444" />
                </Pressable>
              )}
            </View>
          </View>
        ))}

        <Pressable onPress={addParticipant} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#6366f1" />
          <Text style={styles.addButtonText}>Add Participant</Text>
        </Pressable>

        <Pressable onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Create Event</Text>
        </Pressable>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  participantContainer: {
    marginBottom: 12,
  },
  participantInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameInput: {
    flex: 2,
  },
  activityInput: {
    flex: 2,
  },
  amountInput: {
    flex: 1,
  },
  payerButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  payerButtonActive: {
    backgroundColor: '#6366f1',
  },
  removeButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#6366f1',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
