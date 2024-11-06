import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Modal } from 'react-native';
import { globalStyles } from '@common/global-styles';
import { useState } from 'react';
import { Task } from '@models/task';

type AddTaskProps = {
  visible: boolean;
  onCancel?: () => void;
}

export default function AddTask({ visible, onCancel }: AddTaskProps) {
  const [ task, setTask ] = useState<Task>({
    description: '',
    estimateAt: new Date,
  });

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onCancel}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <Pressable onPress={onCancel} style={styles.modalBackground}/>
      <View style={styles.modalContent}>
        <Text style={styles.header}>New Task</Text>
        <TextInput
          placeholder="Type the description..."
          value={task.description}
          onChangeText={(description) => setTask({ ...task, description })}
          style={styles.input}
        />
        <View style={styles.modalActions}>
          <Pressable style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={onCancel} style={styles.modalBackground}/>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff'
  },
  header: {
    ...globalStyles.bgToday,
    ...globalStyles.colorSecondary,
    textAlign: 'center',
    padding: 15,
    fontWeight: '300',
    fontSize: 18,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
    padding: 10,
  },
  button: {
    margin: 20,
    marginRight: 30,
  },
  buttonText: {
    color: '#b13b44',
  }
});
