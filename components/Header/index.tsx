import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './styles';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#070a0e" barStyle="light-content" />

      <View style={styles.inner}>
        <Text style={styles.title}>Lista de Tarefas</Text>
      </View>
    </View>
  );
};

export default Header;
