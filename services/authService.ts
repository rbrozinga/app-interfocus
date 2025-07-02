import * as SecureStore from 'expo-secure-store';

const CLIENT_ID = '6a5fc829-36c9-49f8-9bbb-0029508dd83c';
const CLIENT_SECRET = 'thatsmysecretkey';

export async function exchangeToken(code: string, redirectUri: string): Promise<string | null> {
  try {
    const result = await fetch('https://auth.interfocus.com.br/api/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await result.json();

    if (data.access_token) {
      await SecureStore.setItemAsync('user_token', data.access_token);
      return data.access_token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao trocar token:', error);
    return null;
  }
}

export async function getUserToken(): Promise<string | null> {
  return await SecureStore.getItemAsync('user_token');
}

export async function clearUserToken(): Promise<void> {
  await SecureStore.deleteItemAsync('user_token');
}
