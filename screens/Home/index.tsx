import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Colors from '../../theme/colors';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import TaskFilters, { Filter } from '../../components/TaskFilters';
import TaskActions from '../../components/TaskActions';
import CreateTaskModal from '../../components/CreateTaskModal';
import TaskDetailModal from '../../components/TaskDetailModal';
import { Task } from '../../Types/types';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from '@expo/vector-icons';

const TasksScreen: React.FC = () => {
  const navigation = useNavigation();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>('open');
  const [creating, setCreating] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);

  const STORAGE_KEY_PREFIX = '@myapp_tasks_';

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'open') return !task.completed;
      return task.completed;
    })
    .sort((a, b) => {
      const dateA = dayjs(a.createdAt, 'DD-MM-YYYY HH:mm').toDate().getTime();
      const dateB = dayjs(b.createdAt, 'DD-MM-YYYY HH:mm').toDate().getTime();
      return dateA - dateB;
    });

  useEffect(() => {
    const backAction = () => true;
    const handler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => handler.remove();
  }, []);

  useEffect(() => {
    const loadTasksForUser = async () => {
      try {
        const userToken = await SecureStore.getItemAsync('user_token');
        if (!userToken) {
          console.warn('Usuário não autenticado');
          return;
        }

        const userStorageKey = STORAGE_KEY_PREFIX + userToken;
        const storedTasks = await AsyncStorage.getItem(userStorageKey);

        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          const generatedTasks: Task[] = [];

          for (let i = 0; i < 50; i++) {
            generatedTasks.push({
              id: uuid.v4().toString(),
              title: `Tarefa #${i + 1}`,
              description: `Descrição da tarefa número ${i + 1}`,
              createdAt: dayjs()
                .subtract(50 - i, 'minute')
                .format('DD-MM-YYYY HH:mm'),
              completed: false,
            });
          }

          setTasks(generatedTasks);
          await AsyncStorage.setItem(userStorageKey, JSON.stringify(generatedTasks));
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    loadTasksForUser();
  }, []);

  useEffect(() => {
    const saveTasksForUser = async () => {
      try {
        const userToken = await SecureStore.getItemAsync('user_token');
        if (!userToken) return;

        const userStorageKey = STORAGE_KEY_PREFIX + userToken;
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(tasks));
      } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
      }
    };

    saveTasksForUser();
  }, [tasks]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const toggleComplete = () => {
    const updated = tasks.map((task) =>
      selectedIds.includes(task.id) ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    setSelectedIds([]);
  };

  const confirmToggleComplete = () => {
    Alert.alert(
      'Concluir tarefas',
      'Deseja alternar o status de conclusão das tarefas selecionadas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: toggleComplete },
      ],
      { cancelable: true }
    );
  };

  const deleteTasks = () => {
    setLoading(true);
    setTimeout(() => {
      const remaining = tasks.filter((t) => !selectedIds.includes(t.id));
      setTasks(remaining);
      setSelectedIds([]);
      setLoading(false);
    }, 1000);
  };

  const confirmDeleteTasks = () => {
    Alert.alert(
      'Excluir tarefas',
      'Tem certeza que deseja excluir as tarefas selecionadas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: deleteTasks },
      ],
      { cancelable: true }
    );
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: uuid.v4().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      createdAt: dayjs().format('DD-MM-YYYY HH:mm'),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setCreating(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const handleLogout = async () => {
    try {
      const userToken = await SecureStore.getItemAsync('user_token');
      if (userToken) {
        const userStorageKey = STORAGE_KEY_PREFIX + userToken;

        await AsyncStorage.removeItem(userStorageKey);
        await SecureStore.deleteItemAsync('user_token');
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const renderItem = ({ item }: { item: Task }) => {
    const isSelected = selectedIds.includes(item.id);

    return (
      <TaskCard
        task={item}
        isSelected={isSelected}
        onLongPress={() => toggleSelect(item.id)}
        onPress={() => {
          if (selectedIds.length > 0) toggleSelect(item.id);
          else setViewingTask(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={[styles.header]}>
        <TaskFilters selected={filter} onChange={setFilter} />

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Sair',
              'Tem certeza que deseja sair?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sim', onPress: handleLogout },
              ],
              { cancelable: true }
            );
          }}
          style={{ padding: 8 }}>
          <MaterialIcons name="logout" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {selectedIds.length > 0 && (
        <TaskActions onComplete={confirmToggleComplete} onDelete={confirmDeleteTasks} />
      )}

      {loading && (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 10 }} />
      )}

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 5,
          paddingHorizontal: 16,
        }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setCreating(true)}>
        <Text style={styles.fabText}>+ Nova</Text>
      </TouchableOpacity>

      <CreateTaskModal
        visible={creating}
        title={newTaskTitle}
        description={newTaskDesc}
        onChangeTitle={setNewTaskTitle}
        onChangeDescription={setNewTaskDesc}
        onSave={addNewTask}
        onCancel={() => setCreating(false)}
      />

      <TaskDetailModal task={viewingTask} onClose={() => setViewingTask(null)} />
    </View>
  );
};

export default TasksScreen;
