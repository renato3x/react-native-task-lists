import { Text, View, StyleSheet, ImageBackground, FlatList, Pressable } from 'react-native';
import { globalStyles } from '@common/global-styles';
import moment from 'moment';

import todayImage from '@assets/images/today.jpg';
import Task from '@components/task';
import { Task as TaskType } from '@models/task';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddTask from './add-task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskList() {
  const today = moment().format('dddd, MMMM D');
  const [ showDoneTasks, setShowDoneTasks ] = useState<boolean>(false);
  const [ showAddTaskModal, setShowAddTaskModal ] = useState<boolean>(false);
  const [ tasks, setTasks ] = useState<TaskType[]>([]);

  useEffect(() => {
    const getTasks =  async () => {
      const appTasks = await AsyncStorage.getItem('tasks');

      if (appTasks) {
        setTasks(JSON.parse(appTasks));
      }
    }

    getTasks();
  }, []);

  function handleToggleDone(task: TaskType) {
    if (task.doneAt) {
      delete task.doneAt;
    } else {
      task.doneAt = new Date();
    }

    setTasks(tasks.map((t) => t.id === task.id ? task : t));
  }
  
  function toggleShowDoneTasks() {
    setShowDoneTasks(!showDoneTasks);
  }

  function handleAddTask() {
    setShowAddTaskModal(true);
  }

  async function saveTask(task: TaskType) {
    tasks.push(task);
    setTasks(tasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    setShowAddTaskModal(false);
  }

  async function deleteTask(task: TaskType) {
    const filteredTasks = tasks.filter(t => t.id != task.id);
    setTasks(filteredTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }

  return (
    <View style={styles.container}>
      <AddTask
        visible={showAddTaskModal}
        onCancel={() => setShowAddTaskModal(false)}
        onSave={saveTask}
      />
      <ImageBackground source={todayImage} style={styles.background}>
        <SafeAreaProvider>
          <SafeAreaView>
            <View style={styles.iconBar}>
              <Pressable onPress={toggleShowDoneTasks}>
                <Icon
                  name={showDoneTasks ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#fff"
                />
              </Pressable>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
        <View style={styles.titleBar}>
          <Text
            style={[
              globalStyles.colorSecondary,
              styles.title,
            ]}
          >
            Today
          </Text>
          <Text
            style={[
              globalStyles.colorSecondary,
              styles.subtitle,
            ]}
          >
            { today }
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => {
            if (showDoneTasks) {
              return <Task {...item} onToggleDone={handleToggleDone} onDelete={deleteTask}/>
            }

            return !item.doneAt ? <Task {...item} onToggleDone={handleToggleDone} onDelete={deleteTask}/> : null;
          }}
          keyExtractor={(item) => item.id as string}
        />
      </View>
      <Pressable
        style={[styles.addTaskButton, globalStyles.bgToday]}
        onPress={handleAddTask}
      >
        <Icon name="add" size={25} style={globalStyles.colorSecondary}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  addTaskButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});