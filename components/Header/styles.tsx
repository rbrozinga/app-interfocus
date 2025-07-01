import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    backgroundColor: Colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default styles;
