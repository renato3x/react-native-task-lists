import { Text, View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { globalStyles } from '@common/global-styles';
import moment from 'moment';

import todayImage from '@assets/images/today.jpg';
import Task from '@components/task';
import { Task as TaskType } from '@models/task';
import { useState } from 'react';

export default function TaskList() {
  const today = moment().format('dddd, MMMM D');
  const [ tasks, _setTasks ] = useState<TaskType[]>([
    { id: 'd8a4f3ea-9e2c-4f6a-8e36-6a9c9e88aef4', description: 'Complete project report', estimateAt: new Date(2024, 10, 5) },
    { id: 'a6c73f2e-2d5f-4e69-8b6b-1a90e27bce62', description: 'Buy groceries', estimateAt: new Date(2024, 10, 2), doneAt: new Date(2024, 10, 1) },
    { id: '8f6e9c1a-572d-4b09-b846-8a2a5f8eae5c', description: 'Schedule team meeting', estimateAt: new Date(2024, 10, 3) },
    { id: 'b1a3f7d1-5e7b-4c9a-b03e-f1b2b8a6ea3d', description: 'Prepare presentation for clients', estimateAt: new Date(2024, 10, 7) },
    { id: 'c9a1d8f4-e6b2-4f97-8c67-2f5a1e5c7b41', description: 'Send invoices', estimateAt: new Date(2024, 10, 4), doneAt: new Date(2024, 10, 3) },
    { id: 'd6f3c2a1-8e3b-4e7d-9b64-5b2a9e8d2f5f', description: 'Organize files', estimateAt: new Date(2024, 10, 8) },
    { id: 'f2d3e7a8-4b1e-4e5f-8c9a-7f5a1e2b8d3c', description: 'Fix bugs in the app', estimateAt: new Date(2024, 10, 6) },
    { id: 'a3b7f5c2-9e4a-4d7f-b6c9-e8d2c1a5b7e9', description: 'Set up marketing campaign', estimateAt: new Date(2024, 10, 10) },
    { id: 'e5a7f2b9-c8d3-4e9a-8f1b-2d7c9b3a4f8e', description: 'Update website content', estimateAt: new Date(2024, 10, 9), doneAt: new Date(2024, 10, 8) },
    { id: 'f1b6d2e8-4c9a-4e7f-a3d1-8b9e2a5c7f4a', description: 'Backup server data', estimateAt: new Date(2024, 10, 11) },
    { id: 'b9e3d2f4-a1f7-4c8d-8e5f-9c2b3f7e5a4a', description: 'Review team performance', estimateAt: new Date(2024, 10, 12) },
    { id: 'a3e7b4d5-9c2a-4f1b-8e5f-6b2a9f3e7c1d', description: 'Renew software licenses', estimateAt: new Date(2024, 10, 14), doneAt: new Date(2024, 10, 13) },
    { id: 'd5b9a3e7-f2c4-4e6a-8f1b-7c8e9d3f4a5a', description: 'Design logo for new product', estimateAt: new Date(2024, 10, 15) },
    { id: 'f4c9b1a3-8e7a-4e2d-b6f9-1a5c7f2e9d8e', description: 'Plan holiday party', estimateAt: new Date(2024, 10, 16), doneAt: new Date(2024, 10, 14) },
    { id: 'a2f5d3e8-9b1a-4c7e-8f2a-7e5d9c3a6f4b', description: 'Write blog post', estimateAt: new Date(2024, 10, 13) },
    { id: 'e7f2a3b9-c1d8-4f6a-9e3a-5b9c4f2a8d7e', description: 'Analyze customer feedback', estimateAt: new Date(2024, 10, 18) },
    { id: 'c3f9d2a7-4e6b-4f8a-b1d9-7a2e8c5f4d3a', description: 'Test new app features', estimateAt: new Date(2024, 10, 17), doneAt: new Date(2024, 10, 15) },
    { id: 'd1a7f5c2-9b3e-4e6f-8c2a-4f7b9a5e8d3a', description: 'Conduct user interviews', estimateAt: new Date(2024, 10, 19) },
    { id: 'f2a8c5d3-7b1e-4e9f-8a3c-6d9e7f4a5b2c', description: 'Update product roadmap', estimateAt: new Date(2024, 10, 20) },
    { id: 'e8c9d3a7-2f5b-4f6e-a3d1-9c4a7f2b8e5a', description: 'Prepare financial summary', estimateAt: new Date(2024, 10, 21), doneAt: new Date(2024, 10, 20) }
  ]);

  return (
    <View style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
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
          renderItem={({ item }) => <Task {...item}/>}
          keyExtractor={(item) => item.id as string}
        />
      </View>
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
  }
});