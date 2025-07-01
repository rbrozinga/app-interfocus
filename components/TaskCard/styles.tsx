import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.grayLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: '#eaf0ff',
  },
  completedCard: {
    opacity: 0.5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textDark,
  },
  description: {
    fontSize: 14,
    color: Colors.grayDark,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.grayMedium,
    marginTop: 4,
  },
});

export default styles;
