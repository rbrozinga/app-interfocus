import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles';

interface Props {
  onComplete: () => void;
  onDelete: () => void;
}

const TaskActions: React.FC<Props> = ({ onComplete, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onComplete}>
        <Text style={styles.text}>Concluir</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <Text style={styles.text}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskActions;
