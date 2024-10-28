import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Lato_400Regular,
  });

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
