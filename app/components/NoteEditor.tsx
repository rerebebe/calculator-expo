import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface NoteModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  selectedDate: string;
  note: string;
}

export default function NoteModal({
  visible,
  onClose,
  onSave,
  selectedDate,
  note,
}: NoteModalProps): JSX.Element {
  const [text, setText] = useState(note || '');

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.modalContainer}>
        <Text style={styles.dateText}>Note for {selectedDate}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your note..."
          value={text}
          onChangeText={setText}
          multiline
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d63384',
  },
  input: {
    width: '90%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#d63384',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
