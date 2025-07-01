import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';
import styles from './styles';

interface Props {
  task: Task | null;
  onClose: () => void;
}

const TaskDetailModal: React.FC<Props> = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{task.title}</Text>
          <View style={{ maxHeight: 200 }}>
            <Text style={styles.description}>{task.description || 'Sem descrição.'}</Text>
          </View>
          <TouchableOpacity style={[styles.modalButton, { marginTop: 16 }]} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaskDetailModal;
