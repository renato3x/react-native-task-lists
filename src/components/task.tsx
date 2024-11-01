import { globalStyles } from '@common/global-styles';
import moment from 'moment';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task as TaskType } from '@models/task';

interface TaskProps extends TaskType {
  onToggleDone?: (task: TaskType) => void;
}

export default function Task({ onToggleDone, ...task }: TaskProps) {
  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>
        { getCheckView(task, onToggleDone) }
      </View>
      <View>
        <Text
          style={[
            globalStyles.colorPrimary,
            { textDecorationLine: task.doneAt ? 'line-through' : 'none' }
          ]}
        >
          { task.description }
        </Text>
        <Text
          style={[
            globalStyles.colorTertiary,
            styles.date,
          ]}
        >
          { moment(task.doneAt || task.estimateAt).format('dddd, MMMM D') }
        </Text>
      </View>
    </View>
  );
}

function getCheckView(task: TaskType, toggleDoneFn?: (task: TaskType) => void) {
  function handlePress() {
    if (toggleDoneFn) {
      toggleDoneFn(task);
    }
  }

  if (task.doneAt) {
    return (
      <Pressable style={styles.done} onPress={handlePress}>
        <Icon name="check" color="#fff" size={20}/>
      </Pressable>
    );
  }

  return <Pressable style={styles.pending} onPress={handlePress}/>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#aaa',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderColor: '#555',
    borderWidth: 1,
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: '#486623',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
  }
});