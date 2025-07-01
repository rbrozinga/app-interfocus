import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.textDark,
  },
  active: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default styles;
