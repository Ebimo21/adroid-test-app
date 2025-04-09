import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
// import { useTheme } from '../context/ThemeContext';
// import { useTheme } from '../context/themeContext';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function AuthScreen({ navigation }) {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = async () => {
    try {
      // TODO: Implement Firebase authentication
      navigation.replace('MainApp');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        <Text style={[styles.logo, { color: theme.colors.primary }]}>Vibez</Text>
        <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
          Discover the vibe around you
        </Text>
      </View>

      <View style={styles.formContainer}>
        {!isLogin && (
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            placeholder="Full Name"
            placeholderTextColor={theme.colors.textSecondary}
            value={name}
            onChangeText={setName}
          />
        )}
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleAuth}
        >
          <Text style={styles.buttonText}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={[styles.switchText, { color: theme.colors.textSecondary }]}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Log In'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#FFFFFF',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
  },
}); 