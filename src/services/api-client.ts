import {Alert} from 'react-native';
import {LoginFormData} from '../models/login-payload';

export const DEFAULT_SERVER_ADDRESS = 'localhost';
export const DEFAULT_SERVER_PATH = '/api/login';
export const DEFAULT_SERVER_PORT = 8000;

const login = async (loginFormData: LoginFormData) => {
  console.log(`payload -> ${JSON.stringify(loginFormData, undefined, 4)}`);
  Alert.alert(JSON.stringify(loginFormData));
};

export const ApiClient = {
  login,
};
