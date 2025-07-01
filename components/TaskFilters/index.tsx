export type Filter = 'all' | 'open' | 'completed';

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

interface Props {
  selected: Filter;
  onChange: (filter: Filter) => void;
}

const TaskFilters: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <View style={styles.filters}>
      {(['open', 'completed', 'all'] as Filter[]).map((filter) => (
        <TouchableOpacity key={filter} onPress={() => onChange(filter)}>
          <Text style={[styles.text, selected === filter && styles.active]}>
            {filter === 'open' ? 'Abertas' : filter === 'completed' ? 'Concluídas' : 'Todas'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TaskFilters;
