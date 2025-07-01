import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Colors from '../../theme/colors';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import TaskFilters, { Filter } from '../../components/TaskFilters';
import TaskActions from '../../components/TaskActions';
import CreateTaskModal from '../../components/CreateTaskModal';
import TaskDetailModal from '../../components/TaskDetailModal';
import { Task } from '../../components/types';

const TasksScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>('open');
  const [creating, setCreating] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const STORAGE_KEY = '@myapp_tasks';

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'open') return !task.completed;
    return task.completed;
  });

  useEffect(() => {
    const backAction = () => true;
    const handler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => handler.remove();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
      }
    };
    saveTasks();
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

  const deleteTasks = () => {
    setLoading(true);
    setTimeout(() => {
      const remaining = tasks.filter((t) => !selectedIds.includes(t.id));
      setTasks(remaining);
      setSelectedIds([]);
      setLoading(false);
    }, 1000);
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

      <View style={styles.header}>
        <TaskFilters selected={filter} onChange={setFilter} />
      </View>

      {selectedIds.length > 0 && <TaskActions onComplete={toggleComplete} onDelete={deleteTasks} />}

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
