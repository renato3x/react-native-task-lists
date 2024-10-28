import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import moment from 'moment';

import todayImage from '@assets/images/today.jpg';

export default function TaskList() {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
  
  const [ fontsLoaded ] = useFonts({
    Lato_400Regular
  });

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text>Hoje</Text>
            <Text>{ today }</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <Text>Task List</Text>
        </View>
      </View>
    )
  }
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
  }
});