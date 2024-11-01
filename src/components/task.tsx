import { globalStyles } from '@common/global-styles';
import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task as TaskType } from '@models/task';

interface TaskProps extends TaskType {}

export default function Task({ description, estimateAt, doneAt }: TaskProps) {
  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>
        { getCheckView(doneAt) }
      </View>
      <View>
        <Text
          style={[
            globalStyles.colorPrimary,
            { textDecorationLine: doneAt ? 'line-through' : 'none' }
          ]}
        >
          { description }
        </Text>
        <Text
          style={[
            globalStyles.colorTertiary,
            styles.date,
          ]}
        >
          { moment(doneAt || estimateAt).format('dddd, MMMM D') }
        </Text>
      </View>
    </View>
  );
}

function getCheckView(doneAt?: Date) {
  if (doneAt) {
    return (
      <View style={styles.done}>
        <Icon name="check" color="#fff" size={20}/>
      </View>
    );
  }

  return <View style={styles.pending}/>;
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