import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';
import { exchangeToken } from '../../services/authService';

const CLIENT_ID = '6a5fc829-36c9-49f8-9bbb-0029508dd83c';
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true } as any);

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      responseType: 'code',
    },
    {
      authorizationEndpoint: 'https://ias.interfocus.com.br/authorize',
      tokenEndpoint: 'https://auth.interfocus.com.br/api/oauth/token',
    }
  );

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await SecureStore.getItemAsync('user_token');
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Details' as never }],
        });
      }
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const code = response.params.code;
      handleExchangeToken(code);
    }
  }, [response]);

  const handleExchangeToken = async (code: string) => {
    const token = await exchangeToken(code, REDIRECT_URI);

    if (token) {
      await SecureStore.setItemAsync('user_token', token);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Details' as never }],
      });
    } else {
      Alert.alert('Erro', 'Token inválido.');
    }
  };

  const handleLogin = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interfocus</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={!request}>
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
