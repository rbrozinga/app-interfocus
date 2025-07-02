import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Task } from '../../Types/types';

type Props = {
  task: Task;
  isSelected: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

const TaskCard: React.FC<Props> = ({ task, isSelected, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        task.completed && styles.completedCard,
      ]}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {task.description}
      </Text>
      <Text style={styles.date}>{task.createdAt}</Text>
    </TouchableOpacity>
  );
};

export default TaskCard;
