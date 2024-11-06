import { globalStyles } from '@common/global-styles';
import moment from 'moment';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task as TaskType } from '@models/task';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface TaskProps extends TaskType {
  onToggleDone?: (task: TaskType) => void;
  onDelete?: (task: TaskType) => void;
}

export default function Task({ onToggleDone, onDelete, ...task }: TaskProps) {
  function handleDelete() {
    if (onDelete) {
      onDelete(task);
    }
  }

  function SwipeRightActions() {
    return (
      <Pressable style={styles.swipeRightContent} onPress={handleDelete}>
        <Icon name="delete" size={30} color="#fff"/>
      </Pressable>
    )
  }

  function SwipeLeftActions() {
    return (
      <Pressable style={styles.swipeLeftContent} onPress={handleDelete}>
        <Icon name="delete" size={20} color="#fff"/>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    )
  }

  function handleSwipeableOpen(direction: 'right' | 'left') {
    if (direction === 'left') {
      handleDelete();
    }
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={SwipeRightActions}
        renderLeftActions={SwipeLeftActions}
        onSwipeableOpen={handleSwipeableOpen}
      >
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
      </Swipeable>
    </GestureHandlerRootView>
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
    backgroundColor: '#fff'
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
  },
  swipeRightContent: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  swipeLeftContent: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deleteText: {
    color: '#fff',
    fontSize: 20,
    margin: 10,
  }
});