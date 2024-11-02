import TaskList from '@screens/task-list';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TaskList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
