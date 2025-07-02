import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import styles from './styles';

interface Props {
  visible: boolean;
  title: string;
  description: string;
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CreateTaskModal: React.FC<Props> = ({
  visible,
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  onSave,
  onCancel,
}) => {
  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha o título e a descrição.');
      return;
    }

    onSave();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.wrapper}>
          <View style={styles.content}>
            <Text style={styles.title}>Nova Tarefa</Text>

            <TextInput
              placeholder="Título"
              placeholderTextColor="#888"
              style={styles.input}
              value={title}
              onChangeText={onChangeTitle}
            />

            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#888"
              style={[styles.input, { height: 80 }]}
              value={description}
              onChangeText={onChangeDescription}
              multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel}>
              <Text style={{ marginTop: 12, textAlign: 'center' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
