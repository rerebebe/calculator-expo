import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEventsStore } from '../../stores/eventsStore';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const event = useEventsStore((state) => 
    state.events.find((e) => e.id === id)
  );

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  const calculateSplits = () => {
    const totalAmount = event.participants.reduce((sum, p) => sum + p.amount, 0);
    const perPersonShare = totalAmount / event.participants.length;
    
    return event.participants.map(participant => {
      const diff = perPersonShare - participant.amount;
      return {
        name: participant.name,
        amount: participant.amount,
        owes: diff > 0 ? diff : 0,
        receives: diff < 0 ? -diff : 0,
      };
    });
  };

  const splits = calculateSplits();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.title}>{event.title}</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={styles.summaryValue}>${event.totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Per Person</Text>
          <Text style={styles.summaryValue}>
            ${(event.totalAmount / event.participants.length).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expenses Breakdown</Text>
        {splits.map((split, index) => (
          <View key={index} style={styles.expenseItem}>
            <View style={styles.expenseHeader}>
              <Text style={styles.expenseName}>{split.name}</Text>
              <Text style={styles.expenseAmount}>${split.amount.toFixed(2)}</Text>
            </View>
            {split.owes > 0 && (
              <Text style={styles.owes}>
                Owes: ${split.owes.toFixed(2)}
              </Text>
            )}
            {split.receives > 0 && (
              <Text style={styles.receives}>
                Receives: ${split.receives.toFixed(2)}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payments</Text>
        {splits.filter(split => split.owes > 0).map((split, index) => (
          <Pressable key={index} style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>
              Pay ${split.owes.toFixed(2)} to {
                splits.find(s => s.receives === split.owes)?.name
              }
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Pressable>
        ))}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 1,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  expenseItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  owes: {
    color: '#ef4444',
    fontSize: 14,
  },
  receives: {
    color: '#10b981',
    fontSize: 14,
  },
  paymentButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});